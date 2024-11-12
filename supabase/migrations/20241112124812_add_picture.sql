alter table "public"."items" add column "picture" text;

create policy "Enable delete for users based on user_id"
on "public"."items"
as permissive
for delete
to public
using (true);


create policy "Enable update for users based on email"
on "public"."items"
as permissive
for update
to authenticated
using (true)
with check (true);



