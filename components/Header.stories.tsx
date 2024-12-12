import { Header } from "./Header";
import { expect } from "@storybook/test";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import type { Meta, StoryObj } from "@storybook/react";
import { currentUser } from "#app/data/auth.mock";
import { signOut } from "#actions/auth.mock";

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
  play: async ({ canvasElement, step }) => {
    await waitFor(() => {
      const canvas = within(canvasElement);
      // @ts-ignore
      const logoutElements = canvas.queryAllByText((_, element) => {
        return element?.textContent?.includes("ログアウト");
      });

      // @ts-ignore
      const loginElements = canvas.queryAllByText((_, element) => {
        return element?.textContent?.includes("ログイン");
      });
      expect(loginElements.length).toBe(0);
      expect(logoutElements.length).toBeGreaterThan(0);
    });

    await step("ログアウトをクリックするとログアウトすること", async () => {
      const canvas = within(canvasElement);
      const logoutButton = canvas.getByText("ログアウト");
      await userEvent.click(logoutButton);
      await waitFor(() => {
        expect(signOut).toHaveBeenCalled();
      });
    });
  },
};
