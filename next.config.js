// Without PWA Config
/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;

// With PWA Config
// const WithPWA = require("next-pwa")({
//   dest: "public",
//   register: true,
//   skipWaiting: true,
//   disable: process.env.NODE_ENV == "development",
// });

// /** @type {import('next').NextConfig} */
// const nextConfig = WithPWA({
//   reactStrictMode: true,
//   swcMinify: true,
// });

// module.exports = nextConfig;
