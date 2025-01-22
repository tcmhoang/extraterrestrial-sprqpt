/** @type {import('prettier').Config} */

export default {
    useTabs: true,
    singleQuote: true,
    proseWrap: 'preserve',
    semi: true,
    printWidth: 80,
    tabWidth: 4,
    plugins: [
        'prettier-plugin-astro',
        'prettier-plugin-svelte',
        'prettier-plugin-jsdoc',
    ],
    overrides: [
        {
            files: '*.astro',
            options: {
                parser: 'astro',
            },
        },
        { files: '*.svelte', options: { parser: 'svelte' } },
        {
            files: ['.*', '*.json', '*.md', '*.toml', '*.yml'],
            options: {
                useTabs: false,
            },
        },
    ],
};
