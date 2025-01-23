import { Migration } from '@mikro-orm/migrations';

export class Migration20250122175601 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "user_bionic" ("id" serial primary key, "name" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "reset" boolean not null);`);
  }

  override async down(): Promise<void> {
    this.addSql(`create table "comment" ("id" serial primary key, "description" text not null, "created_by_id" int4 not null, "task_id" int4 null, "created_at" timestamptz(6) not null);`);

    this.addSql(`create table "task" ("id" serial primary key, "description" text not null, "due_date" date not null, "status" text check ("status" in ('pending', 'completed', 'paused')) not null default 'pending', "created_at" timestamptz(6) not null, "updated_at" timestamptz(6) null, "created_by_id" int4 not null, "assigned_to_id" int4 null);`);

    this.addSql(`create table "user" ("id" serial primary key, "name" varchar(255) not null, "email" varchar(255) not null, "otp" int4 null);`);

    this.addSql(`alter table "comment" add constraint "comment_created_by_id_foreign" foreign key ("created_by_id") references "user" ("id") on update cascade on delete no action;`);
    this.addSql(`alter table "comment" add constraint "comment_task_id_foreign" foreign key ("task_id") references "task" ("id") on update no action on delete cascade;`);

    this.addSql(`alter table "task" add constraint "task_assigned_to_id_foreign" foreign key ("assigned_to_id") references "user" ("id") on update cascade on delete set null;`);
    this.addSql(`alter table "task" add constraint "task_created_by_id_foreign" foreign key ("created_by_id") references "user" ("id") on update cascade on delete no action;`);
  }

}
