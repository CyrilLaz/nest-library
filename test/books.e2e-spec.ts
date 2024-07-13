import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { getModelToken } from "@nestjs/mongoose";
import * as request from "supertest";

import { BooksController } from "src/books/books.controller";
import { JwtAuthGuard } from "src/auth/jwt.auth.guard";
import { BooksService } from "src/books/books.service";
import { Book } from "src/books/schemas/book.schema";
import { AppRespondInterceptor } from "src/app.respond.interceptor";
import { HttpExceptionFilter } from "src/app.exception.filter";
import { ValidationPipe } from "src/app.validation.pipe";
import { mockBook, mockBookModel } from "src/utils/mocks/book.model";

describe("BooksController (e2e)", () => {
    let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        BooksService,
        { provide: getModelToken(Book.name), useValue: mockBookModel },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    app = module.createNestApplication();
    app.useGlobalInterceptors(new AppRespondInterceptor());
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe(`/GET /books`, () => {
    it(`get all books`, async () => {
      const {
        body: { status, data },
      } = await request(app.getHttpServer()).get("/books/").expect(200);
      expect(status).toBe("success");
      expect(data).toEqual([mockBook]);
    });
    it(`get the book by id`, async () => {
      const {
        body: { status, data },
      } = await request(app.getHttpServer())
        .get(`/books/${mockBook._id}`)
        .expect(200);
      expect(status).toBe("success");
      expect(data).toEqual(mockBook);
    });
    it(`throw error by wrong id`, async () => {
      const wrongId = "123";
      const {
        body: { status, data },
      } = await request(app.getHttpServer())
        .get(`/books/${wrongId}`)
        .expect(400);
      expect(status).toBe("fail");
      expect(data.error).toBe("Bad Request");
    });
  });

  describe(`/POST /books`, () => {
    it(`add a book`, async () => {
      const {
        body: { status, data },
      } = await request(app.getHttpServer())
        .post("/books")
        .send({ title: mockBook.title })
        .expect(201);
      expect(status).toBe("success");
      expect(data).toEqual(mockBook);
    });
    it("bad request wrong field", async () => {
      const {
        body: { status, data },
      } = await request(app.getHttpServer())
        .post("/books")
        .send({ name: "alex" })
        .expect(400);
      expect(status).toBe("fail");
      expect(data.error).toEqual("Bad Request");
    });
  });

  describe("/PUT /books", () => {
    const newTitle = "А зори там тихие";
    it("edit book", async () => {
      const {
        body: { status, data },
      } = await request(app.getHttpServer())
        .put(`/books/${mockBook._id}`)
        .send({ title: newTitle })
        .expect(200);
      expect(status).toBe("success");
      expect(data).toEqual({ ...mockBook, title: newTitle });
    });
    it("wrong id edit book", async () => {
      const wrongId = "123";
      const {
        body: { status, data },
      } = await request(app.getHttpServer())
        .put(`/books/${wrongId}`)
        .send({ title: newTitle })
        .expect(400);
      expect(status).toBe("fail");
      expect(data.error).toBe("Bad Request");
    });
    it("wrong data edit book", async () => {
      const {
        body: { status, data },
      } = await request(app.getHttpServer())
        .put(`/books/${mockBook._id}`)
        .send({ name: "alex" })
        .expect(400);

      expect(status).toBe("fail");
      expect(data.error).toBe("Bad Request");
    });
  });
  describe("/DELETE /books", () => {
    it("delete book", async () => {
      const {
        body: { status, data },
      } = await request(app.getHttpServer())
        .delete(`/books/${mockBook._id}`)
        .expect(200);
      expect(status).toBe("success");
      expect(data).toEqual("ok");
    });
    it("wrong id edit book", async () => {
      const wrongId = "123";
      const {
        body: { status, data },
      } = await request(app.getHttpServer())
        .delete(`/books/${wrongId}`)
        .expect(400);
      expect(status).toBe("fail");
      expect(data.error).toBe("Bad Request");
    });
  });
});
