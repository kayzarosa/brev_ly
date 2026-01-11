import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/**/*.ts', 'src/**/*.sql'],
  clean: true,
  format: 'esm',
  outDir: 'dist',
  esbuildOptions(options) {
    options.loader = {
      ...options.loader,
      '.sql': 'text', // Diz ao esbuild para tratar .sql como arquivo de texto
    }
  },
  outExtension({ format }) {
    // Para o formato 'esm', usa a extensão '.mjs'
    if (format === 'esm') {
      return { js: '.mjs' }
    }
    // Caso contrário (se tivesse 'cjs'), usaria '.js' ou '.cjs'
    return { js: '.js' }
  },
})
