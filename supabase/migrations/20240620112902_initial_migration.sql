create table "public"."items" (
    "id" uuid not null default gen_random_uuid(),
    "amount" numeric not null,
    "name" text not null,
    "created_at" timestamp with time zone not null default now()
);


alter table "public"."items" enable row level security;

CREATE UNIQUE INDEX items_pkey ON public.items USING btree (id);

alter table "public"."items" add constraint "items_pkey" PRIMARY KEY using index "items_pkey";

grant delete on table "public"."items" to "anon";

grant insert on table "public"."items" to "anon";

grant references on table "public"."items" to "anon";

grant select on table "public"."items" to "anon";

grant trigger on table "public"."items" to "anon";

grant truncate on table "public"."items" to "anon";

grant update on table "public"."items" to "anon";

grant delete on table "public"."items" to "authenticated";

grant insert on table "public"."items" to "authenticated";

grant references on table "public"."items" to "authenticated";

grant select on table "public"."items" to "authenticated";

grant trigger on table "public"."items" to "authenticated";

grant truncate on table "public"."items" to "authenticated";

grant update on table "public"."items" to "authenticated";

grant delete on table "public"."items" to "service_role";

grant insert on table "public"."items" to "service_role";

grant references on table "public"."items" to "service_role";

grant select on table "public"."items" to "service_role";

grant trigger on table "public"."items" to "service_role";

grant truncate on table "public"."items" to "service_role";

grant update on table "public"."items" to "service_role";

create policy "Enable read access for all users"
on "public"."items"
as permissive
for select
to public
using (true);


create policy "ログインで追加可能"
on "public"."items"
as permissive
for insert
to authenticated
with check (true);



