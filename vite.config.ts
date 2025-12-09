import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
        exportType: "named",
        namedExport: "ReactComponent",
      },
    }),
  ],
  server: {
    port: 5173,
    proxy: {
      '/api/v1': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        // rewrite: (path) => path.replace(/^\/api\/v1/, '/api/v1'),
        configure: (proxy) => {
          proxy.on('proxyReq', (_, req) => {
            console.log('Proxy Request:', req.method, req.url);
          });
        },
      },
    },
  },
});
