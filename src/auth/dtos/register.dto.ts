import { IsString, IsEmail, IsStrongPassword } from "class-validator";


export class RegisterDto {

    @IsString()
    name: string;


    @IsString()
    @IsEmail()
    email: string;
    
    
    @IsString()
    @IsStrongPassword()
    password: string;


}