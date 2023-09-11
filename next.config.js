/** @type {import('next').NextConfig} */
module.exports = {
  basePath: process.env.BASE_PATH || '',
  output: (process.env.OUTPUT || undefined) ? process.env.OUTPUT : undefined,
  images: {
    unoptimized: true,
  },
};
