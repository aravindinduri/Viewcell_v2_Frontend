import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    server: {
        proxy: {
            "/api": "https://viewcell-v2-backend.onrender.com/api/v1",
        },
    },
    plugins: [react()],
});
