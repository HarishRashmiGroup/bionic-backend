import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CourseService } from './course.service';
import { Course } from './entities/course.entity';
import { Auth } from 'src/common/decorators/auth.decorator';
import { User } from 'src/common/decorators/user.decorator';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) { }

  // @Auth()
  // @Post()
  // async createCourse(@Body() body: { name: string; url: string }): Promise<Course> {
  //   const { name, url } = body;
  //   return await this.courseService.createCourse(name, url);
  // }

  @Auth()
  @Get()
  async getAllCourses(@User()userId: number): Promise<Course[]> {
    return await this.courseService.getAllCourses(userId);
  }

  // @Auth()
  // @Get(':id')
  // async getCourseById(@Param('id') id: number): Promise<Course | null> {
  //   return await this.courseService.getCourseById(id);
  // }

  @Auth()
  @Put('')
  async updateCourse(
    @Body() body: { courseId: number; newUrl: string },
  ): Promise<Course | null> {
    const { courseId, newUrl } = body;
    return await this.courseService.updateCourse(courseId, newUrl);
  }

}
