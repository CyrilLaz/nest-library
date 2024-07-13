import { Test, TestingModule } from "@nestjs/testing";
import { BooksService } from "./books.service";
import { getModelToken } from "@nestjs/mongoose";
import { Book } from "./schemas/book.schema";
import { CreateBookDto } from "./dto/create-book.dto";
import { mockBook, mockBookModel } from "src/utils/mocks/book.model";

describe("BooksService", () => {
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        { provide: getModelToken(Book.name), useValue: mockBookModel },
      ],
    }).compile();
    service = await module.resolve<BooksService>(BooksService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
  it("add new book", () => {
    let newBook: CreateBookDto = { title: "Над пропастью не ржи" };
    expect(service.create(newBook)).toEqual(mockBook);
  });
  it("get all books from db", () => {
    expect(service.getAll()).not.toHaveLength(0);
    expect(service.getAll()).toEqual([mockBook]);
  });
  it("find the book by id", () => {
    expect(service.getById(mockBook._id)).toEqual(mockBook);
    expect(service.getById("123")).not.toEqual(mockBook);
  });
  it("update the book", () => {
    const data = { title: "Продать за миллион" };
    expect(service.update(mockBook._id, data)).toEqual({
      ...mockBook,
      ...data,
    });
  });
  it("delete the book", () => {
    expect(service.delete(mockBook._id)).toEqual(mockBook);
  });
});
