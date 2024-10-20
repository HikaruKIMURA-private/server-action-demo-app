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

export const searchItems = async (keyword: string) => {
  const supabase = createClient();

  let query = supabase.from("items").select();

  if (keyword.match(" and ")) {
    // and検索
    const keywords = keyword.split(" and ").map((keyword) => `%${keyword}%`);
    query = query.ilikeAllOf("name", keywords);
  }

  if (keyword.match(" or ")) {
    // or検索
    const keywords = keyword.split(" or ").map((keyword) => `%${keyword}%`);
    query = query.ilikeAnyOf("name", keywords);
  }

  const { data, error } = await query;

  console.log(data, error, keyword);

  return data;
};
