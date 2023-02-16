/** @type {import('next').NextConfig} */
module.exports = {
  basePath: process.env.BASE_PATH || '/website',
  images: {
    unoptimized: true,
  },
};
