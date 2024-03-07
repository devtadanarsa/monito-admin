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

export default function Home() {
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
            <TableHead className="w-[100px] text-center">ID</TableHead>
            <TableHead className="text-center">Name</TableHead>
            <TableHead className="text-center">Size</TableHead>
            <TableHead className="text-center">Price</TableHead>
            <TableHead className="text-center">Gender</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium text-center">INV001</TableCell>
            <TableCell className="text-center">Bobby Black</TableCell>
            <TableCell className="text-center">Small</TableCell>
            <TableCell className="text-center">Rp100.000</TableCell>
            <TableCell className="text-center">Male</TableCell>
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
        </TableBody>
      </Table>
    </div>
  );
}
