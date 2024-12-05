import { Header } from "./Header";
import { expect } from "@storybook/test";
import { within } from "@storybook/testing-library";
import type { Meta, StoryObj } from "@storybook/react";
import { createMock } from "storybook-addon-module-mock";
import * as item from "@/app/data/auth";

export default {
  title: "Header",
  component: Header,
} as Meta<typeof Header>;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  parameters: {
    moduleMocks: {
      mock: () => {
        const mock = createMock(item, "currentUser");
        mock.mockReturnValue(Promise.resolve(null));
      },
    },
  },
  play: async ({ canvasElement }) => {
    // ログイン中のユーザーが取得できなければ、ログインボタンが表示される
    const canvas = within(canvasElement);
    // TODO: 取れない
    expect(canvas.getByText("ログイン")).toBeInTheDocument();
  },
};
