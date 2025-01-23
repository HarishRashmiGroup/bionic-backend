import { Injectable, UnauthorizedException } from "@nestjs/common";
import { EntityManager, IntegerType } from "@mikro-orm/core";
import * as bcrypt from "bcrypt";
import { UserBionic } from "./entities/UserBionic.entity";
import { Course } from "src/Course/entities/Course.entity";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";

@Injectable()
export class UserBionicService {
    constructor(
        @InjectRepository(UserBionic)
        private readonly userRepository: EntityRepository<UserBionic>,

        @InjectRepository(Course)
        private readonly courseReponsitory: EntityRepository<Course>,
        private readonly em: EntityManager) { }

    async createUser(userId: number, name: string, email: string, password: string, courseId: number): Promise<UserBionic> {
        if (![1, 2, 3, 4].includes(userId)) throw new UnauthorizedException();
        const course = await this.courseReponsitory.findOneOrFail({ id: courseId });
        const user = new UserBionic({ name, email, password, course });
        await this.em.persistAndFlush(user);
        return user;
    }

    async findUserByEmail(email: string): Promise<UserBionic | null> {
        return await this.em.findOne(UserBionic, { email });
    }

    async findUserById(id: number): Promise<UserBionic | null> {
        return await this.em.findOne(UserBionic, { id });
    }

    async verifyPassword(email: string, plainPassword: string) {
        const user = await this.findUserByEmail(email);
        if (!user) return null;

        if (await bcrypt.compare(plainPassword, user.password)) return user;
        return null;
    }

    async findBasicDetails(userId: number) {
        const user = await this.userRepository.findOneOrFail({ id: userId }, { populate: ['course'] });
        return ({ name: user.name, eligibleCourse: user.course.name, courseUrl: user.course.url });
    }
}
