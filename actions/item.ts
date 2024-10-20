"use server";

import { currentUser } from "@/app/data/auth";
import { createClient } from "@/lib/supabase/server";
import { TablesInsert, TablesUpdate } from "@/types/database";
import { revalidatePath } from "next/cache";

export const createItem = async (formData: TablesInsert<"items">) => {
  const supabase = createClient();
  const user = await currentUser();

  if (!user) {
    throw new Error("ログインしてください");
  }

  const { data, error } = await supabase.from("items").insert(formData);

  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (error) {
    throw new Error(error.message);
  }
};

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
