import { IsNumber, IsString } from "class-validator";

export class CreateBookDto {
    @IsString()
    readonly title: string;

    @IsString()
    readonly description: string;

    @IsString()
    readonly author: string;

    @IsNumber()
    readonly page_num: number;

    @IsString({ each: true })
    readonly tags: string[];
}