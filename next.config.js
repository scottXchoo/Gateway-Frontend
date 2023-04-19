/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: "imgix",
    path: "https://gateway-frontend.github.io/",
  },
  reactStrictMode: true,
  basePath: "/gateway-frontend",
};

module.exports = nextConfig;
