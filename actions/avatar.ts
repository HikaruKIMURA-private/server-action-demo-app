"use server";

import { createClient } from "@/lib/supabase/server";

export const uploadAvatar = async (formData: FormData) => {
  const image = formData.get("avatar") as File;

  console.log("image", image);
  const supabase = createClient();
  const { data, error } = await supabase.storage
    .from("avatars")
    .upload(image.name, image);

  console.log(data, error);

  const {
    data: { publicUrl },
  } = await supabase.storage.from("avatars").getPublicUrl(image.name);

  console.log(publicUrl);
};
