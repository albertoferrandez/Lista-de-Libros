"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Books } from "../types/books.types";

interface Props {
  books: Books[];
}

function Cart({ books }: Props) {
  const [booksInStorage, setBooksInStorage] = useState<string[]>([]);
  const storedBooks = localStorage.getItem("readList");

  useEffect(() => {
    if (storedBooks) {
      setBooksInStorage(JSON.parse(storedBooks));
    }
  }, [storedBooks]);

  const favouritesBooks = books.filter((book) =>
    booksInStorage.includes(book.ISBN)
  );

  return (
    <Dropdown className="bg-slate-600">
      <DropdownTrigger>
        <Button
          variant="flat"
          className="text-slate-100 bg-purple-500"
          isDisabled={booksInStorage.length === 0}
        >
          Favourites ⭐
          <span className="font-bold">{favouritesBooks.length}</span>
        </Button>
      </DropdownTrigger>

      <DropdownMenu aria-label="Dynamic Actions" className="">
        {favouritesBooks.map((book) => (
          <DropdownItem key={book.ISBN}>{book.title}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}

export default Cart;
