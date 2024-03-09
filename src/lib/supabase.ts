import { createClient } from "@supabase/supabase-js";
import uniqid from "uniqid";

const supabase = createClient(
  process.env.DATABASE_URL!!,
  process.env.DATABASE_PUBLIC_KEY!!
);

const supabaseUploadFile = async (file: File | string) => {
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

const supabasePublicUrl = async (fileName: string) => {
  const {
    data: { publicUrl },
  } = await supabase.storage.from("pets").getPublicUrl(fileName);

  return publicUrl;
};
