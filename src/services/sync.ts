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
  lastName: string;
  phone: string;
  email: string;
  address: string;
  birthday: string;
  status: string;
  howTheyHeard: string;
}): Promise<Member> {
  const membersCollection = database.get<Member>('members');
  let newMember!: Member;

  await database.write(async () => {
    newMember = await membersCollection.create(member => {
      member.firstName = data.firstName;
      member.lastName = data.lastName;
      member.phone = data.phone;
      member.email = data.email;
      member.address = data.address;
      member.birthday = data.birthday;
      member.status = data.status;
      member.howTheyHeard = data.howTheyHeard;
    });
  });

  // Try to sync to Supabase immediately if online
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
      last_name: member.lastName,
      phone: member.phone,
      email: member.email,
      address: member.address,
      birthday: member.birthday || null,
      status: member.status,
      how_they_heard: member.howTheyHeard,
      joined_date: new Date().toISOString().split('T')[0],
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