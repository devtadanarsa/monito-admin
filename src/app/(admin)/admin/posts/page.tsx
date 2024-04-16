"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { POST_SORT_FILTER, POST_TABLE_COLUMN } from "@/app/constants";
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
import { Button } from "@/components/ui/button";
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { Input } from "@/components/ui/input";
import { Post } from "@/app/types";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import { FaPen, FaTrash } from "react-icons/fa";
import dateFormat, { masks } from "dateformat";

const PostListingPage = () => {
  const router = useRouter();
  const sortedParams = useSearchParams().get("sortedBy");
  const jwtToken: string = Cookies.get("jwtToken") ?? "";

  const [orderRule, setOrderRule] = useState<string>("asc");
  const [postList, setPostList] = useState<Post[]>();
  const [totalPost, setTotalPost] = useState<number>(0);
  const [searchInput, setSearchInput] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      const { data: response } = await axios.get(
        `/api/posts?sortedBy=${sortedParams}&name=${searchInput}&order=${orderRule}`,
        {
          headers: {
            Authorization: jwtToken,
          },
        }
      );
      setPostList(response.data);
      setTotalPost(response.total);
    };

    fetchData();
  }, [sortedParams, searchInput, currentPage, orderRule, jwtToken]);

  const paginationItem = [];
  const totalPages = Math.ceil(totalPost / 5);
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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Select onValueChange={(value) => router.push(`?sortedBy=${value}`)}>
            <SelectTrigger className="w-[180px] border-primary">
              <SelectValue placeholder="Sorted By Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {POST_SORT_FILTER.map((item, i) => (
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
              orderRule === "asc" ? setOrderRule("desc") : setOrderRule("asc");
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
            className="w-fit border-primary"
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </div>
      <Table className="mt-10">
        <TableHeader>
          <TableRow className="bg-primary hover:bg-primary">
            {POST_TABLE_COLUMN.map((item: string, i: number) => (
              <TableHead className="text-center" key={i}>
                <p className="text-white">{item}</p>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {postList?.map((item: Post, i: number) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium text-center">
                {i + (currentPage - 1) * 5 + 1}
              </TableCell>
              <TableCell className="text-center">{item.title}</TableCell>
              <TableCell className="text-center">
                {dateFormat(item.updatedAt, "dd mmm yyyy")}
              </TableCell>
              <TableCell className="text-center">
                <div className="flex justify-center gap-4">
                  <Button
                    size={"icon"}
                    variant={"outline"}
                    className="border-primary text-orange-primary hover:text-orange-primary"
                    onClick={() => router.push(`/admin/posts/${item.id}`)}
                  >
                    <FaPen className="text-primary" />
                  </Button>
                  <Button
                    size={"icon"}
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
      <div>
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
    </div>
  );
};

export default PostListingPage;
