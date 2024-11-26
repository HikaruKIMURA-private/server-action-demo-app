"use server";

import { currentUser } from "@/app/data/auth";
import { createClient } from "@/lib/supabase/server";
import type { TablesInsert, TablesUpdate } from "@/types/database";

export type CreateItem = TablesInsert<"items"> & {
  picture?: File;
};
export const createItem = async (formData: CreateItem) => {
  const supabase = createClient();
  const user = await currentUser();

  console.log("formdata", formData);
  if (!user) {
    throw new Error("ログインしてください");
  }

  // const picturePath = await uploadPictureToStorage(
  //   formData.picture as File | undefined
  // );
  // TODO: アップロードまではできている
  // error Error: Could not find the 'picture' column of 'items' in the schema cache

  // console.log("picturePath", picturePath);
  const { data, error } = await supabase.from("items").insert({ ...formData });
  console.log("data", data);
  if (error) {
    throw new Error(error.message);
  }
};

// const uploadPictureToStorage = async (file?: File): Promise<string | null> => {
//   if (!file) return null;
//   const supabase = createClient();
//   const { data, error } = await supabase.storage
//     .from("pictures")
//     .upload(file.name, file);

//   if (error) {
//     console.log("Upload error", error);
//     throw new Error(error.message);
//   }

//   return data.path;
// };

export const updateItem = async (
  id: string,
  formData: TablesUpdate<"items">
) => {
  const supabase = createClient();
  const user = await currentUser();

  if (!user) {
    throw new Error("ログインしてください");
  }

  const { data, error } = await supabase
    .from("items")
    .update(formData)
    .eq("id", id);
};

export const deleteItem = async (id: string) => {
  const supabase = createClient();
  const user = await currentUser();

  if (!user) {
    throw new Error("ログインしてください");
  }

  const { error } = await supabase.from("items").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
};
