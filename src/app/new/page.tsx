"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { petFormSchema } from "../lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import InputField from "@/components/molecules/InputField";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { CiImageOn } from "react-icons/ci";
import { PiPlusThin } from "react-icons/pi";

const AddPetPage = () => {
  const [additionalInput, setAdditionalInput] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const [preview, setPreview] = useState<string | undefined>();

  useEffect(() => {
    if (!selectedFile) {
      setSelectedFile(undefined);
      return;
    }

    const objectURL = URL.createObjectURL(selectedFile);
    setPreview(objectURL);
  }, [selectedFile]);

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
  };

  const form = useForm<z.infer<typeof petFormSchema>>({
    resolver: zodResolver(petFormSchema),
    defaultValues: {
      additional: [],
    },
  });

  const onSubmit = async (val: z.infer<typeof petFormSchema>) => {
    try {
      const data = {
        ...val,
        image: preview,
        additional: additionalInput,
      };

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
          <InputField
            title="Name"
            subtitle="Enter your pet name in here. You must have at least 3 characters for the name"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Bobby Kartanegara"
                      className="w-1/2"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </InputField>

          <InputField
            title="Image"
            subtitle="Enter your pet image in here. Please choose your pet best image in here"
          >
            <div className="flex items-center gap-5">
              {preview && (
                <div className="border">
                  <Image
                    src={preview as string}
                    alt="Image Preview"
                    width={200}
                    height={100}
                    objectFit="contain"
                  />
                </div>
              )}
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={onSelectFile}
                  className="absolute w-[200px] h-[100px] text-transparent file:hidden"
                />
                <div className="border border-black border-1 border-dashed w-[200px] h-[100px] py-5">
                  <div>
                    <PiPlusThin className="w-8 h-8 mx-auto" />
                    <p className="text-sm text-center mt-2">
                      Upload Image Here
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Bobby Kartanegara"
                      className="w-1/2"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
          </InputField>

          <InputField
            title="Size and Gender"
            subtitle="Choose your pet size and gender. Size is only between small, medium, and large. Gender is only between male and female"
          >
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                  <FormItem className="w-1/4">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Size" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="w-1/4">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </InputField>

          <InputField
            title="Price"
            subtitle="Input your listed pet price here. Make sure you value them good so you're not regret your decision later"
          >
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <p>Rp</p>
                      <Input
                        placeholder="200000"
                        type="number"
                        className="w-1/6"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </InputField>

          <InputField
            title="Additional Infomation"
            subtitle="Please add additional information about your pets, such as : Pure Breed Shizu, Good body structure, etc"
          >
            <div>
              <div className="flex items-center gap-2">
                <Input
                  id="addInputField"
                  type="text"
                  className="w-1/4"
                  placeholder="Good body structur, etc"
                />
                <Button
                  variant={"outline"}
                  type="button"
                  className="border-black"
                  onClick={() => {
                    const inputField = document.getElementById(
                      "addInputField"
                    ) as HTMLInputElement;
                    const input = inputField.value;

                    setAdditionalInput((additionalInput) => [
                      ...additionalInput,
                      input,
                    ]);

                    inputField.value = "";
                  }}
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-2 max-w-80">
                {additionalInput.map((item: string, i: number) => (
                  <Badge
                    key={i}
                    variant={"outline"}
                    className="px-3 py-1 rounded-none"
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          </InputField>
          <Button type="submit" size={"lg"}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddPetPage;
