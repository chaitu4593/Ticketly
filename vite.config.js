import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function githubPagesFallback() {
  return {
    name: 'github-pages-spa-fallback',
    apply: 'build',
    writeBundle({ dir }) {
      const outputDirectory = dir || resolve('dist')
      copyFileSync(resolve(outputDirectory, 'index.html'), resolve(outputDirectory, '404.html'))
    },
  }
}

export default defineConfig({
  plugins: [react(), githubPagesFallback()],
  base: '/Ticketly/',
})