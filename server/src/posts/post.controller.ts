import {Body, Controller, Delete, Get, Headers, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {PostService} from './post.service';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {CreatePostDto} from "./dto/create-post.dto";
import {PostModel} from "./post.model";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {ChangePostStatusDto} from "./dto/change-post-status.dto";
import {ChangePostDto} from "./dto/change-post.dto";
import {GetPostsDto} from "./dto/get-posts.dto";
import {GetPostDto} from "./dto/get-post.dto";

@ApiTags('Posts')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {
  }

  @ApiOperation({summary: "Создание новой записи"})
  @ApiResponse({status: 200, type: PostModel})
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  createPost(@Body() dto: CreatePostDto, @Headers('Authorization') token: string) {
    return this.postService.createPost(dto, token)
  }

  @ApiOperation({summary: "Получить все записи по типу"})
  @Get('/:type')
  getPostsByType(@Param('type') type: string) {
    return this.postService.getPostsByType(type);
  }

  @ApiOperation({summary: "Получить записи с определенными параметрами"})
  @ApiResponse({status: 200, type: [PostModel]})
  @Post()
  getPosts(@Body() args: GetPostsDto) {
    return this.postService.getPostsWithArgs(args);
  }

  @Post('/post')
  getPost(@Body() args: GetPostDto) {
    return this.postService.getPost(args);
  }

  @ApiOperation({summary: "Удаление записи"})
  @Roles("ADMIN", "EDITOR")
  @UseGuards(RolesGuard)
  @Delete('/:post_id')
  removePostByID(@Param('post_id') post_id: string) {
    return this.postService.removePostById(post_id);
  }

  @ApiOperation({summary: "Изменение статуса записи"})
  @Post('/status')
  changePostStatus(@Body() dto: ChangePostStatusDto) {
    return this.postService.changePostStatus(dto);
  }

  @ApiOperation({summary: "Изменение записи"})
  @Patch('/change')
  changePost(@Body() dto: ChangePostDto, @Headers('Authorization') token: string) {
    return this.postService.changePostData(dto, token);
  }

  @ApiOperation({summary: "Клонировать запись"})
  @Roles("ADMIN", "EDITOR")
  @UseGuards(RolesGuard,)
  @Post('/clone/:post_id')
  clonePost(@Param('post_id') post_id: number, @Headers('Authorization') token: string) {
    return this.postService.clonePost(post_id, token);
  }
}
