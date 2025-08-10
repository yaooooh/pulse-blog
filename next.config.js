/** @type {import('next').NextConfig} */
const withAntdLess = require("next-plugin-antd-less");

const config = withAntdLess({
  // 支持 AntD 模块内 ES 模块转译，以解决 Next.js 14.x 报错问题
  transpilePackages: ["antd", "@ant-design", "rc-util", "rc-pagination", "rc-picker", "@ant-design/icons"],
  lessLoaderOptions: {
    lessOptions: {
      modifyVars: {
        "@primary-color": "#1DA57A",
        "@border-radius-base": "4px"
      },
      javascriptEnabled: true
    }
  },
  webpack(config) {
    return config;
  },
  turbopack: {
    rules: {
    '*.{md}': {
        loaders: ['raw-loader'],
        as: '*.js',
      },
    },
  },
});

module.exports = config;
