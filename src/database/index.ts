import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { mySchema } from './schema';
import {
  Ministry,
  SmallGroup,
  Member,
  EmergencyContact,
  FamilyMember,
  Event,
  AttendanceLog,
} from './models';

const adapter = new SQLiteAdapter({
  schema: mySchema,
  dbName: 'ChurchApp',
  jsi: true,
  onSetUpError: error => {
    console.error('Database setup error:', error);
  },
});

export const database = new Database({
  adapter,
  modelClasses: [
    Ministry,
    SmallGroup,
    Member,
    EmergencyContact,
    FamilyMember,
    Event,
    AttendanceLog,
  ],
});