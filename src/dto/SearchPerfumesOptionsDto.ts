import {IsOptional, IsString} from "class-validator";

export class SearchPerfumesOptionsDto {
    @IsString()
    @IsOptional()
    readonly sorted: boolean;

    @IsString()
    @IsOptional()
    readonly searchTerm: string;
}
