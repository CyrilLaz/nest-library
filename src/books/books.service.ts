import { Injectable } from "@nestjs/common";
import { IBook, IBooksServices, TBookStore } from "./books.interfaces";
import { randomUUID } from "crypto";

@Injectable()
export class BooksService implements IBooksServices {
  private readonly store: TBookStore = new Map();

  create(book: IBook): IBook {
    const id = randomUUID();
    this.store.set(id, { id, ...book });
    return this.getById(id);
  }
  getAll(): IBook[] {
    return Array.from(this.store, ([_, value]) => ({ ...value }));
  }
  getById(id: string): IBook {
    return this.store.get(id);
  }
  update(id: string, payload: IBook): IBook {
    this.store.set(id, { ...this.store.get(id), ...payload });
    return this.store.get(id);
  }
  delete(id: string): void {
    this.store.delete(id);
  }
}
