import { Footer } from "./Footer";
import type { Meta, StoryObj } from "@storybook/react";

export default {
  title: "Footer",
  component: Footer,
} as Meta<typeof Footer>;

type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  render: () => <Footer />,
};
