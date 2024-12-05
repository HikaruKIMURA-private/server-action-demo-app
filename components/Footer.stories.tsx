import { within } from "@storybook/testing-library";
import { Footer } from "./Footer";
import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";

export default {
  title: "Footer",
  component: Footer,
} as Meta<typeof Footer>;

type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText("footer")).toBeInTheDocument();
  },
};
