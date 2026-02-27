/// <reference types="vite-plugin-pwa/client" />
export {};

declare global {
  interface Window {
    Raychat: any; // or a specific type if you know it
  }
}
