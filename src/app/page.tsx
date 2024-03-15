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
import { FaArrowDown, FaArrowUp, FaPen, FaPlus, FaTrash } from "react-icons/fa";
import { Pet } from "./types";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { SORT_FILTER, TABLE_COLUMN } from "./constants";
import { Input } from "@/components/ui/input";
import capitalize from "capitalize";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";
import { IoIosArrowRoundUp } from "react-icons/io";
import { IoIosArrowRoundDown } from "react-icons/io";

export default function Home() {
  const router = useRouter();
  const sortedParams = useSearchParams().get("sortedBy");
  const { toast } = useToast();

  const [petList, setPetList] = useState<Pet[]>([]);
  const [totalData, setTotalData] = useState<number>(0);
  const [searchInput, setSearchInput] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [orderRule, setOrderRule] = useState<string>("asc");

  useEffect(() => {
    const fetchData = async () => {
      const { data: response } = await axios.get(
        `/api/pets?sortedBy=${sortedParams}&name=${searchInput}&order=${orderRule}&page=${currentPage}`
      );
      setPetList(response.data);
      setTotalData(response.total);
    };

    fetchData();
  }, [sortedParams, searchInput, currentPage, orderRule]);

  const deletePet = async (id: string, image: string) => {
    try {
      const { data, error } = await supabase.storage
        .from("pets")
        .remove([`public/${image}`]);

      if (error) throw error;

      await axios.delete(`/api/pets/${id}`);
      console.log(data);

      toast({
        title: "Pet removed",
        description: "Your pet has succesfully removed",
      });

      router.push("/");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const paginationItem = [];
  const totalPages = Math.ceil(totalData / 5);
  const maxPagesToShow = 3;

  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  if (endPage - startPage < maxPagesToShow - 1) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
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
          <div className="flex items-center gap-2">
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
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                orderRule === "asc"
                  ? setOrderRule("desc")
                  : setOrderRule("asc");
              }}
              className="text-2xl"
            >
              {orderRule === "asc" ? (
                <IoIosArrowRoundUp />
              ) : (
                <IoIosArrowRoundDown />
              )}
            </Button>
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
                  {i + (currentPage - 1) * 5 + 1}
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
                    <Button
                      size={"icon"}
                      onClick={() => deletePet(item.id, item.image)}
                    >
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
            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage(currentPage + 1)}
                aria-disabled={currentPage === endPage}
                className={`cursor-pointer ${
                  currentPage === endPage
                    ? "pointer-events-none opacity-50"
                    : ""
                }`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
