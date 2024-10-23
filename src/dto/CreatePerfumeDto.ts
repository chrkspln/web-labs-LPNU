import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreatePerfumeDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    readonly brand: string;

    @IsNotEmpty()
    @IsNumber()
    readonly price: number;

    @IsNotEmpty()
    @IsString()
    readonly scent: string;

    @IsNotEmpty()
    @IsString()
    readonly volume: string;
}
