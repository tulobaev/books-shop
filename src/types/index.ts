export interface IBook {
  id: number;
  book_name: string;
  book_image: string | null;
  description: string;
  publication_year: number;
  category?: {
    category_name: string;
  };
}

export interface ICategory {
  id: number;
  category_name: string;
}

export interface IBookDetails {
  id: number;
  book_pdf: string;
  book_name: string;
  book_image?: string | null;
  book_author: string;
  category: ICategory;
  publication_year: number;
  loading_time: string;
  description: string;
  like_count: string;
  viewing_count: string;
}
