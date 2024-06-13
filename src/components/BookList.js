"use client"

import { useEffect, useState } from "react";
import { books as booksApi } from '@/data/db'

export const BookList = () => {

  // use initial API books data for initial server side rendering
  const [books, setBooks] = useState(booksApi || []);
  const [bookNew, setBookNew] = useState({
    title: "",
    author: ""
  })

  // get newest data on client after initial render
  useEffect(() => {
    fetch(`/api/books`)
    .then(res => res.json())
    .then(booksApiNew => { 
      console.log(booksApiNew)
      setBooks(booksApiNew)
    })
  }, [])

  // render list
  const jsxBooks = books.map((book) => (
    <div key={book._id} className="border-red-900 rounded-xl border-2 p-2">
      <div>{book.title}</div>
      <div className="text-sm">{book.author}</div>
      <button onClick={() => deleteBook(book._id)}>X</button>
    </div>
  ));

  const addBook = () => {
    const bookNew = {
      title: "Random Title" + Date.now(),
      author: "Randy" + Date.now(),
    };

    fetch("/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookNew),
    })
      .then((res) => res.json())
      .then((bookNewApi) => {
        console.log({ bookNewApi });
        setBooks([...books, bookNewApi]);
      });
  };

  const deleteBook = (bookId) => {
    console.log("Deleting book: ", bookId)
    fetch(`/api/books/${bookId}`, { method: "DELETE" })
    .then(res => res.json())
    .then(bookDeleted => {
      console.log({ bookDeleted})
      setBooks(books.filter((book) => book._id !== bookId));
    })
  };

  return (
    <div>
      <h1 className="text-2xl">Book List</h1>
      <div className="py-4 flex gap-3 flex-wrap">{jsxBooks}</div>
      <button onClick={addBook}>Add</button>
    </div>
  );
};
