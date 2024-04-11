import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UrlsService } from './urls.service';
import CreateUrlDto from './dto/create-url.dto';
import UpdateUrlDto from './dto/update-url.dto';

@Controller({ path: 'urls', version: '1' })
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  createOne(@Body() createUrlDto: CreateUrlDto) {
    return this.urlsService.createOne(createUrlDto);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string) {
    return this.urlsService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  updateOne(@Param('id') id: string, @Body() updateUrlDto: UpdateUrlDto) {
    return this.urlsService.updateOne(id, updateUrlDto);
  }

  @Get('')
  @HttpCode(HttpStatus.OK)
  findMany() {
    return this.urlsService.findMany();
  }
}
