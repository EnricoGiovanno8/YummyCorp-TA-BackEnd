import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CardController } from './card.controller';
import { CardService } from './card.service';
import { Card } from './models/card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Card]), AuthModule],
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}
