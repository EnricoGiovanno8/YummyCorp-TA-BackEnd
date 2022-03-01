import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CardService } from './card.service';
import { Card } from './models/card.entity';
import { CreateCardDto } from './models/dto/create-card.dto';

@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getUserCards(@Request() req: any): Promise<Card[]> {
    return this.cardService.findUserCards(req.user.id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createCard(
    @Request() req: any,
    @Body() body: CreateCardDto,
  ): Promise<Card> {
    return await this.cardService.create(req.user.id, body);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async deleteCard(@Request() req: any, @Param('id') id: number): Promise<any> {
      return await this.cardService.delete(id)
  };
}
