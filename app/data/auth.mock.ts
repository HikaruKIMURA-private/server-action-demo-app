import type { User } from "@supabase/supabase-js";
import { fn } from "@storybook/test";

// モックユーザーのデータを作成
const user: User = {
  id: "test-id",
  app_metadata: {},
  user_metadata: {},
  aud: "authenticated",
  created_at: new Date().toISOString(),
};

// getUserのモック関数を作成
export const currentUser = fn(
  async (): Promise<{ data: { user: User } } | null> => {
    const ret = {
      data: { user },
    };
    return ret;
  }
).mockName("currentUser");
