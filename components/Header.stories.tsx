import { Header } from "./Header";
import { expect } from "@storybook/test";
import { waitFor, within } from "@storybook/testing-library";
import type { Meta, StoryObj } from "@storybook/react";
import { currentUser } from "#app/data/auth.mock";

export default {
  title: "Header",
  component: Header,
} as Meta<typeof Header>;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  beforeEach: async () => {
    currentUser.mockReturnValue(Promise.resolve(null));
  },
  play: async ({ canvasElement }) => {
    // ログイン中のユーザーが取得できなければ、ログインボタンが表示されるLB
    await waitFor(() => {
      const canvas = within(canvasElement);
      // @ts-ignore _は使わない
      const contentElements = canvas.getAllByText((_, element) => {
        // おそらくUIコンポーネントの仕様で複数箇所にログインの文字列があるため
        return element?.textContent?.includes("ログイン");
      });

      // @ts-ignore
      const logoutElements = canvas.queryAllByText((_, element) => {
        return element?.textContent?.includes("ログアウト");
      });
      expect(logoutElements.length).toBe(0);
      expect(contentElements.length).toBeGreaterThan(0);
    });
  },
};

export const LoggedIn: Story = {
  beforeEach: async () => {
    const user = {
      id: "test-id",
      app_metadata: {},
      user_metadata: {},
      aud: "authenticated",
      created_at: new Date().toISOString(),
    };
    currentUser.mockReturnValue(Promise.resolve({ data: { user } }));
  },
  play: async ({ canvasElement }) => {
    await waitFor(() => {
      const canvas = within(canvasElement);
      // @ts-ignore
      const logoutElements = canvas.queryAllByText((_, element) => {
        return element?.textContent?.includes("ログアウト");
      });
      expect(logoutElements.length).toBeGreaterThan(0);
    });
  },
};
