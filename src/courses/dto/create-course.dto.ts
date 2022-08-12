import { IsNotEmpty, IsString } from "class-validator";
import Tag from "../entities/tag.entity";

export class CreateCourseDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    readonly description: string;

    @IsString({each: true})
    @IsNotEmpty({each: true})
    readonly tags: Tag[];
}
