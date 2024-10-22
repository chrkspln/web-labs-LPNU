import {IsNotEmpty} from "class-validator";

export class CreatePerfumeDto {
    @IsNotEmpty()
    readonly id: number;

    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    readonly brand: string;

    @IsNotEmpty()
    readonly price: number;

    @IsNotEmpty()
    readonly scent: string;

    @IsNotEmpty()
    readonly volume: string;
}
