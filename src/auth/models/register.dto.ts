import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(2)
  password: string;

  @IsNotEmpty()
  @Length(2)
  passwordConfirmation: string;
}
