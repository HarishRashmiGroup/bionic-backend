import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import mikroOrmConfig from './mikro-orm.config';
import { UserBionicModule } from './UserBionic/userBionic.module';
import { CourseModule } from './Course/course.module';
import { JwtMiddleware } from './common/jwtMiddleware';

@Module({
  imports: [MikroOrmModule.forRoot(mikroOrmConfig),
    UserBionicModule,
    CourseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('*');
  }
}
