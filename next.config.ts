const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "./public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: false,
  workBoxOptions: {
    disableDevLogs: true,
  },
});

const nextConfig = {
  webpack: true,
};

module.exports = withPWA(nextConfig);
