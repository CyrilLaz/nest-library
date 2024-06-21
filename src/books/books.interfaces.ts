export interface IBook {
  id: string;
  title: string;
  description?: string;
  authors?: string[];
  favorite?: boolean;
  fileCover?: string;
  fileName?: string;
}

export type TBookStore = Map<string, IBook>;

export interface IBooksServices {
  getAll(): IBook[];
  getById(id: string): IBook;
  create({}: IBook): IBook;
  delete(id: string): void;
  update(id: string, {}: IBook): IBook;
}
