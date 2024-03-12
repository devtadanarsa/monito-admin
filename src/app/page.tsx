/**
 * TODO : REFACTOR THE TABLES TO INCLUDE SERTIFICATIONS AND PUBLISHED DATE
 */

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { FaPen, FaPlus, FaTrash } from "react-icons/fa";
import prisma from "../../prisma/client";
import { Pet } from "./types";
import { upperCaseFirst } from "upper-case-first";

export default async function Home() {
  const petList = await prisma.pet.findMany();
  console.log(petList);

  return (
    <div>
      <div className="flex justify-end">
        <Link className={buttonVariants({ size: "lg" })} href={"/new"}>
          Add Item <FaPlus className="ml-4" />
        </Link>
      </div>
      <Table className="mt-10">
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-center">No</TableHead>
            <TableHead className="text-center">Name</TableHead>
            <TableHead className="text-center">Size</TableHead>
            <TableHead className="text-center">Price</TableHead>
            <TableHead className="text-center">Gender</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {petList.map((item: Pet, i: number) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium text-center">{i + 1}</TableCell>
              <TableCell className="text-center">{item.name}</TableCell>
              <TableCell className="text-center">
                {upperCaseFirst(item.size)}
              </TableCell>
              <TableCell className="text-center">
                Rp.{Number(item.price).toLocaleString("id-ID")}
              </TableCell>
              <TableCell className="text-center">
                {upperCaseFirst(item.gender)}
              </TableCell>
              <TableCell className="text-center">
                <div className="flex justify-center gap-4">
                  <Button size={"icon"} variant={"outline"}>
                    <FaPen />
                  </Button>
                  <Button size={"icon"}>
                    <FaTrash />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
