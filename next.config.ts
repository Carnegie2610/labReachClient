
import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
 
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/**',
      },
    ],
    minimumCacheTTL: 60,
    unoptimized: false,
  },
};
 
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);