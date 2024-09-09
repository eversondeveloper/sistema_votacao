import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  base: '/sistema_votacao', // Isso garante que os caminhos sejam relativos
  plugins: [react()],
});
