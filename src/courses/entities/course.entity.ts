import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinColumn, JoinTable } from 'typeorm';
import Tag from './tag.entity';

@Entity('courses')
export default class Course {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 120})
    name: string;

    @Column('text')
    description: string;

    @JoinTable()
    @ManyToMany( () => Tag, (tag) => tag.courses, {
        cascade: true
    })
    tags: Tag[];
}