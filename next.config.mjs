/** @type {import('next').NextConfig} */
const nextConfig = {
/*  assetPrefix: '/mangeot',*/
  publicRuntimeConfig: {
    basePath: process.env.BASE_PATH || '',
  },
  basePath: process.env.BASE_PATH || '',

};

export default nextConfig;
