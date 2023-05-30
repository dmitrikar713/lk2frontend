const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

require('dotenv').config({
  path: `${process.env.NODE_ENV}.env`,
});

const CSSModuleLoader = {
  loader: 'css-loader',
  options: {
    modules: true,
    importLoaders: 2,
    sourceMap: false, // turned off as causes delay
  },
};

const APP = /^APP_/i;
const env = Object.keys(process.env)
  .filter((key) => APP.test(key))
  .reduce((env, key) => {
    env[key] = process.env[key];
    return env;
  }, {});

const styleLoader = {
  loader: 'css-loader',
  options: {
    importLoaders: 4,
  },
};

const PostCSSLoader = {
  loader: 'postcss-loader',
  ident: 'postcss',
  options: {
    postcssOptions: {
      plugins: [
        'postcss-flexbugs-fixes',
        'postcss-normalize-charset',
        [
          'postcss-preset-env',
          {
            autoprefixer: {
              flexbox: 'no-2009',
            },
            stage: 3,
          },
        ],
        // postcssNormalize(),
      ],
    },
  },
};

module.exports = {
  target: ['web', 'es5'],
  entry: { index: path.resolve(__dirname, 'src', 'index.tsx') },
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'static/[name].[contenthash].js',
  },
  module: {
    rules: [
      {
        test: /\.s(a|c)ss$/,
        exclude: /\.module\.(sa|sc|c)ss$/,
        use: [
          styleLoader,
          PostCSSLoader,
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.module\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          CSSModuleLoader,
          PostCSSLoader,
          {
            loader: 'resolve-url-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images',
            },
          },
        ],
      },
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        include: path.resolve(__dirname, './public/fonts'),
        use: [
          {
            loader: 'url-loader',
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/font-woff',
              publicPath: '../',
            },
          },
        ],
      },
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: 'babelCache',
          },
        },
      },
    ],
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
      styles: path.resolve(__dirname, './src/styles'),
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: {
      name: 'manifest',
    },
    splitChunks: {
      maxSize: 1024 * 1024,
      cacheGroups: {
        vendor: {
          name: 'node_vendors',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
        },
        common: {
          test: /[\\/]src[\\/]components[\\/]/,
          chunks: 'all',
          minSize: 0,
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
      publicUrl: '/',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'static'),
          to: path.resolve(__dirname, 'build', 'static'),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
    }),
    new CleanWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        files: 'src/**/*.{ts,tsx}',
      },
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(env),
    }),
  ],
};
