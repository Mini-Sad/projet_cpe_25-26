import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "",
  plugins: [react()],
})

export default {
  base: '/projet_cpe_25-26/', // 👈 required for correct asset paths
}

