// postcss.config.mjs
/** @type {import('postcss-load-config').Config} */
const config = {
    plugins: {
      '@tailwindcss/postcss': {} // Simplemente incluye el plugin v4
    }
}

export default config;