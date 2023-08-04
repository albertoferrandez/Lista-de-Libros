"use client";
import { useEffect, useState } from "react";
import Filters from "./components/filters";
import Library from "./components/library";
import data from "./data/books.json";
import { Books } from "./types/books.types";
import { useFilter } from "./hooks/useFilter";
import Cart from "./components/cart";

const books: Books[] = data.library.map((data) => data.book);

export default function Home() {
  const {
    books: filteredBooks,
    genres,
    handleFilterChange,
    pages,
  } = useFilter(books);
  const [readList, setReadList] = useState<Books["ISBN"][]>([]);

  function handleBook(book: Books["ISBN"]) {
    const draft = readList.includes(book)
      ? readList.filter((readBook) => readBook !== book)
      : [...readList, book];
    setReadList(draft);
    localStorage.setItem("readList", JSON.stringify(draft));
  }

  useEffect(() => {
    return setReadList(
      JSON.parse(localStorage.getItem("readList") ?? "[]") as Books["ISBN"][]
    );
  }, []);

  return (
    <>
      <nav className="flex items-center justify-between px-28">
        <h1>LIBRARY</h1>
        <Cart books={books} />
      </nav>

      <div className="grid grid-cols-12">
        <section className="col-span-3 p-8">
          <Filters
            onFilterChange={handleFilterChange}
            genres={genres}
            pages={pages}
          />
        </section>
        <section className="col-span-9 p-8">
          <Library
            books={filteredBooks}
            handleBook={handleBook}
            readList={readList}
          />
        </section>
      </div>
    </>
  );
}
