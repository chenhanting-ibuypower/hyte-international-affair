const webpack = require("webpack");

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["content.ibuypower.com", "s.yimg.com"],
    formats: ["image/avif", "image/webp"],
  },
  webpack: (config, { isServer }) => {
    config.resolve = {
      ...config.resolve,
      fallback: {
        fs: false,
      },
    };
    config.plugins.push(
      new webpack.ProvidePlugin({
        $project: "$project.ts",
        $utility: "$utility.ts",
      })
    );

    const prefix = config.assetPrefix ?? config.basePath ?? "";
    config.module.rules.push({
      test: /\.mp4$/,
      use: [
        {
          loader: "file-loader",
          options: {
            publicPath: `${prefix}/_next/static/media/`,
            outputPath: `${isServer ? "../" : ""}static/media/`,
            name: "[name].[hash].[ext]",
          },
        },
      ],
    });

    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};
