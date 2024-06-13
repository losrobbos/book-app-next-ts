
// To handle a GET request to /api
export async function GET() {
  // Do whatever you want
  return Response.json({ message: "Hello World" }, { status: 200 });
}

// To handle a POST request to /api
export async function POST(req: Request) {
  const body = await req.json()
  console.log("Body: ", req.body)
  // Do whatever you want
  return Response.json({ message: "Hello World", ...body }, { status: 200 });
}