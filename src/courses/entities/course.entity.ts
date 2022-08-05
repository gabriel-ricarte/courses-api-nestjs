import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('courses')
export default class Course {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 120})
    name: string;

    @Column('text')
    description: string;

    @Column('json', {nullable: true})
    tags: string[];
}