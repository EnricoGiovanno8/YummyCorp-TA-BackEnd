import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FavouriteService } from './favourite.service';
import { Favourite } from './models/favourite.entity';

@Controller('favourite')
export class FavouriteController {
  constructor(private readonly favouriteService: FavouriteService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getFavourites(
    @Request() req: any,
    @Query('page', ParseIntPipe) page = 1,
  ): Promise<any> {
    return await this.favouriteService.findAll(req.user.id, page);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async addToFavourite(
    @Request() req: any,
    @Body() body: any,
  ): Promise<Favourite> {
    return await this.favouriteService.addToFavourite(
      req.user.id,
      body.productId,
    );
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async removeFromFavourite(@Request() req: any, @Param('id') id: number) {
    return await this.favouriteService.removeFromFavourite(id);
  }
}
