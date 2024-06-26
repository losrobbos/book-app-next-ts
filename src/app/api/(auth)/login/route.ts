import { db } from "@/data/db";
import jwt from "jsonwebtoken";

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
  // create token
  const token = jwt.sign(userPublic, process.env.JWT_SECRET as string, { expiresIn: "1d" })
  
  return Response.json({ token, ...userPublic});
};
