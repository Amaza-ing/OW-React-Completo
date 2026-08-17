import type { Preview } from "@storybook/react-vite";
import "../src/index.css";
import "../src/app/App.css";

const preview: Preview = {
  decorators: [
    (Story) => (
      <div className="page">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "padded",
  },
};

export default preview;
