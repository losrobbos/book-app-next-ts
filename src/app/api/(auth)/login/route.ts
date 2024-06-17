import { db } from "@/data/db";

export const POST = async (req: Request) => {
  const body = await req.json();

  // validation
  if (!body.email || !body.pw) {
    return Response.json(
      { error: "Please provide email and pw" },
      { status: 400 }
    );
  }

  // Lookup user
  const userFound = db.users.find(
    (user) => user.email === body.email && user.pw === body.pw
  );

  if (!userFound) {
    return Response.json({ error: "User not found" }, { status: 401 });
  }
  // extract pw / not public !
  const { pw, ...userPublic } = { ...userFound };
  return Response.json(userPublic);
};
