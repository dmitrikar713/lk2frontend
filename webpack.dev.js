const { mergeWithRules } = require('webpack-merge');
const common = require('./webpack.common.js');
const postcssNormalize = require('postcss-normalize');

const result = mergeWithRules({
  module: {
    rules: {
      test: 'match',
      use: {
        loader: 'match',
        options: 'replace',
      },
    },
  },
})(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  output: {
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.s(a|c)ss$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              importLoaders: 4,
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            ident: 'postcss',
            options: {
              sourceMap: true,
              postcssOptions: {
                plugins: [
                  'postcss-flexbugs-fixes',
                  [
                    'postcss-preset-env',
                    {
                      autoprefixer: {
                        flexbox: 'no-2009',
                      },
                      stage: 3,
                    },
                  ],
                  postcssNormalize(),
                ],
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  devServer: {
    host: 'localhost',

    // Добавил это чтобы запускать под доменом
    allowedHosts: "all",


    port: 4200,
    historyApiFallback: true,
    hot: true,
    liveReload: true,
    open: true,
    proxy: {
      '/api': {
        target:
          process.env.APP_MOCK_API === 'ON'
            ? 'http://localhost:3005/'
            : 'dev-lk.moscow.business',
            // 185.22.234.143
            // dev-lk.moscow.business
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/api/*': '' },
      },
    },
  },
});

const withPrependentLoader = mergeWithRules({
  module: {
    rules: {
      test: 'match',
      use: 'prepend',
    },
  },
})(result, {
  module: {
    rules: [
      {
        test: /\.s(a|c)ss$/,
        use: ['style-loader'],
      },
    ],
  },
});

module.exports = withPrependentLoader;
