import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Course {
    @PrimaryKey()
    id: number;

    @Property()
    name: string;

    @Property()
    url: string;

    constructor(name: string, url: string) {
        this.name = name;
        this.url = url;
    }
}