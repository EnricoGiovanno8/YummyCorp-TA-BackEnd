import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { CreditCardType } from '../card.entity';

export class CreateCardDto {
  @IsNotEmpty()
  @IsString()
  number: string;

  @IsNotEmpty()
  @IsString()
  expMonth: string;

  @IsNotEmpty()
  @IsString()
  expYear: string;

  @IsNotEmpty()
  @IsString()
  cvc: string;

  @IsNotEmpty()
  @IsIn([CreditCardType.Visa, CreditCardType.Mastercard])
  type: CreditCardType;
}
