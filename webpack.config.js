const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let mode = 'development'
if (process.env.NODE_ENV === 'production'){
    mode = 'production'
}

module.exports = {
  
    mode: mode,
    output:{
      assetModuleFilename: 'img/[hash][ext][query]',
      clean: true,
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css"
      }),
      new HtmlWebpackPlugin({
      template: './src/index.html'
    })],
    module: {
      rules: [
        {
          test: /\.html$/i,
          loader: "html-loader",
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/inline',
        },
        {
          test: /\.(le|c)ss$/i,
          use: [
            (mode === 'development') ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [
                    [
                      "postcss-preset-env",
                      {
                        // Options
                      },
                    ],
                  ],
                },
              },
            },,
            "less-loader",
          ],
        },
      ],
    },
}