"use client";

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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";
import { FaPen, FaPlus, FaTrash } from "react-icons/fa";
import { Pet } from "./types";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { SORT_FILTER, TABLE_COLUMN } from "./constants";
import { Input } from "@/components/ui/input";
import capitalize from "capitalize";
import { HiMagnifyingGlass } from "react-icons/hi2";

export default function Home() {
  const router = useRouter();
  const sortedParams = useSearchParams().get("sortedBy");

  const [petList, setPetList] = useState<Pet[]>([]);
  const [totalData, setTotalData] = useState<number>(0);
  const [searchInput, setSearchInput] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      const { data: response } = await axios.get(
        `/api/pets?sortedBy=${sortedParams}&name=${searchInput}&page=${currentPage}`
      );
      setPetList(response.data);
      setTotalData(response.total);
    };

    fetchData();
  }, [sortedParams, searchInput, currentPage]);

  const paginationItem = [];
  for (let i = 1; i <= Math.ceil(totalData / 2); i++) {
    paginationItem.push(
      <PaginationItem key={i}>
        <PaginationLink
          isActive={currentPage === i}
          onClick={() => setCurrentPage(i)}
          className="cursor-pointer"
        >
          {i}
        </PaginationLink>
      </PaginationItem>
    );
  }
  paginationItem.push(
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
  );

  return (
    <div className="pt-8">
      <div>
        <div className="flex items-center justify-between">
          <div>
            <Select
              onValueChange={(value) => router.push(`?sortedBy=${value}`)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sorted By Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {SORT_FILTER.map((item, i) => (
                    <SelectItem key={item.label + i} value={item.href}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-3">
            <HiMagnifyingGlass className="w-5 h-5" />
            <Input
              placeholder="Search by name"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-fit"
            />
          </div>
        </div>
        <Table className="mt-4">
          {petList.length === 0 && (
            <TableCaption>There is no data</TableCaption>
          )}
          <TableHeader>
            <TableRow>
              {TABLE_COLUMN.map((item: string, i: number) => (
                <TableHead className="text-center" key={i}>
                  {item}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {petList.map((item: Pet, i: number) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium text-center">
                  {i + (currentPage - 1) * 2 + 1}
                </TableCell>
                <TableCell className="text-center">{item.name}</TableCell>
                <TableCell className="text-center">
                  {capitalize(item.size)}
                </TableCell>
                <TableCell className="text-center">
                  Rp.{item.price.toLocaleString("id-ID")}
                </TableCell>
                <TableCell className="text-center">
                  {capitalize(item.gender)}
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
      <div className="mt-10 flex justify-end">
        <Pagination className="flex justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage(currentPage - 1)}
                className={`cursor-pointer ${
                  currentPage <= 1 ? "pointer-events-none opacity-50" : ""
                }`}
                aria-disabled={currentPage <= 1}
              />
            </PaginationItem>
            {paginationItem}
            {/* <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem> */}
            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage(currentPage + 1)}
                aria-disabled={petList.length <= 2}
                className={`cursor-pointer ${
                  petList.length < 2 ? "pointer-events-none opacity-50" : ""
                }`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
