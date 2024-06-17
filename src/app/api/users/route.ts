import { db } from "@/data/db"

export const GET = async () => {
  return Response.json(db.users);
}