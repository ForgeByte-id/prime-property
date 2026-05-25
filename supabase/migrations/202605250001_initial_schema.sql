create extension if not exists "pgcrypto";

do $$
begin
  create type user_role as enum ('admin', 'superadmin');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type property_status as enum ('in_stock', 'sold_out', 'reserved');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type property_type as enum ('Rumah', 'Villa', 'Tanah', 'Ruko', 'Apartemen');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type siap_status as enum ('Siap Huni', 'Indent', 'Renovasi');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type audit_action as enum ('create', 'update', 'soft_delete', 'login', 'logout');
exception
  when duplicate_object then null;
end $$;

create table if not exists internal_users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  password_hash text not null,
  role user_role not null default 'admin',
  is_active boolean not null default true,
  failed_login_attempts integer not null default 0,
  failed_login_window_started_at timestamptz,
  locked_until timestamptz,
  last_login_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists properties (
  id uuid primary key default gen_random_uuid(),
  nama_property text not null check (length(nama_property) >= 3),
  property_group text not null,
  lebar_meter numeric(10,2) not null check (lebar_meter > 0),
  panjang_meter numeric(10,2) not null check (panjang_meter > 0),
  hadap text[] not null check (array_length(hadap, 1) >= 1),
  tipe property_type not null,
  tingkat integer not null check (tingkat >= 0),
  price_rupiah bigint not null check (price_rupiah > 0),
  carport integer not null check (carport >= 0),
  status property_status not null default 'in_stock',
  siap siap_status not null,
  maps_link text,
  kawasan text not null,
  unit text not null,
  is_featured boolean not null default false,
  created_by uuid not null references internal_users(id),
  updated_by uuid references internal_users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  message text not null,
  ip_address text not null,
  user_agent text not null,
  created_at timestamptz not null default now()
);

create table if not exists audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_user_id uuid not null references internal_users(id),
  entity_type text not null,
  entity_id uuid not null,
  action audit_action not null,
  old_values jsonb,
  new_values jsonb,
  ip_address text not null,
  user_agent text not null,
  created_at timestamptz not null default now()
);

create index if not exists properties_search_idx on properties using gin (
  to_tsvector('simple', nama_property || ' ' || property_group || ' ' || kawasan)
);
create index if not exists properties_kawasan_idx on properties(kawasan) where deleted_at is null;
create index if not exists properties_price_idx on properties(price_rupiah) where deleted_at is null;
create index if not exists properties_status_idx on properties(status) where deleted_at is null;
create index if not exists properties_tipe_idx on properties(tipe) where deleted_at is null;
create index if not exists properties_featured_idx on properties(is_featured, created_at desc) where deleted_at is null;
create index if not exists audit_logs_actor_created_idx on audit_logs(actor_user_id, created_at desc);

alter table internal_users enable row level security;
alter table properties enable row level security;
alter table contact_messages enable row level security;
alter table audit_logs enable row level security;
