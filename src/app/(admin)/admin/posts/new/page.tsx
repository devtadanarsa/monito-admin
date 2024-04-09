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
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import { Button } from "@/components/ui/button";
import { convertToHTML } from "draft-convert";

const AddPostPage = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const form = useForm<z.infer<typeof postFormSchema>>({
    resolver: zodResolver(postFormSchema),
  });

  const onSubmit = (values: z.infer<typeof postFormSchema>) => {
    const contentValue = convertToHTML(editorState.getCurrentContent());
    console.log(contentValue);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div>
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
        </div>
        <div className="mt-8">
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
        <div className="mt-20">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};

export default AddPostPage;
