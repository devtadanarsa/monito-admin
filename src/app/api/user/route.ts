import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import { hashPassword } from "@/lib/utils";

export async function POST(request: Request) {
  const reqBody = await request.json();
  const hashedPassword = await hashPassword(reqBody.password);
  reqBody.password = hashedPassword;

  const newUser = await prisma.user.create({
    data: reqBody,
  });

  return NextResponse.json(newUser, { status: 201 });
}
