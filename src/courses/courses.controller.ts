import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('courses')
export class CoursesController {
    constructor(private readonly coursesSevice: CoursesService) {}

    @Get()
    findAll() {
        return this.coursesSevice.findAll();
    }

    // @Get(':id')
    // findOne(
    //     @Param() params
    // ) {
    //     return 'Curso ' + params.id + ' acessado com sucesso!';
    // } access all params without destructuring

    @Get(':id')
    findOne(@Param('id') id:number) {
        return this.coursesSevice.findOne(id);
    }

    @Post('create')
    create(@Body() createCourseDto: CreateCourseDto) {
        return this.coursesSevice.create(createCourseDto);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() updateCourseDto: UpdateCourseDto) {
        return this.coursesSevice.update(id, updateCourseDto);
    }

    @Delete(':id')
    remove(@Param('id') id:number) {
        return this.coursesSevice.remove(id);
    }
}
