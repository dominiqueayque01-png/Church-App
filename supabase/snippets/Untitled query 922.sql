-- 1. MINISTRIES
create table ministries (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  created_at timestamp default now()
);

-- 2. SMALL GROUPS
create table small_groups (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  ministry_id uuid references ministries(id) on delete set null,
  schedule text,
  created_at timestamp default now()
);

-- 3. MEMBERS
create table members (
  id uuid default gen_random_uuid() primary key,
  first_name text not null,
  last_name text not null,
  birthday date,
  phone text,
  email text,
  address text,
  status text default 'visitor' check (status in ('visitor', 'new_member', 'member', 'leader')),
  ministry_id uuid references ministries(id) on delete set null,
  small_group_id uuid references small_groups(id) on delete set null,
  how_they_heard text,
  joined_date date default current_date,
  created_at timestamp default now(),
  synced_at timestamp
);

-- 4. EMERGENCY CONTACTS
create table emergency_contacts (
  id uuid default gen_random_uuid() primary key,
  member_id uuid references members(id) on delete cascade,
  name text not null,
  relationship text,
  phone text not null,
  created_at timestamp default now()
);

-- 5. FAMILY MEMBERS
create table family_members (
  id uuid default gen_random_uuid() primary key,
  member_id uuid references members(id) on delete cascade,
  name text not null,
  relationship text,
  birthday date,
  created_at timestamp default now()
);

-- 6. EVENTS
create table events (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  type text check (type in ('ministry', 'fellowship', 'special')),
  event_date date not null,
  day_of_week text check (day_of_week in ('saturday', 'sunday', 'weekday')),
  time_slot text,
  description text,
  created_at timestamp default now()
);

-- 7. ATTENDANCE LOGS
create table attendance_logs (
  id uuid default gen_random_uuid() primary key,
  member_id uuid references members(id) on delete cascade,
  event_id uuid references events(id) on delete cascade,
  checked_in_at timestamp default now(),
  is_guest boolean default false,
  device_id text,
  synced boolean default false,
  created_at timestamp default now()
);