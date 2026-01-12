import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true, // permite usar 'describe', 'it', 'expect' sem importar
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'], // 'text' para o terminal, 'html' para relatório visual
      exclude: [
        'node_modules/**',
        'dist/**',
        '**/*.d.ts',
        'src/shared/**', // ignora arquivos compartilhados
        'viti.config.mjs' // ignora o próprio arquivo de config
      ],
    },
  },
})
