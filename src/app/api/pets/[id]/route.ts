import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.pathname.split("/").pop();

  const result = await prisma.pet.findFirst({
    where: {
      id,
    },
  });

  return NextResponse.json(result, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.pathname.split("/").pop();

  const result = await prisma.pet.delete({
    where: {
      id: id,
    },
  });

  return NextResponse.json({ result });
}
