import { Header } from "./Header";
import type { Meta, StoryObj } from "@storybook/react";

export default {
  title: "Header",
  component: Header,
} as Meta<typeof Header>;

type Story = StoryObj<typeof Header>;

export const Default: Story = {};
