import { IsIn, IsOptional, IsString } from "class-validator"
import { UserGenderType } from "../user.entity"

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    name: string

    @IsOptional()
    @IsString()
    password: string

    @IsOptional()
    @IsString()
    address: string

    @IsOptional()
    @IsIn([UserGenderType.Male, UserGenderType.Female, UserGenderType.Both])
    gender: UserGenderType
}