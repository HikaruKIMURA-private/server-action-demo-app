alter table "public"."items" enable row level security;

create policy "Enable insert for authenticated users only"
on "public"."items"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."items"
as permissive
for select
to public
using (true);



