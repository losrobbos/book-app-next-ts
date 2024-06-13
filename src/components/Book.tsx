import { TBook, TBookUpdate } from "@/types";
import { Dispatch, SetStateAction, useState } from "react";

type Props = {
  book: TBook,
  deleteBook: (bookId: string) => void
}

export const Book = ({ book, deleteBook }: Props) => {

  const [bookUpdate, setBookUpdate] = useState<TBookUpdate>( book )

  return <div className="bg-red-900 text-white rounded-xl border-2 p-2 shadow-sm">
    <div>{book.title}</div>
    <div className="text-sm">{book.author}</div>
    <button onClick={() => deleteBook(book._id)}>X</button>
  </div>

}