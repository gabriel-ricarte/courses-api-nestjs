import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import Course from './entities/course.entity';

@Injectable()
export class CoursesService {
    private courses:Course[] = [
        {
            id: 1,
            name: "Fundamentos do NestJS", 
            description: "Descrição aqui",
            tags: ["Node", "Nest", "Javascript"]
        },
    ];

    findAll() {
        return this.courses;
    }

    findOne(id: number) {
        const course = this.courses.find((course) => course.id === Number(id));
        if (!course) throw new HttpException(`Course ID ${id} not found`, HttpStatus.NOT_FOUND);
        return course;
    }

    create(createCourseDto: any) {
        const course = new Course(this.idGenerator(), createCourseDto.name, createCourseDto.description, createCourseDto.tags);
        this.courses.push(course);
    }

    update(id: number, updateCourseDto: any) {
        const courseIndex = this.courses.findIndex( (course) => Number(id) === course.id);
        if(courseIndex < 0) throw new HttpException(`Course ID ${id} not found`, HttpStatus.NOT_FOUND);
        for(let attribute in updateCourseDto) {
            this.courses[courseIndex][attribute] = updateCourseDto[attribute];
        }
    }

    remove(id: number) {
        const courseIndex = this.courses.findIndex( (course) => Number(id) === course.id);
        if(courseIndex < 0) throw new HttpException(`Course ID ${id} not found`, HttpStatus.NOT_FOUND); 
        this.courses.splice(courseIndex, 1);
    }

    idGenerator(): number {
        var nextId = Math.max(...this.courses.map(course=>course.id)) + 1;
        return nextId;
    }

}
