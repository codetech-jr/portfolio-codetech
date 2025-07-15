/** @type {import('next').NextConfig} */
const nextConfig = {

images: {
        domains: ['127.0.0.1', 'localhost:1337'],
        // Si en el futuro subes tu Strapi a un servidor, añade aquí su dominio
        // domains: ['127.0.0.1', 'mi-servidor-strapi.com'],
},
};

export default nextConfig;
