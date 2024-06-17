import { db } from "@/data/db";
import { TUser } from "@/types";

export const POST = async (req: Request) => {
  const body = await req.json();

  // validation
  if (!body.email || !body.pw) {
    return Response.json(
      { error: "Please provide email and pw" },
      { status: 400 }
    );
  }

  const userFound = db.users.find(
    (user) => user.email === body.email && user.pw === body.pw
  );

  if (userFound)
    return Response.json({ error: "User already exists" }, { status: 400 });


  const userNew: TUser = { ...body, _id: Date.now().toString() };
  db.users.push(userNew);

  // extract pw / not public !
  const { pw, ...userPublic } = { ...userNew };
  return Response.json(userPublic);
};
