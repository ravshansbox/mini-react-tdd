import { defineConfig } from 'vite';

export default defineConfig({
  esbuild: {
    jsxFactory: 'jsx',
    jsxInject: `import { jsx } from '/src/lib'`,
  },
  test: {
    environment: 'happy-dom',
  },
});
