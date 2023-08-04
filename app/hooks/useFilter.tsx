import { useCallback, useState } from "react";
import { Books } from "../types/books.types";

type FilteredBooks = Books[];

export function useFilter(initialBooks: Books[]) {
  const [books, setBooks] = useState<Books[]>(initialBooks);

  const genres: string[] = [...new Set(initialBooks.map((book) => book.genre))];
  const pages: number[] = initialBooks.map((book) => book.pages);

  const handleFilterChange = useCallback(
    (genre: string, range: number) => {
      console.log(genre, range);

      if (genre || range) {
        const filteredBooks: FilteredBooks = initialBooks.filter((book) => {
          const genreMatches = !genre || book.genre === genre;
          const rangeMatches = !range || book.pages <= range;

          return genreMatches && rangeMatches;
        });

        setBooks(filteredBooks);
      } else {
        setBooks(initialBooks);
      }
    },
    [initialBooks]
  );

  return { books, genres, handleFilterChange, pages };
}
