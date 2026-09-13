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
}): Promise<Member> {
  const membersCollection = database.get<Member>('members');
  let newMember!: Member;

  await database.write(async () => {
    newMember = await membersCollection.create(member => {
      member.firstName = data.firstName;
      member.middleInitial = data.middleInitial ?? '';
      member.lastName = data.lastName;
      member.birthday = data.birthday ?? '';
      member.age = data.age ?? '';
      member.gender = data.gender ?? '';
      member.phone = data.phone ?? '';
      member.email = data.email ?? '';
      member.address = data.address ?? '';
      member.status = data.status;
      member.ministry = data.ministry ?? '';
      member.joinedDate = data.joinedDate ?? new Date().toISOString().split('T')[0];
      member.howTheyHeard = data.howTheyHeard ?? '';
    });
  });

  syncMemberToSupabase(newMember);
  return newMember;
}

// ─── LOG ATTENDANCE (saves locally first) ────────────────
export async function logAttendance(
  memberId: string,
  eventId: string,
  isGuest: boolean = false,
): Promise<void> {
  const attendanceCollection = database.get('attendance_logs');

  await database.write(async () => {
    await attendanceCollection.create((log: any) => {
      log.memberId = memberId;
      log.eventId = eventId;
      log.isGuest = isGuest;
      log.synced = false;
      log.checkedInAt = new Date();
    });
  });

  // Try to sync immediately if online
  syncAttendanceToSupabase(memberId, eventId, isGuest);
}

// ─── SYNC MEMBER TO SUPABASE ─────────────────────────────
async function syncMemberToSupabase(member: Member) {
  try {
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
      ministry: member.ministry || null,
      how_they_heard: member.howTheyHeard || null,
      joined_date: member.joinedDate || new Date().toISOString().split('T')[0],
    });
    if (error) console.log('Sync error (will retry later):', error.message);
    else console.log('Member synced to Supabase ✅');
  } catch (e) {
    console.log('Offline — will sync later');
  }
}

// ─── SYNC ATTENDANCE TO SUPABASE ─────────────────────────
async function syncAttendanceToSupabase(
  memberId: string,
  eventId: string,
  isGuest: boolean,
) {
  try {
    const { error } = await supabase.from('attendance_logs').insert({
      member_id: memberId,
      event_id: eventId,
      is_guest: isGuest,
      checked_in_at: new Date().toISOString(),
      synced: true,
    });
    if (error) console.log('Attendance sync error:', error.message);
    else console.log('Attendance synced to Supabase ✅');
  } catch (e) {
    console.log('Offline — attendance will sync later');
  }
}