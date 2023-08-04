"use client";
import React from "react";
import { Button, Card, CardFooter, Image } from "@nextui-org/react";
import { Books } from "../types/books.types";
import { motion } from "framer-motion";

interface Props {
  books: Books[];
  handleBook: (booksId: string) => void;
  readList: string[];
}

function Library({ books, handleBook, readList }: Props) {
  return (
    <motion.div layout className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
      {books.map((book) => (
        <motion.div layout key={book.ISBN} className="flex-grow">
          <Card isFooterBlurred key={book.ISBN} className="flex flex-col">
            <Image
              isZoomed
              removeWrapper
              alt={book.title}
              src={book.cover}
              className="w-full object-cover h-[300px]"
            />
            <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
              <div>
                <p className="text-black text-tiny">
                  {readList.includes(book.ISBN) && <span> ❤️ </span>}
                  {book.title} <span>{book.pages}</span>
                </p>
              </div>
              <Button
                className="text-xs font-bold"
                color="secondary"
                radius="full"
                size="sm"
                onClick={() => handleBook(book.ISBN)}
              >
                {readList.includes(book.ISBN) ? "Remove" : "Add"}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default Library;
