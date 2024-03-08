import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {PageService} from './page.service';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {PageModel} from "./page.model";
import {CreatePageDto} from "./dto/create-page.dto";
import {ChangePageDto} from "./dto/change-page.dto";
import {PostModel} from "../posts/post.model";
import {ChangePageStatusDto} from "./dto/change-page-status.dto";

@ApiTags("Pages")
@Controller('pages')
export class PageController {
  constructor(private readonly pageService: PageService) {
  }

  @ApiOperation({summary: "Получение всех страниц"})
  @ApiResponse({status: 200, type: [PageModel]})
  @Get()
  getAllPages() {
    return this.pageService.getAllPages();
  }

  @ApiOperation({summary: "Получение страницы по ID"})
  @ApiResponse({status: 200, type: PostModel})
  @Get('/:page_id')
  getPageById(@Param('page_id') page_id: number){
    return this.pageService.getPageById(page_id);
  }

  @ApiOperation({summary: "Создание новой страницы"})
  @ApiResponse({status: 200, type: PostModel})
  @Post('/create')
  createPage(@Body() dto: CreatePageDto) {
    return this.pageService.createPage(dto);
  }

  @ApiOperation({summary: "Изменение страницы"})
  @ApiResponse({status: 200, type: PostModel})
  @Patch('/change')
  changePageData(@Body() dto: ChangePageDto) {
    return this.pageService.changePage(dto);
  }

  @ApiOperation({summary: "Изменение статуса страницы"})
  @ApiResponse({status: 200, type: PostModel})
  @Patch('/change/status')
  changePostStatus(@Body() dto: ChangePageStatusDto){
    return this.pageService.changePageStatus(dto);
  }

  @ApiOperation({summary: "Удаление страницы по ID"})
  @ApiResponse({status: 200})
  @Delete('/:page_id')
  deletePage(@Param('page_id') page_id: number) {
  return this.pageService.deletePage(page_id);
  }
}
