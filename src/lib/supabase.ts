import { createClient } from "@supabase/supabase-js";
import uniqid from "uniqid";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY!!
);

export const supabaseUploadFile = async (file: File | string) => {
  const fileUrl = `pets-${uniqid()}`;

  const { data, error } = await supabase.storage
    .from("pets")
    .upload(`public/${fileUrl}`, file, {
      cacheControl: "3600",
      upsert: false,
    });

  return {
    data,
    error,
    fileUrl,
  };
};

export const supabaseUpdateFile = async (
  newFile: File | string,
  oldFile: string
) => {
  const { data, error } = await supabase.storage
    .from("pets")
    .update(`public/${oldFile}`, newFile, {
      cacheControl: "3600",
      upsert: true,
    });

  return {
    data,
    error,
  };
};

export const supabasePublicUrl = async (fileName: string) => {
  const {
    data: { publicUrl },
  } = await supabase.storage.from("pets").getPublicUrl(`public/${fileName}`);

  return publicUrl;
};
