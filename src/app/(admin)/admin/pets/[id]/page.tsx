"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { EnumValues, ZodEnum, z } from "zod";
import { petFormSchema } from "../../../../lib/form-schema";
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
import { PiPlusThin } from "react-icons/pi";
import {
  supabasePublicUrl,
  supabaseUpdateFile,
  supabaseUploadFile,
} from "@/lib/supabase";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { Pet } from "@/app/types";
import capitalize from "capitalize";
import { RxCross1 } from "react-icons/rx";
import Cookies from "js-cookie";

const EditPetPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const jwtToken: string = Cookies.get("jwtToken") ?? "";

  // variables for this page
  const petId = pathname.split("/").pop();
  const [petData, setPetData] = useState<Pet>();
  const [additionalInput, setAdditionalInput] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const [preview, setPreview] = useState<string | undefined>();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof petFormSchema>>({
    resolver: zodResolver(petFormSchema),
  });

  const onSubmit = async (val: z.infer<typeof petFormSchema>) => {
    try {
      if (selectedFile) {
        const { data, error } = await supabaseUpdateFile(
          selectedFile!!,
          petData?.image!!
        );
        if (error) throw error;
      }

      const data = {
        ...val,
        id: petId,
        image: petData?.image,
        additional: additionalInput,
        age: Number(val.age),
        price: Number(val.price),
      };

      await axios.put(
        `/api/pets/${petId}`,
        { ...data },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      toast({
        title: "Pets updated",
        description: "Your pet is successfully updated in our database",
      });
      router.push("/admin/pets");
    } catch (error) {
      console.log(error);
    }
  };

  // get the pet data
  useEffect(() => {
    const fetchData = async () => {
      const { data: response } = await axios.get(`/api/pets/${petId}`);
      setPetData(response);
    };

    fetchData();
  }, [petId]);

  useEffect(() => {
    if (petData) {
      form.reset({
        name: petData?.name,
        size: petData.size,
        gender: petData.gender,
        age: String(petData.age),
        color: petData.color,
        location: petData.location,
        price: String(petData.price),
        vaccinated: petData.vaccinated,
        dewormed: petData.dewormed,
        microchip: petData.microchip,
        additional: petData.additional,
      });

      const getImageUrl = async () => {
        const imageUrl = await supabasePublicUrl(petData.image);
        console.log(imageUrl);
        setPreview(imageUrl);
      };

      getImageUrl();
      setAdditionalInput(petData?.additional!!);
      setPreview(petData.image);
    }
  }, [petData, form]);

  // get the changes on image form
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
                    unoptimized
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
          </InputField>

          <InputField
            title="Size, Gender, and Age"
            subtitle="Choose your pet size and gender and age. Size is only between small, medium, and large. Gender is only between male and female"
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
                          <SelectValue
                            placeholder={capitalize(petData?.size ?? "")}
                          />
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
                          <SelectValue
                            placeholder={capitalize(petData?.gender ?? "")}
                          />
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

              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <Input
                          placeholder="10"
                          type="number"
                          className="w-16"
                          {...field}
                        />
                        <p>Months</p>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </InputField>

          <InputField
            title="Color"
            subtitle="Choose your pet color. Select only the available options!"
          >
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem className="w-1/4">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={capitalize(petData?.color ?? "")}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="red">Red</SelectItem>
                      <SelectItem value="apricot">Apricot</SelectItem>
                      <SelectItem value="black">Black</SelectItem>
                      <SelectItem value="monochrome">Monochrome</SelectItem>
                      <SelectItem value="silver">Silver</SelectItem>
                      <SelectItem value="tan">Tan</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </InputField>

          <InputField
            title="Location and Price"
            subtitle="Input your listed pet price and location here. Make sure you value them good so you're not regret your decision later"
          >
            <div className="flex items-center gap-8">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Indonesia" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <p>Rp</p>
                        <Input placeholder="200000" type="number" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </InputField>

          <InputField
            title="Certification"
            subtitle="Fill the checkboxes where your pet have certification at"
          >
            <div className="flex items-center gap-8">
              <FormField
                control={form.control}
                name="vaccinated"
                render={({ field }) => (
                  <FormItem className="space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Vaccinated</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dewormed"
                render={({ field }) => (
                  <FormItem className="space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Dewormed</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="microchip"
                render={({ field }) => (
                  <FormItem className="space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Microchip</FormLabel>
                  </FormItem>
                )}
              />
            </div>
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
                    {item}{" "}
                    <RxCross1
                      className="text-xs ml-4 cursor-pointer"
                      onClick={() => {
                        setAdditionalInput((prevInput) => {
                          const updatedInfo = [...prevInput];
                          updatedInfo.splice(i, 1);
                          return updatedInfo;
                        });
                      }}
                    />
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

export default EditPetPage;
