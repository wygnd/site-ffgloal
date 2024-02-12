import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import {AppModule} from '../src/app.module';
import * as request from 'supertest';
import {RolesModel} from "../src/roles/roles.model";

describe('AppController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('get roles - success', async () => {
        const res = await request(app.getHttpServer()).get('/api/roles');

        expect(res.body).toBe([RolesModel])
        expect(res.statusCode).toBe(200)
    });
});
