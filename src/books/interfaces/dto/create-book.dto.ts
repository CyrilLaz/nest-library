export type CreateBookDto = {
  title: string;
  description?: string;
  authors?: string[];
  favorite?: boolean;
  fileCover?: string;
  fileName?: string;
};
