import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import { comparePassword } from "@/lib/utils";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  const reqBody = await request.json();

  const user = await prisma.user.findFirst({
    where: {
      email: reqBody.email,
    },
  });

  if (!user || !(await comparePassword(reqBody.password, user.password))) {
    return NextResponse.json(
      { error: "Username or password maybe incorrect" },
      { status: 200 }
    );
  }

  const payload = {
    id: user.id,
    name: user.fullName,
    email: user.email,
  };

  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.NEXT_PUBLIC_JWT_SECRET!!,
      {
        expiresIn: 8 * 3600,
      },
      (err, token) => {
        if (err) reject(err);
        else {
          resolve(NextResponse.json({ token: token }, { status: 200 }));
        }
      }
    );
  });
}
