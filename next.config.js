/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    appDir: true,
    async headers() {
      return [
        {
          // matching all API routes
          // https://vercel.com/guides/how-to-enable-cors
          source: "/api/:path*",
          headers: [
            { key: "Access-Control-Allow-Credentials", value: "true" },
            { key: "Access-Control-Allow-Origin", value: "*" },
            {
              key: "Access-Control-Allow-Methods",
              value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
            },
            {
              key: "Access-Control-Allow-Headers",
              value:
                "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
            },
          ],
        },
      ];
    },
  },
  images: {
    domains: ["i.pravatar.cc", "img.freepik.com", "picsum.photos", "lh3.googleusercontent.com", "d1e8la4lqf1h28.cloudfront.net", "ik.imagekit.io","lh3.googleusercontent.com", "www.w3.org", "cdn.vectorstock.com"],
  },
};

module.exports = nextConfig;
