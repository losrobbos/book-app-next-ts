import { books } from "../../../data/db";

// To handle a GET request to /api
export async function GET() {
  return Response.json(books);
}

export async function POST(req: Request) {
  const body = await req.json();
  // Process a POST request
  const bookNew = { ...body, _id: Date.now().toString() };
  books.push(bookNew);
  return Response.json(bookNew);
}

