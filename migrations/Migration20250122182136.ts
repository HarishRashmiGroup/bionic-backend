import { Migration } from '@mikro-orm/migrations';

export class Migration20250122182136 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "course" ("id" serial primary key, "name" varchar(255) not null, "url" varchar(255) not null);`);

    this.addSql(`alter table "user_bionic" add column "course_id" int not null;`);
    this.addSql(`alter table "user_bionic" add constraint "user_bionic_course_id_foreign" foreign key ("course_id") references "course" ("id") on update cascade;`);
  }

}
