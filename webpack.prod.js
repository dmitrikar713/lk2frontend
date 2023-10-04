const { mergeWithRules } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common.js');

module.exports = () => {
  const useSourceMap = false;

  return mergeWithRules({
    module: {
      rules: {
        test: 'match',
        use: 'prepend',
      },
    },
  })(common, {
    mode: 'production',
    devtool: useSourceMap && 'source-map',
    plugins: [new MiniCssExtractPlugin()],
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
    devServer: {
      historyApiFallback: true,
      allowedHosts: 'all',
      port: 8080,
    },
    module: {
      rules: [
        {
          test: /\.s(a|c)ss$/,
          use: [
            // MiniCssExtractPlugin.loader, 'css-loader'],
            {
              loader: MiniCssExtractPlugin.loader,
              options: { publicPath: '../../' },

              // loader: 'resolve-url-loader',
              // options: { removeCR: true, sourceMap: true },
            },
          ],
        },
      ],
    },
  });
};
