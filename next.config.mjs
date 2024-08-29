/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    PUBLIC_URL: process.env.PUBLIC_URL,
    BaseUrl: process.env.BaseUrl,
    TOKEN_NAME: process.env.TOKEN_NAME,
    MAX_AGE: process.env.MAX_AGE,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
