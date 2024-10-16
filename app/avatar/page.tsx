"use client";

import { uploadAvatar } from "@/actions/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function Avatar() {
  return (
    <div>
      <form
        action={async (formData: FormData) => {
          await uploadAvatar(formData);
        }}
      >
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="picture">Picture</Label>
          <Input type="file" name="avatar" id="picture" />
          <Button type="submit">アップロード</Button>
        </div>
      </form>
    </div>
  );
}
