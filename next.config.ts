// next.config.ts

import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  // The 'images' configuration block
  images: {
    // By default, Next.js allows images from the same domain (self-hosted).
    // Adding remotePatterns tells Next.js to ALSO allow images from specific external domains.
    // If you are ONLY using local images from your `/public` folder, you can
    // completely DELETE this entire `images` block.
    
    // However, it's good practice to keep it for future use.
    // We will leave it empty for now, as you are not using any remote images.
    // If you later add images from an external source, you would add its pattern here.
    remotePatterns: [
      // Example: To allow images from an AWS S3 bucket
      // {
      //   protocol: 'https',
      //   hostname: 'my-bucket.s3.amazonaws.com',
      //   port: '',
      //   pathname: '/**',
      // },
    ],
  },
};
 
export default withNextIntl(nextConfig);