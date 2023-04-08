const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
//const BundleAnalyzerPlugin =  require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  mode: 'development',
  entry: {
    bundle:
    {
      import: path.resolve(__dirname, 'src/index.js'),
      dependOn: 'shared'
    },
    main: {
      import: path.resolve(__dirname, 'src/main.js'),
      dependOn: ['shared','oneMoreShared']
    },
    shared:{
      import: [path.resolve(__dirname, 'src/withIndex.js')],
      dependOn:'typeScript',
    },
    oneMoreShared:[path.resolve(__dirname, 'src/shared.js')],
    typeScript:[path.resolve(__dirname, 'src/typeScript.ts')]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name][contenthash].js',
    clean: true,
    assetModuleFilename: '[name][ext]',
  },
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      //chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      { test: /\.ts$/, use: 'ts-loader' },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack App',
      filename: 'index.html',
      template: 'src/index.html',
    }),
    //new BundleAnalyzerPlugin(),
  ],
}