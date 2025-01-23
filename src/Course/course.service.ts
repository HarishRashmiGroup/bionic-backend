import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { Course } from './entities/Course.entity';
import { TokenExpiredError } from 'jsonwebtoken';

@Injectable()
export class CourseService {
  constructor(private readonly em: EntityManager) { }

  async createCourse(name: string, url: string): Promise<Course> {
    const course = new Course(name, url);
    await this.em.persistAndFlush(course);
    return course;
  }

  async getAllCourses(userId: number): Promise<Course[]> {
    if ([1, 2, 3, 4].includes(userId))
      return await this.em.find(Course, {});
    else throw new UnauthorizedException();
  }

  async getCourseById(id: number): Promise<Course | null> {
    return await this.em.findOne(Course, { id });
  }

  async updateCourse(courseId: number, newUrl: string): Promise<Course | null> {
    const course = await this.getCourseById(courseId);
    if (!course) {
      return null;
    }
    course.url = newUrl;
    await this.em.persistAndFlush(course);
    return course;
  }

}
