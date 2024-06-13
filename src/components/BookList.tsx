"use client"

import { FormEventHandler, useEffect, useState } from "react";
import { books as booksApi } from '@/data/db'
import { TBook, TBookNew } from "@/types";
import { Book } from "./Book";

export const BookList = () => {

  // use initial API books data for initial server side rendering
  const [books, setBooks] = useState<Array<TBook>>(booksApi || []);
  const [bookNew, setBookNew] = useState<TBookNew>({
    title: "",
    author: ""
  })

  // get newest data on client after initial render
  useEffect(() => {
    fetch(`/api/books`)
    .then(res => res.json())
    .then(booksApiNew => { 
      setBooks(booksApiNew)
    })
  }, [])

  const deleteBook = (bookId: string) => {
    fetch(`/api/books/${bookId}`, { method: "DELETE" })
      .then(res => res.json())
      .then(bookDeleted => {
        console.log({ bookDeleted })
        setBooks(books.filter((book) => book._id !== bookId));
      })
  };

  const addBook: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    fetch("/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookNew),
    })
      .then((res) => res.json())
      .then((bookNewApi) => {
        console.log({ bookNewApi });
        setBooks([...books, bookNewApi]);
        setBookNew({ title: "", author: "" })
      });
  };

  // render book list
  const jsxBooks = books.map((book) => <Book key={book._id} book={book} deleteBook={deleteBook} />);

  // book page layout
  return (
    <div>
      <h1 className="text-2xl uppercase">Book List</h1>
      <div className="py-4 flex gap-3 flex-wrap">{jsxBooks}</div>
      <form className="flex gap-3" onSubmit={addBook}>
        <input
          type="text"
          className="rounded-md w-40 p-3"
          placeholder="Title..."
          value={bookNew.title}
          onChange={(e) => setBookNew({ ...bookNew, title: e.target.value })}
        />
        <input
          type="text"
          className="rounded-md w-40 p-3"
          placeholder="Author..."
          value={bookNew.author}
          onChange={(e) => setBookNew({ ...bookNew, author: e.target.value })}
        />
        <button type="submit" className="rounded-md bg-red-900 p-3 text-white hover:text-red-300">Add Book</button>
      </form>
    </div>
  );
};
