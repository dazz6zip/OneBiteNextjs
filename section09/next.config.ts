import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* next 앱의 옵션을 설정해 주는 파일 */
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    domains: ["shopping-phinf.pstatic.net"],
  },
};

export default nextConfig;
