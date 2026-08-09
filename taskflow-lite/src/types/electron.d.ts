export {};

declare global {
  interface Window {
    taskflowDesktop?: {
      platform: string;
    };
  }
}
