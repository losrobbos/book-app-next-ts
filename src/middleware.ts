import { env } from "process";
import { jwtVerify, type JWTPayload } from "jose";
// import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(req: Request) {
  const token = req.headers.get("authorization");

  if (!token) {
    return Response.json(
      { error: "No token. Please login, buddy!" },
      { status: 401 }
    );
  }

  // this is how we sign= jwt.sign(object,secretKey)
  // now use the same secretKey to decode the token
  const requestHeaders = new Headers(req.headers);

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    // const decodedUser = jwt.verify(token, process.env.JWT_SECRET as string);
    requestHeaders.set(process.env.JWT_INTERNAL_HEADER_NAME as string, JSON.stringify(payload));
    // And the middleware expects a response object as a return so we need to involve that as well.
    return NextResponse.next({
      request: {
        // New request headers
        headers: requestHeaders,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || err }, { status: 401 });
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/api/hello"],
};
