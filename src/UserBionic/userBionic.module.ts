import { Module } from "@nestjs/common";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { UserBionic } from "./entities/UserBionic.entity";
import { UserBionicService } from "./userBionic.service";
import { UserBionicController } from "./userBionic.controller";
import { Course } from "../Course/entities/Course.entity";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constant";
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [MikroOrmModule.forFeature([UserBionic, Course]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
        useFactory: () => ({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '24h' }
        })
    })],
    controllers: [UserBionicController],
    providers: [UserBionicService, JwtStrategy],
})
export class UserBionicModule { }
