import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    root: "src", 
    build: {
        outDir: "../dist",
        emptyOutDir: true,
    },
    server: {
        proxy: {
            "/api": "https://viewcell-v2-backend.onrender.com/api/v1",
        },
    },
    plugins: [react()],
});
