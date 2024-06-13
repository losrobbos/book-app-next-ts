import { TBook, TBookUpdate } from "@/types";
import { Dispatch, FormEventHandler, SetStateAction, useState } from "react";

type Props = {
  book: TBook,
  updateBook: (bookId: string, bookUpdate: TBookUpdate) => void
  deleteBook: (bookId: string) => void,
}

export const Book = ({ book, updateBook, deleteBook }: Props) => {

  const [editMode, setEditMode] = useState(false)
  const [bookUpdate, setBookUpdate] = useState<TBookUpdate>(book)

  const onSubmitBookUpdate: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    updateBook(book._id, bookUpdate)
    setEditMode(false)
  };

  // show edit form
  if (editMode) {
    return <form
      onSubmit={onSubmitBookUpdate}
      className="flex flex-col gap-2 bg-red-900 text-white rounded-xl border-2 p-2 shadow-sm"
    >
      <input
        type="text"
        className="rounded-md w-40 p-3 text-black"
        placeholder="Title..."
        value={bookUpdate.title}
        onChange={(e) => setBookUpdate({ ...bookUpdate, title: e.target.value })}
      />
      <input
        type="text"
        className="rounded-md w-40 p-3 text-black"
        placeholder="Author..."
        value={bookUpdate.author}
        onChange={(e) => setBookUpdate({ ...bookUpdate, author: e.target.value })}
      />
      <div className="flex gap-1 justify-between">
        <button type="button" onClick={() => setEditMode(false)}>Cancel</button>
        <button type="submit">Save</button>
      </div>
    </form>
  }

  // show view form
  return <div className="bg-red-900 text-white rounded-xl border-2 p-2 shadow-sm">
    <div onDoubleClick={() => setEditMode(true)}>{book.title}</div>
    <div onDoubleClick={() => setEditMode(true)} className="text-sm">{book.author}</div>
    <button onClick={() => deleteBook(book._id)}>X</button>
  </div>

}