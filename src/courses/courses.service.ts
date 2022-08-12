import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import Course from './entities/course.entity';
import Tag from './entities/tag.entity';

@Injectable()
export class CoursesService {
    constructor(
        @Inject('COURSES_REPOSITORY')
        private readonly courseRepository: Repository<Course>,

        @Inject('TAGS_REPOSITORY')
        private readonly tagRepository: Repository<Tag>,
      ) {}

    async findAll(): Promise<Course[]>  {
       return this.courseRepository.find();
    }

    async findOne(id: number) {
        const course = await this.courseRepository.findOne({where: {id}});
        if (!course) throw new NotFoundException(`Course ID ${id} not found`);
        return course;
    }

    create(createCourseDto: CreateCourseDto) {
        const course = this.courseRepository.create(createCourseDto);
        return this.courseRepository.save(course);
    }

    async update(id: string, updateCourseDto: UpdateCourseDto) {
        const course = await this.courseRepository.preload({
            id: +id,
            ...updateCourseDto
        });
        if (!course) throw new NotFoundException('Course ID '+id+' not found');
        return this.courseRepository.save(course);
    }

    async remove(id: number) {
        const course = await this.courseRepository.findOne({where: {id}});
        if (!course) throw new NotFoundException('Course ID '+id+' not found');
        return this.courseRepository.remove(course);
    }

}
