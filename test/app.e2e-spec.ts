/*
 * @Author: Pacific_D
 * @Date: 2022-08-30 17:22:57
 * @LastEditTime: 2022-11-02 22:25:48
 * @LastEditors: Pacific_D
 * @Description:
 * @FilePath: \nest-boilerplate\test\app.e2e-spec.ts
 */
import { Test, TestingModule } from "@nestjs/testing"
import { INestApplication } from "@nestjs/common"
import * as request from "supertest"
import { AppModule } from "./../src/app.module"

describe("AppController (e2e)", () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it("/ (GET)", () => {
    return request(app.getHttpServer())
      .get("/")
      .expect(200)
      .expect("Hello World!")
  })
})
