import { database } from '../database/index';
import { Member } from '../database/models';
import { supabase } from './supabase';
import { Q } from '@nozbe/watermelondb';

// ─── GET ALL MEMBERS (from local WatermelonDB) ───────────
export async function getAllMembers(): Promise<Member[]> {
  const membersCollection = database.get<Member>('members');
  return await membersCollection.query().fetch();
}

// ─── SEARCH MEMBERS ──────────────────────────────────────
export async function searchMembers(searchText: string): Promise<Member[]> {
  const membersCollection = database.get<Member>('members');
  if (!searchText.trim()) {
    return await membersCollection.query().fetch();
  }
  return await membersCollection
    .query(
      Q.or(
        Q.where('first_name', Q.like(`%${searchText}%`)),
        Q.where('last_name', Q.like(`%${searchText}%`)),
      ),
    )
    .fetch();
}

// ─── UUID GENERATOR (RFC4122 v4) ─────────────────────────
export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// ─── CREATE NEW MEMBER (saves locally first) ─────────────
export async function createMember(data: {
  firstName: string;
  middleInitial?: string;
  lastName: string;
  birthday?: string;
  age?: string;
  gender?: string;
  phone?: string;
  email?: string;
  address?: string;
  status: string;
  ministry?: string;
  joinedDate?: string;
  howTheyHeard?: string;
  emergencyContact?: {
    name: string;
    relationship?: string;
    phone: string;
  };
}): Promise<Member> {
  const membersCollection = database.get<Member>('members');
  let newMember!: Member;
  const newId = generateUUID();

  // Normalize status to match Postgres CHECK constraint: 'visitor', 'new_member', 'member', 'leader'
  const rawStatus = (data.status || 'visitor').toLowerCase().trim().replace(/\s+/g, '_');
  const validStatus = ['visitor', 'new_member', 'member', 'leader'].includes(rawStatus)
    ? rawStatus
    : 'visitor';

  // Format birthday to YYYY-MM-DD or null
  let formattedBirthday: string | null = null;
  if (data.birthday && data.birthday.trim()) {
    const b = data.birthday.trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(b)) {
      formattedBirthday = b;
    } else {
      const parsed = new Date(b);
      if (!isNaN(parsed.getTime())) {
        formattedBirthday = parsed.toISOString().split('T')[0];
      }
    }
  }

  await database.write(async () => {
    newMember = await membersCollection.create(member => {
      member._raw.id = newId;
      member.firstName = data.firstName.trim();
      member.middleInitial = data.middleInitial?.trim() ?? '';
      member.lastName = data.lastName.trim();
      member.birthday = formattedBirthday ?? '';
      member.age = data.age?.trim() ?? '';
      member.gender = data.gender ?? 'Male';
      member.phone = data.phone?.trim() ?? '';
      member.email = data.email?.trim() ?? '';
      member.address = data.address?.trim() ?? '';
      member.status = validStatus;
      member.ministry = data.ministry ?? 'Unassigned';
      member.joinedDate = data.joinedDate ?? new Date().toISOString().split('T')[0];
      member.howTheyHeard = data.howTheyHeard ?? '';
    });

    if (data.emergencyContact?.name && data.emergencyContact?.phone) {
      const emergencyCollection = database.get('emergency_contacts');
      await emergencyCollection.create((contact: any) => {
        contact._raw.id = generateUUID();
        contact.memberId = newId;
        contact.name = data.emergencyContact!.name.trim();
        contact.relationship = data.emergencyContact!.relationship?.trim() ?? '';
        contact.phone = data.emergencyContact!.phone.trim();
      });
    }
  });

  await syncMemberToSupabase(newMember, data.emergencyContact);
  return newMember;
}

// ─── EVENT ID NORMALIZER ──────────────────────────────────
export const DEFAULT_EVENT_ID = '33333333-3333-3333-3333-333333333302'; // Sunday Fellowship Gathering

export function normalizeEventId(eventId?: string): string {
  if (!eventId) return DEFAULT_EVENT_ID;
  if (eventId === 'saturday-ministry') return '33333333-3333-3333-3333-333333333301';
  if (eventId === 'sunday-fellowship') return '33333333-3333-3333-3333-333333333302';
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (uuidRegex.test(eventId)) return eventId;
  return DEFAULT_EVENT_ID;
}

// ─── LOG ATTENDANCE (saves locally first, syncs to cloud) ─
export async function logAttendance(
  memberId: string,
  eventId: string,
  isGuest: boolean = false,
  targetDate?: Date | string,
): Promise<void> {
  const validEventId = normalizeEventId(eventId);
  const checkInDate = targetDate ? new Date(targetDate) : new Date();
  try {
    const attendanceCollection = database.get('attendance_logs');
    await database.write(async () => {
      await attendanceCollection.create((log: any) => {
        log.memberId = memberId;
        log.eventId = validEventId;
        log.isGuest = isGuest;
        log.synced = false;
        log.checkedInAt = checkInDate;
      });
    });
  } catch (err) {
    console.log('Local DB attendance write error:', err);
  }

  // Try to sync immediately if online
  await syncAttendanceToSupabase(memberId, validEventId, isGuest, checkInDate);
}

// ─── SYNC ATTENDANCE TO SUPABASE ─────────────────────────
export async function syncAttendanceToSupabase(
  memberId: string,
  eventId: string,
  isGuest: boolean = false,
  checkInDate?: Date,
): Promise<void> {
  try {
    const validEventId = normalizeEventId(eventId);
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(memberId)) {
      console.log('Skipping Supabase sync for local mock member id:', memberId);
      return;
    }

    const checkInIso = (checkInDate || new Date()).toISOString();

    const { error } = await supabase.from('attendance_logs').upsert(
      {
        member_id: memberId,
        event_id: validEventId,
        is_guest: isGuest,
        checked_in_at: checkInIso,
        synced: true,
      },
      { onConflict: 'member_id,event_id' },
    );

    if (error) {
      console.log('Supabase attendance sync error:', error.message);
    } else {
      console.log(`Attendance logged in Supabase for member ${memberId}`);
    }
  } catch (err) {
    console.log('Offline — attendance saved locally, will sync later:', err);
  }
}

// ─── GET LOCAL ATTENDANCE FOR EVENT ───────────────────────
export async function getAttendanceForEvent(
  eventId: string,
  targetDate?: string,
): Promise<Array<{ memberId: string; checkedInAt: Date }>> {
  const validEventId = normalizeEventId(eventId);
  try {
    const attendanceCollection = database.get<any>('attendance_logs');
    const logs = await attendanceCollection
      .query(
        Q.or(
          Q.where('event_id', validEventId),
          Q.where('event_id', eventId),
        ),
      )
      .fetch();

    return logs
      .map((l: any) => ({
        memberId: l.memberId,
        checkedInAt: l.checkedInAt ? new Date(l.checkedInAt) : new Date(),
      }))
      .filter((l: any) => {
        if (!targetDate) return true;
        const logDateStr = l.checkedInAt.toISOString().slice(0, 10);
        return logDateStr === targetDate;
      });
  } catch (err) {
    console.log('Error fetching local attendance logs:', err);
    return [];
  }
}

// ─── PULL ATTENDANCE FROM SUPABASE ────────────────────────
export async function pullAttendanceFromSupabase(
  eventId: string,
  targetDate?: string,
): Promise<Array<{ memberId: string; checkedInAt: Date }>> {
  const validEventId = normalizeEventId(eventId);
  try {
    const { data, error } = await supabase
      .from('attendance_logs')
      .select('member_id, checked_in_at')
      .eq('event_id', validEventId);

    if (error || !data) return [];
    return data
      .map((d: any) => ({
        memberId: d.member_id,
        checkedInAt: new Date(d.checked_in_at),
      }))
      .filter((d: any) => {
        if (!targetDate) return true;
        const logDateStr = d.checkedInAt.toISOString().slice(0, 10);
        return logDateStr === targetDate;
      });
  } catch (err) {
    console.log('Error fetching Supabase attendance:', err);
    return [];
  }
}

// ─── DELETE ATTENDANCE (Undo check-in) ─────────────────────
export async function deleteAttendance(memberId: string, eventId: string): Promise<void> {
  const validEventId = normalizeEventId(eventId);
  try {
    const attendanceCollection = database.get<any>('attendance_logs');
    const logs = await attendanceCollection
      .query(
        Q.and(
          Q.where('member_id', memberId),
          Q.or(
            Q.where('event_id', validEventId),
            Q.where('event_id', eventId),
          ),
        ),
      )
      .fetch();

    await database.write(async () => {
      for (const log of logs) {
        await log.destroyPermanently();
      }
    });

    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (uuidRegex.test(memberId)) {
      await supabase
        .from('attendance_logs')
        .delete()
        .eq('member_id', memberId)
        .eq('event_id', validEventId);
    }
  } catch (err) {
    console.log('Error deleting attendance:', err);
  }
}

// ─── SYNC MEMBER TO SUPABASE ─────────────────────────────
async function syncMemberToSupabase(
  member: Member,
  emergencyContact?: { name: string; relationship?: string; phone: string }
) {
  try {
    const initials = `${member.firstName?.[0] || ''}${member.lastName?.[0] || ''}`.toUpperCase();
    const { error } = await supabase.from('members').insert({
      id: member.id,
      first_name: member.firstName,
      middle_initial: member.middleInitial || null,
      last_name: member.lastName,
      birthday: member.birthday || null,
      age: member.age || null,
      gender: member.gender || null,
      phone: member.phone || null,
      email: member.email || null,
      address: member.address || null,
      status: member.status,
      ministry: member.ministry || 'Unassigned',
      how_they_heard: member.howTheyHeard || null,
      joined_date: member.joinedDate || new Date().toISOString().split('T')[0],
      avatar_initials: initials || 'MB',
    });

    if (error) {
      console.log('Sync error for member:', error.message);
    } else {
      console.log('Member synced to Supabase');

      // Sync emergency contact if present
      if (emergencyContact?.name && emergencyContact?.phone) {
        await supabase.from('emergency_contacts').insert({
          member_id: member.id,
          name: emergencyContact.name.trim(),
          relationship: emergencyContact.relationship?.trim() || null,
          phone: emergencyContact.phone.trim(),
        });
      }
    }
  } catch (err) {
    console.log('Offline — will sync member later:', err);
  }
}

// ─── PULL MEMBERS FROM CLOUD ──────────────────────────────
export async function pullMembersFromCloud(): Promise<void> {
  try {
    const { data: cloudMembers, error } = await supabase
      .from('members')
      .select('*');

    if (error || !cloudMembers) {
      console.log('Could not fetch cloud members (offline or network error)');
      return;
    }

    const membersCollection = database.get<Member>('members');
    const localMembers = await membersCollection.query().fetch();
    const localMap = new Map(localMembers.map(m => [m.id, m]));

    await database.write(async () => {
      for (const cm of cloudMembers) {
        const local = localMap.get(cm.id);
        if (local) {
          await local.update(m => {
            m.firstName = cm.first_name;
            m.middleInitial = cm.middle_initial ?? '';
            m.lastName = cm.last_name;
            m.birthday = cm.birthday ?? '';
            m.age = cm.age ?? '';
            m.gender = cm.gender ?? '';
            m.phone = cm.phone ?? '';
            m.email = cm.email ?? '';
            m.address = cm.address ?? '';
            m.status = cm.status;
            m.ministry = cm.ministry ?? 'Unassigned';
            m.howTheyHeard = cm.how_they_heard ?? '';
            m.joinedDate = cm.joined_date ?? '';
          });
        } else {
          await membersCollection.create(m => {
            m._raw.id = cm.id;
            m.firstName = cm.first_name;
            m.middleInitial = cm.middle_initial ?? '';
            m.lastName = cm.last_name;
            m.birthday = cm.birthday ?? '';
            m.age = cm.age ?? '';
            m.gender = cm.gender ?? '';
            m.phone = cm.phone ?? '';
            m.email = cm.email ?? '';
            m.address = cm.address ?? '';
            m.status = cm.status;
            m.ministry = cm.ministry ?? 'Unassigned';
            m.howTheyHeard = cm.how_they_heard ?? '';
            m.joinedDate = cm.joined_date ?? '';
          });
        }
      }
    });

    console.log(`Synced ${cloudMembers.length} members from cloud into local SQLite`);
  } catch (err) {
    console.log('Error pulling members:', err);
  }
}

// ─── PULL EVENTS FROM CLOUD ───────────────────────────────
export async function pullEventsFromCloud(): Promise<void> {
  try {
    const { data: cloudEvents, error } = await supabase
      .from('events')
      .select('*')
      .eq('is_active', true);

    if (error || !cloudEvents) return;

    const eventsCollection = database.get('events');
    const localEvents = await eventsCollection.query().fetch();
    const localMap = new Map(localEvents.map((e: any) => [e.id, e]));

    await database.write(async () => {
      for (const ce of cloudEvents) {
        const local = localMap.get(ce.id) as any;
        if (local) {
          await local.update((e: any) => {
            e.name = ce.name;
            e.type = ce.type;
            e.eventDate = ce.event_date;
            e.dayOfWeek = ce.day_of_week;
            e.timeSlot = ce.time_slot;
            e.description = ce.description ?? '';
          });
        } else {
          await eventsCollection.create((e: any) => {
            e._raw.id = ce.id;
            e.name = ce.name;
            e.type = ce.type;
            e.eventDate = ce.event_date;
            e.dayOfWeek = ce.day_of_week;
            e.timeSlot = ce.time_slot;
            e.description = ce.description ?? '';
          });
        }
      }
    });
    console.log(`Synced ${cloudEvents.length} events from cloud into local SQLite`);
  } catch (err) {
    console.log('Error pulling events:', err);
  }
}

// ─── PUSH OFFLINE ATTENDANCE LOGS ────────────────────────
export async function pushUnsyncedAttendance(): Promise<void> {
  try {
    const attendanceCollection = database.get('attendance_logs');
    const unsyncedLogs = await attendanceCollection.query(Q.where('synced', false)).fetch();

    if (unsyncedLogs.length === 0) return;

    for (const log of unsyncedLogs as any[]) {
      const validEventId = normalizeEventId(log.eventId);
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(log.memberId)) {
        continue;
      }
      const { error } = await supabase.from('attendance_logs').upsert({
        member_id: log.memberId,
        event_id: validEventId,
        is_guest: log.isGuest,
        checked_in_at: log.checkedInAt ? new Date(log.checkedInAt).toISOString() : new Date().toISOString(),
        synced: true,
      }, { onConflict: 'member_id,event_id' });

      if (!error) {
        await database.write(async () => {
          await log.update((l: any) => {
            l.synced = true;
          });
        });
      }
    }
    console.log(`Pushed ${unsyncedLogs.length} attendance logs to cloud`);
  } catch (err) {
    console.log('Error pushing attendance logs:', err);
  }
}

// ─── FULL TWO-WAY SYNC ───────────────────────────────────
export async function syncAll(): Promise<void> {
  await pushUnsyncedAttendance();
  await pullMembersFromCloud();
  await pullEventsFromCloud();
}