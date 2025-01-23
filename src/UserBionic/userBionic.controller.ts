import { Controller, Post, Get, Body, Param } from "@nestjs/common";
import { UserBionicService } from "./userBionic.service";
import { JwtService } from '@nestjs/jwt';
import { Auth } from "src/common/decorators/auth.decorator";
import { User } from "src/common/decorators/user.decorator";


@Controller("users")
export class UserBionicController {
    constructor(private readonly userBionicService: UserBionicService,

        private readonly jwtService: JwtService,
    ) { }

    @Auth()
    @Post()
    async createUser(
        @User()userId: number,
        @Body() body: { name: string; email: string; password: string; courseId: number },
    ): Promise<any> {
        const { name, email, password, courseId } = body;
        const user = await this.userBionicService.createUser(userId, name, email, password, courseId);
        return { id: user.id, name: user.name, email: user.email };
    }
    
    @Auth()
    @Get("/basic")
    async getBasicDetails(@User() userId: number) {
        return this.userBionicService.findBasicDetails(userId);
    }


    // @Get(":email")
    // async getUserByEmail(@Param("email") email: string): Promise<any> {
    //     const user = await this.userBionicService.findUserByEmail(email);
    //     if (!user) {
    //         return { message: "User not found" };
    //     }
    //     return { id: user.id, name: user.name, email: user.email, courseId: user.course.id };
    // }

    @Post("verify")
    async verifyPassword(
        @Body() body: { email: string; password: string },
    ) {
        const { email, password } = body;
        const user = await this.userBionicService.verifyPassword(email, password);
        if (!user) return {
            message: 'failed',
            status: 403
        }
        const payload = {
            userId: user.id,
            email: email,
            name: user.name,
        };
        const token = this.jwtService.sign(payload);
        return { success: true, data: { token, reset: user.reset } };
    }

}
