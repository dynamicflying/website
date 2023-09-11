/** @type {import('next').NextConfig} */
module.exports = {
  basePath: process.env.BASE_PATH || '/website',
  output: 'export',
  images: {
    unoptimized: true,
  },
};
