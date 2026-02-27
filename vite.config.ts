import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import * as path from "path";
import react from "@vitejs/plugin-react";
// import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const isProd = mode === "production";

  return {
    css: {
      postcss: {
        plugins: [tailwindcss, autoprefixer],
      },
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
        },
      },
    },
    define: {
      "process.env.VITE_API_BASE": JSON.stringify(env.VITE_API_BASE),
      "process.env.GA4_MEASUREMENT_ID": JSON.stringify(env.GA4_MEASUREMENT_ID),
      "process.env.ORIGIN_URL": JSON.stringify(env.ORIGIN_URL),
      "process.env.SENTRY_DNS": JSON.stringify(env.SENTRY_DNS),
      "process.env.RAYCHAT_TOKEN": JSON.stringify(env.RAYCHAT_TOKEN),
      "process.env.WEB_PORT": JSON.stringify(env.WEB_PORT),
      "process.env.NODE_ENV": JSON.stringify(env.NODE_ENV),
    },
    plugins: [react(), tsconfigPaths()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@types": path.resolve(__dirname, "src/types"),
      },
    },
    preview: {
      host: isProd ? "farapayam.ir" : "dev.farapayam.ir",
    },
    server: {
      host: true,
      strictPort: true,
      allowedHosts: true,
    },
    build: {
      minify: "terser", //'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },

      sourcemap: false, // remove source maps in production
    },
  };
});
