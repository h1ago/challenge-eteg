import webpack from 'webpack';
import path from 'path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

const configs = {
  entry: {
    main: path.resolve(__dirname, 'src/index.tsx'),
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[fullhash].js',
  },

  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      react: path.resolve('./node_modules/react'),
    },
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(css)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico)(\?v=(.*))?$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext][query]',
        },
      },
      {
        test: /\.(tiff|woff|woff2|eot|ttf)(\?v=(.*))?$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext][query]',
        },
      },
    ],
  },

  optimization: {
    minimizer: [],
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      hash: true,
      template: 'src/index.html',
      filename: 'index.html',
      favicon: 'src/assets/images/favicon.png',
    }),
    new webpack.ProvidePlugin({
      Promise: 'es6-promise',
    }),
  ],

  devServer: {
    hot: true,
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 3100,
    compress: true,
    allowedHosts: 'all',
    open: true
  },
};

if (process.env.NODE_ENV === 'production') {
  configs.mode = 'production';
} else {
  configs.devtool = 'inline-source-map';
  configs.mode = 'development';
}

export default configs;
