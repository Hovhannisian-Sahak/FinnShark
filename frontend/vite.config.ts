import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env.VITE_REACT_APP_API_KEY": JSON.stringify(
        env.VITE_REACT_APP_API_KEY
      ),
    },
    plugins: [react(), tailwindcss()],
  };
});
