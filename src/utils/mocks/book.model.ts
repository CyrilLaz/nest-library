import { CreateBookDto } from "src/books/dto/create-book.dto";
import { UpdateBookDto } from "src/books/dto/update-book.dto";

export const mockBook = {
  _id: "6687edb3c8809cdc8b731710",
  title: "Над пропастью не ржи",
};

export const mockBookModel = {
  create: (data: CreateBookDto) => ({ ...mockBook, ...data }),
  findById: (id: string) => [mockBook].find((e) => e._id === id),
  find: () => [mockBook],
  findByIdAndDelete(id: string) {
    return this.findById(id);
  },
  findByIdAndUpdate(id: string, data: UpdateBookDto) {
    const book = this.findById(id);
    return { ...book, ...data };
  },
};
