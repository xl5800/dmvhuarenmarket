-- Fix for: ERROR 42P13: no function body specified
-- Run this after the schema stopped around public.is_admin(...).

create or replace function public.is_admin(user_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = user_id and role = 'admin'
  );
$$;

alter table public.profiles enable row level security;
alter table public.listings enable row level security;
alter table public.reports enable row level security;
alter table public.favorites enable row level security;

drop policy if exists "profiles are readable by owner or admin" on public.profiles;
create policy "profiles are readable by owner or admin"
on public.profiles for select
using (auth.uid() = id or public.is_admin(auth.uid()));

drop policy if exists "users can update own profile" on public.profiles;
create policy "users can update own profile"
on public.profiles for update
using (auth.uid() = id)
with check (auth.uid() = id and role = 'user');

drop policy if exists "public can read approved listings" on public.listings;
create policy "public can read approved listings"
on public.listings for select
using (status = 'approved' or auth.uid() = user_id or public.is_admin(auth.uid()));

drop policy if exists "users can create pending listings" on public.listings;
create policy "users can create pending listings"
on public.listings for insert
with check (auth.uid() = user_id and status = 'pending');

drop policy if exists "users can update own non-approved listings" on public.listings;
create policy "users can update own non-approved listings"
on public.listings for update
using (auth.uid() = user_id)
with check (
  auth.uid() = user_id
  and status in ('pending', 'expired')
);

drop policy if exists "admins can manage all listings" on public.listings;
create policy "admins can manage all listings"
on public.listings for all
using (public.is_admin(auth.uid()))
with check (public.is_admin(auth.uid()));

drop policy if exists "authenticated users can report listings" on public.reports;
create policy "authenticated users can report listings"
on public.reports for insert
with check (auth.uid() = reporter_id);

drop policy if exists "admins can read reports" on public.reports;
create policy "admins can read reports"
on public.reports for select
using (public.is_admin(auth.uid()));

drop policy if exists "users can manage own favorites" on public.favorites;
create policy "users can manage own favorites"
on public.favorites for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
