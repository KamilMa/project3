const { resolve } = require("path");
const webpack = require("webpack");

module.exports = {

    entry: {
        app: "./src/js/main.js"
    },
     output: {
         path: resolve(__dirname, "dist/js/"),
         filename: "[name].js"
     },

     module: {
         rules: [
             {
                 test: /\.js$/,
                 exclude: /node_modules/,
                 use: {
                     loader: "babel-loader",
                     options: {
                         presets: ["es2015"]
                     }
                 }
             }
        ]
     }
};