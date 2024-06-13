"use client"

import { FormEventHandler, useEffect, useMemo, useState } from "react";
import { books as booksApi } from '@/data/db'
import { TBook, TBookNew, TBookUpdate } from "@/types";
import { Book } from "./Book";

export const BookList = () => {

  // use initial API books data for initial server side rendering
  const [books, setBooks] = useState<Array<TBook>>(booksApi || []);
  const [bookNew, setBookNew] = useState<TBookNew>({
    title: "",
    author: ""
  })
  const [search, setSearch] = useState("")
  const [error, setError] = useState("")

  // get newest data on client after initial render
  useEffect(() => {
    fetch(`/api/books`)
      .then(res => res.json())
      .then(booksApiNew => {
        setBooks(booksApiNew)
      })
  }, [])

  const booksFiltered = useMemo(() => {
    if(!search) return books;
    return books.filter(book => book.title.toLowerCase().includes(search.toLowerCase()))
  }, [search])

  const deleteBook = (bookId: string) => {
    fetch(`/api/books/${bookId}`, { method: "DELETE" })
      .then(res => res.json())
      .then(bookDeleted => {
        console.log({ bookDeleted })
        setBooks(books.filter((book) => book._id !== bookId));
      })
  };

  const updateBook = (bookId: string, bookUpdate: TBookUpdate) => {
    fetch(`/api/books/${bookId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookUpdate),
    })
      .then((res) => res.json())
      .then((bookUpdatedApi) => {
        console.log({ bookUpdatedApi });
        setBooks(books.map(book => book._id === bookId ? bookUpdatedApi : book))
      });
  }

  const addBook: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    if (!bookNew.title || !bookNew.author) {
      return setError("Please provide title & author, buddy!")
    }

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
        setError("")
      });
  };

  // render book list
  const jsxBooks = booksFiltered.map((book) => <Book
    key={book._id}
    book={book}
    updateBook={updateBook}
    deleteBook={deleteBook}

  />);

  // book page layout
  return (
    <div>
      <h1 className="text-2xl uppercase">Book List</h1>
      {/* SEARCH BOX */}
      <div className="py-2">
        <input type="text" className="rounded-md w-80 p-1"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {/* BOOK LIST */}
      <div className="py-2 flex gap-3 flex-wrap">{jsxBooks}</div>
      {/* BOOK ADD FORM */}
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
      <div className="text-red-700 font-bold">{error}</div>
    </div>
  );
};
