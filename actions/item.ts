"use server";

import { createClient } from "@/lib/supabase/server";

export const createItem = async (formData: {
  name: string;
  amount: number;
}) => {
  const supabase = createClient();

  const { data, error } = await supabase.from("items").insert(formData);

  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (error) {
    throw new Error(error.message);
  }
};
