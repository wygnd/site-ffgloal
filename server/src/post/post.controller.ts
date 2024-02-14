import {Body, Controller, Delete, Get, Header, Param, Post, Req, UseGuards} from '@nestjs/common';
import {PostService} from './post.service';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {CreatePostDto} from "./dto/create-post.dto";
import {PostModel} from "./post.model";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {UserModel} from "../users/user.model";
import {ChangePostStatusDto} from "./dto/change-post-status.dto";

@ApiTags('Posts')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {
  }

  @ApiOperation({summary: "Создание новой записи"})
  @ApiResponse({status: 200, type: PostModel})
  // @UseGuards(JwtAuthGuard)
  @Post('/create')
  createPost(@Body() dto: CreatePostDto, @Req() req: Request) {
    return this.postService.createPost(dto, req)
  }

  @ApiOperation({summary: "Получить все записи по типу"})
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Get('/:type')
  getPostsByType(@Param('type') type: string) {
    return this.postService.getPostsByType(type);
  }

  @ApiOperation({summary: "Удаление записи по уникальному идентификатору"})
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
}
