import { BeforeCreate, BeforeUpdate, Entity, ManyToMany, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Course } from "../../Course/entities/Course.entity";
import * as bcrypt from "bcrypt";

@Entity()
export class UserBionic {
    @PrimaryKey()
    id: number;

    @Property()
    name: string;

    @Property()
    email: string;

    @Property()
    password: string;

    @Property()
    reset: boolean = true;

    @ManyToOne({ entity: () => Course })
    course: Course

    constructor({ name, email, password, course }: { name: string, email: string, password: string, course: Course }) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.course = course;
    }
    @BeforeCreate()
    @BeforeUpdate()
    async hashPassword() {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
    }
}