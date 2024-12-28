/** @type {import('prettier').Config} */

export default {
  useTabs: true,
  singleQuote: true,
  trailingComma: 'none',
  printWidth: 100,
  plugins: ['prettier-plugin-astro', 'prettier-plugin-svelte', 'prettier-plugin-jsdoc'],
  overrides: [
    {
      files: ['.*', '*.json', '*.md', '*.toml', '*.yml'],
      options: {
        useTabs: false
      }
    },
    {
      files: '*.astro',
      options: {
        parser: 'astro'
      }
    },
    { files: '*.svelte', options: { parser: 'svelte' } }
  ]
};
