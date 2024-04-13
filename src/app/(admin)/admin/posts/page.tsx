"use client";

import React, { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { Input } from "@/components/ui/input";

const PostListingPage = () => {
  const [orderRule, setOrderRule] = useState<string>("asc");

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Select>
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
      </Table>
    </div>
  );
};

export default PostListingPage;
