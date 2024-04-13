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
import { FaPen, FaTrash } from "react-icons/fa";
import { Pet } from "../../../types";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { PET_SORT_FILTER, PET_TABLE_COLUMN } from "../../../constants";
import { Input } from "@/components/ui/input";
import capitalize from "capitalize";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";
import { IoIosArrowRoundUp } from "react-icons/io";
import { IoIosArrowRoundDown } from "react-icons/io";
import Cookies from "js-cookie";
import Router from "next/router";

export default function Home() {
  const router = useRouter();
  const sortedParams = useSearchParams().get("sortedBy");
  const jwtToken: string = Cookies.get("jwtToken") ?? "";
  const { toast } = useToast();

  const [petList, setPetList] = useState<Pet[]>([]);
  const [totalData, setTotalData] = useState<number>(0);
  const [searchInput, setSearchInput] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [orderRule, setOrderRule] = useState<string>("asc");

  useEffect(() => {
    const fetchData = async () => {
      const { data: response } = await axios.get(
        `/api/pets?sortedBy=${sortedParams}&name=${searchInput}&order=${orderRule}&page=${currentPage}`,
        {
          headers: {
            Authorization: jwtToken,
          },
        }
      );
      setPetList(response.data);
      setTotalData(response.total);
    };

    fetchData();
  }, [sortedParams, searchInput, currentPage, orderRule, jwtToken]);

  const deletePet = async (id: string, image: string) => {
    try {
      const { data, error } = await supabase.storage
        .from("pets")
        .remove([`public/${image}`]);

      if (error) throw error;
      await axios.delete(`/api/pets/${id}`, {
        headers: {
          Authorization: jwtToken,
        },
      });

      toast({
        title: "Pet removed",
        description: "Your pet has succesfully removed from the database",
      });

      window.location.reload();
      setCurrentPage(1);
    } catch (error) {
      toast({
        title: "An error occured",
        description: "Please try again",
      });
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
          className="cursor-pointer border-primary"
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
    <div>
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Select
              onValueChange={(value) => router.push(`?sortedBy=${value}`)}
            >
              <SelectTrigger className="w-[180px] border-primary">
                <SelectValue placeholder="Sorted By Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {PET_SORT_FILTER.map((item, i) => (
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
                <IoIosArrowRoundUp className="text-primary" />
              ) : (
                <IoIosArrowRoundDown className="text-primary" />
              )}
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <HiMagnifyingGlass className="w-5 h-5 text-primary" />
            <Input
              placeholder="Search by name"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-fit border-primary"
            />
          </div>
        </div>
        <Table className="mt-10">
          {petList.length === 0 && (
            <TableCaption>There is no data</TableCaption>
          )}
          <TableHeader>
            <TableRow className="bg-primary hover:bg-primary">
              {PET_TABLE_COLUMN.map((item: string, i: number) => (
                <TableHead className="text-center" key={i}>
                  <p className="text-white">{item}</p>
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
                    <Button
                      size={"icon"}
                      variant={"outline"}
                      onClick={() => router.push(`/admin/pets/${item.id}`)}
                      className="border-primary text-orange-primary hover:text-orange-primary"
                    >
                      <FaPen className="text-primary" />
                    </Button>
                    <Button
                      size={"icon"}
                      onClick={() => deletePet(item.id, item.image)}
                      variant={"outline"}
                      className="border-red-500 text-red-500 hover:text-red-500"
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
