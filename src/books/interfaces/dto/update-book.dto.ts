export type UpdateBookDto = {
    title: string;
    description?: string;
    authors?: string[];
    favorite?: boolean;
    fileCover?: string;
    fileName?: string;
  };
  