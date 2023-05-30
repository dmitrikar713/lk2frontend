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
    module: {
      rules: [
        {
          test: /\.s(a|c)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: { publicPath: '../../' },
            },
          ],
        },
      ],
    },
  });
};
