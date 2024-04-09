"use client";

import { postFormSchema } from "@/app/lib/form-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import { Button } from "@/components/ui/button";
import { convertToHTML } from "draft-convert";
import Image from "next/image";
import { PiPlusThin } from "react-icons/pi";
import InputField from "@/components/molecules/InputField";
import { supabaseUploadFile } from "@/lib/supabase";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import Cookies from "js-cookie";

const AddPostPage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const jwtToken: string = Cookies.get("jwtToken") ?? "";

  const [selectedFile, setSelectedFile] = useState<File | undefined>();
  const [preview, setPreview] = useState<string | undefined>();
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

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

  const form = useForm<z.infer<typeof postFormSchema>>({
    resolver: zodResolver(postFormSchema),
  });

  const onSubmit = async (values: z.infer<typeof postFormSchema>) => {
    try {
      setIsButtonDisabled(true);
      const contentValue = convertToHTML(editorState.getCurrentContent());
      const { fileUrl, error } = await supabaseUploadFile(selectedFile!!);

      const data = {
        ...values,
        featuredImage: fileUrl,
        content: contentValue,
      };

      if (error) {
        throw error;
      }

      await axios.post(
        "/api/posts",
        { ...data },
        {
          headers: {
            Authorization: jwtToken,
          },
        }
      );

      setIsButtonDisabled(false);

      toast({
        title: "Post Added",
        description: "Your post is successfully added to our database",
      });

      router.push("/admin/posts");
    } catch (error) {
      toast({
        title: "Some error occurred",
        description: "Please try again!",
      });
      setIsButtonDisabled(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
        <InputField
          title="Post Title"
          subtitle="Enter your post title here. You must have at least 5 characters for the title."
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Post Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </InputField>
        <div>
          <InputField
            title="Featured Image"
            subtitle="Put the image that most represent your post here. It will appear in the top of the post."
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
          </InputField>
        </div>
        <div className="mt-8">
          <h2 className="font-bold text-xl text-primary mb-4">Post Content</h2>
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <div>
                <Editor
                  editorState={editorState}
                  onEditorStateChange={setEditorState}
                  wrapperClassName="wrapper-class h-96"
                  editorClassName="editor-class border border-gray-300 px-4"
                  toolbarClassName="toolbar-class"
                />
                <FormItem>
                  <FormMessage className="mt-3 mb-20" />
                </FormItem>
              </div>
            )}
          />
        </div>
        <div className="pt-12">
          <Button type="submit" size="lg" disabled={isButtonDisabled}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddPostPage;
