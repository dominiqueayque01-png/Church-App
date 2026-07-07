import { Model } from '@nozbe/watermelondb';
import { field, date, readonly, text } from '@nozbe/watermelondb/decorators';

// ─── MINISTRY ───────────────────────────────────────
export class Ministry extends Model {
  static table = 'ministries';

  @text('name') name!: string;
  @text('description') description!: string;
  @readonly @date('created_at') createdAt!: Date;
}

// ─── SMALL GROUP ────────────────────────────────────
export class SmallGroup extends Model {
  static table = 'small_groups';

  @text('name') name!: string;
  @field('ministry_id') ministryId!: string;
  @text('schedule') schedule!: string;
  @readonly @date('created_at') createdAt!: Date;
}

// ─── MEMBER ─────────────────────────────────────────
export class Member extends Model {
  static table = 'members';

  @text('first_name') firstName!: string;
  @text('last_name') lastName!: string;
  @text('birthday') birthday!: string;
  @text('phone') phone!: string;
  @text('email') email!: string;
  @text('address') address!: string;
  @text('status') status!: string;
  @field('ministry_id') ministryId!: string;
  @field('small_group_id') smallGroupId!: string;
  @text('how_they_heard') howTheyHeard!: string;
  @text('joined_date') joinedDate!: string;
  @readonly @date('created_at') createdAt!: Date;
  @date('synced_at') syncedAt!: Date;
}

// ─── EMERGENCY CONTACT ──────────────────────────────
export class EmergencyContact extends Model {
  static table = 'emergency_contacts';

  @field('member_id') memberId!: string;
  @text('name') name!: string;
  @text('relationship') relationship!: string;
  @text('phone') phone!: string;
  @readonly @date('created_at') createdAt!: Date;
}

// ─── FAMILY MEMBER ──────────────────────────────────
export class FamilyMember extends Model {
  static table = 'family_members';

  @field('member_id') memberId!: string;
  @text('name') name!: string;
  @text('relationship') relationship!: string;
  @text('birthday') birthday!: string;
  @readonly @date('created_at') createdAt!: Date;
}

// ─── EVENT ──────────────────────────────────────────
export class Event extends Model {
  static table = 'events';

  @text('name') name!: string;
  @text('type') type!: string;
  @text('event_date') eventDate!: string;
  @text('day_of_week') dayOfWeek!: string;
  @text('time_slot') timeSlot!: string;
  @text('description') description!: string;
  @readonly @date('created_at') createdAt!: Date;
}

// ─── ATTENDANCE LOG ──────────────────────────────────
export class AttendanceLog extends Model {
  static table = 'attendance_logs';

  @field('member_id') memberId!: string;
  @field('event_id') eventId!: string;
  @date('checked_in_at') checkedInAt!: Date;
  @field('is_guest') isGuest!: boolean;
  @text('device_id') deviceId!: string;
  @field('synced') synced!: boolean;
  @readonly @date('created_at') createdAt!: Date;
}