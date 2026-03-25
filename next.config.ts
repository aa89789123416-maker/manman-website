import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/manman-website',
  images: {
    unoptimized: true,
  },
}

export default nextConfig
