/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // images: {
  //   domains: ["24bangladesh.net", "localhost"],
  // },
};

export default nextConfig;
