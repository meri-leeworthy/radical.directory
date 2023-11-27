/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "matrix.radical.directory",
        port: "",
        pathname: "/_matrix/**",
      },
    ],
  },
}
