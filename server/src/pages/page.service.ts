import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {PageModel} from "./page.model";
import {CreatePageDto} from "./dto/create-page.dto";
import {StatusService} from "../status/status.service";
import {ChangePageDto} from "./dto/change-page.dto";
import {ChangePageStatusDto} from "./dto/change-page-status.dto";

@Injectable()
export class PageService {
  constructor(@InjectModel(PageModel) private pageRepository: typeof PageModel,
              private statusService: StatusService) {
  }

  async getAllPages() {
    return await this.pageRepository.findAll({include: {all: true}});
  }

  async createPage(dto: CreatePageDto) {
    const candidate = await this.pageRepository.findOne({where: {slug: dto.slug}});

    if (candidate) {
      throw new HttpException("Невозможно создать такую же страницу", HttpStatus.BAD_REQUEST);
    }
    const status = await this.statusService.getStatusByValue("Draft");

    if (!status) {
      throw new HttpException('Что-то пошло не так, скорее всего нет статуса(draft)', HttpStatus.BAD_REQUEST);
    }

    const newPage = await this.pageRepository.create(dto);
    await newPage.$set('status', status.status_id);

    return await this.pageRepository.findByPk(newPage.page_id, {include: {all: true}});
  }

  async getPageById(page_id: number) {
    const page = await this.pageRepository.findByPk(page_id, {include: {all: true}});

    if (!page) {
      throw new HttpException(`Страницы не обнаружено`, HttpStatus.NOT_FOUND);
    }
    return page;
  }

  async changePage(dto: ChangePageDto) {
    const page = await this.pageRepository.findByPk(dto.page_id);

    if (!page) {
      throw new HttpException(`Страницы не обнаружено`, HttpStatus.NOT_FOUND);
    }

    return await page.update({title: dto.title, slug: dto.slug, menu_order: dto.menu_order});
  }

  async changePageStatus(dto: ChangePageStatusDto) {
    const page = await this.pageRepository.findByPk(dto.page_id, {include: {all: true}});
    const status = await this.statusService.getStatusByValue(dto.status);

    if (!page) {
      throw new HttpException(`Страницы не обнаружено`, HttpStatus.NOT_FOUND);
    }
    if (!status) {
      throw new HttpException(`Статса не обнаружено`, HttpStatus.NOT_FOUND);
    }

    return await page.$set('status', status.status_id);
  }

  async deletePage(page_id: number) {
    try {
      const page = await this.pageRepository.findByPk(page_id, {include: {all: true}});

      if (!page) {
        throw new HttpException(`Страницы не обнаружено`, HttpStatus.NOT_FOUND);
      }

      await page.$remove('status', page.status.status_id);
      await page.$remove('posts', page.posts);
      await page.destroy();
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }
}
