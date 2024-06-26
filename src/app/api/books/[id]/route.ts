import { db } from "@/data/db";
import { NextResponse } from "next/server";

type Params = {
  id: string
}

export async function GET(req: Request, { params }: { params: Params }) {
  const { id } = params;

  const bookFound = db.books.find((book) => book._id === id);

  if (!bookFound)
    return NextResponse.json({ error: "Book does not exist" }, { status: 404 });

  return Response.json(bookFound);
}

export async function DELETE(req: Request, { params }: { params: Params }) {
  const { id } = params;

  const bookIndex = db.books.findIndex((book) => book._id === id);

  if (bookIndex === -1)
    return NextResponse.json({ error: "Book does not exist" }, { status: 404 });

  // delete from array
  const bookToDelete = {...db.books[bookIndex]}
  db.books.splice(bookIndex, 1)

  return Response.json(bookToDelete);
}


export async function PATCH(req: Request, { params }: { params: Params }) {
  const body = await req.json();
  const { id } = params;

  // validation
  if (!body.title && !body.author) {
    return Response.json(
      { error: "Please provide title or author" },
      { status: 400 }
    );
  }

  const bookFound = db.books.find((book) => book._id === id);

  if (!bookFound)
    return NextResponse.json({ error: "Book does not exist" }, { status: 404 });

  // update book props
  Object.assign(bookFound, body);

  return Response.json(bookFound);
}
