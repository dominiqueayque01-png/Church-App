import { appSchema, tableSchema } from '@nozbe/watermelondb';

export const mySchema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'ministries',
      columns: [
        { name: 'name', type: 'string' },
        { name: 'description', type: 'string', isOptional: true },
        { name: 'created_at', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'small_groups',
      columns: [
        { name: 'name', type: 'string' },
        { name: 'ministry_id', type: 'string', isOptional: true },
        { name: 'schedule', type: 'string', isOptional: true },
        { name: 'created_at', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'members',
      columns: [
        { name: 'first_name', type: 'string' },
        { name: 'last_name', type: 'string' },
        { name: 'birthday', type: 'string', isOptional: true },
        { name: 'phone', type: 'string', isOptional: true },
        { name: 'email', type: 'string', isOptional: true },
        { name: 'address', type: 'string', isOptional: true },
        { name: 'status', type: 'string' },
        { name: 'ministry_id', type: 'string', isOptional: true },
        { name: 'small_group_id', type: 'string', isOptional: true },
        { name: 'how_they_heard', type: 'string', isOptional: true },
        { name: 'joined_date', type: 'string', isOptional: true },
        { name: 'created_at', type: 'number' },
        { name: 'synced_at', type: 'number', isOptional: true },
      ],
    }),
    tableSchema({
      name: 'emergency_contacts',
      columns: [
        { name: 'member_id', type: 'string' },
        { name: 'name', type: 'string' },
        { name: 'relationship', type: 'string', isOptional: true },
        { name: 'phone', type: 'string' },
        { name: 'created_at', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'family_members',
      columns: [
        { name: 'member_id', type: 'string' },
        { name: 'name', type: 'string' },
        { name: 'relationship', type: 'string', isOptional: true },
        { name: 'birthday', type: 'string', isOptional: true },
        { name: 'created_at', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'events',
      columns: [
        { name: 'name', type: 'string' },
        { name: 'type', type: 'string', isOptional: true },
        { name: 'event_date', type: 'string' },
        { name: 'day_of_week', type: 'string', isOptional: true },
        { name: 'time_slot', type: 'string', isOptional: true },
        { name: 'description', type: 'string', isOptional: true },
        { name: 'created_at', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'attendance_logs',
      columns: [
        { name: 'member_id', type: 'string' },
        { name: 'event_id', type: 'string' },
        { name: 'checked_in_at', type: 'number' },
        { name: 'is_guest', type: 'boolean' },
        { name: 'device_id', type: 'string', isOptional: true },
        { name: 'synced', type: 'boolean' },
        { name: 'created_at', type: 'number' },
      ],
    }),
  ],
});