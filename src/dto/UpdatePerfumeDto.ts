import {IsOptional} from "class-validator";

export class UpdatePerfumeDto {
    @IsOptional()
    readonly name: string;

    @IsOptional()
    readonly brand: string;

    @IsOptional()
    readonly price: number;

    @IsOptional()
    readonly scent: string;

    @IsOptional()
    readonly volume: string;
}
