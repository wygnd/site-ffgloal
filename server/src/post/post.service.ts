import {HttpException, HttpStatus, Injectable, Req} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {PostModel} from "./post.model";
import {CreatePostDto} from "./dto/create-post.dto";
import {StatusService} from "../status/status.service";
import {JwtService} from "@nestjs/jwt";
import {ChangePostStatusDto} from "./dto/change-post-status.dto";

@Injectable()
export class PostService {
  constructor(@InjectModel(PostModel) private postRepository: typeof PostModel,
              private statusService: StatusService,
              private jwtService: JwtService) {
  }

  async createPost(postDto: CreatePostDto, @Req() req: Request) {
    const user = this.getUserByToken(req.headers['authorization']);
    const post = await this.postRepository.create({...postDto, author_id: user.user_id});
    const status = await this.statusService.getStatusByValue("Draft");
    await post.$set("status", [status.status_id])
    post.status = status;
    return post;
  }

  async getPostsByType(type: string) {
    return this.postRepository.findAll({where: {type}})
  }

  async removePostById(post_id: string) {
    const post = await this.postRepository.findByPk(post_id, {include: {all: true}});
    if (!post) {
      throw new HttpException(`Такой записи не существует`, HttpStatus.NOT_FOUND);
    }
    await post.$remove("status", post.status.status_id)
    await post.destroy();
    return {message: "Запись успешно удалена", status: 200};
  }

  async changePostStatus(dto: ChangePostStatusDto) {
    const post = await this.postRepository.findByPk(dto.post_id, {include: {all: true}});
    const status = await this.statusService.getStatusById(dto.status_id);

    if (!post) {
      throw new HttpException(`Такой записи не существует`, HttpStatus.NOT_FOUND);
    }

    if (!status) {
      throw new HttpException(`Такого статуса не существует`, HttpStatus.NOT_FOUND);
    }

    await post.$set('status', status.status_id);
    return this.postRepository.findByPk(dto.post_id, {include: {all: true}});
  }

  private getUserByToken(token: string) {
    try {
      const token_name = token.split(' ')[0];
      const token_value = token.split(' ')[1];

      if (token_name !== "Bearer" || !token_value) {
        throw new HttpException("", HttpStatus.FORBIDDEN);
      }

      return this.jwtService.verify(token_value);
    } catch (e) {
      throw new HttpException(e, HttpStatus.FORBIDDEN);
    }
  }
}
