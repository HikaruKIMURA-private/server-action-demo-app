import "server-only";

import { createClient } from "@/lib/supabase/server";

export const getItems = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.from("items").select();

  console.log(data, error);

  return data;
};

export const getItem = async (id: string) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("items")
    .select()
    .eq("id", id)
    .single();

  console.log(data, error);

  return data;
};
