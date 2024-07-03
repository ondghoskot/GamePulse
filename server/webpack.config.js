const path = require('path');
const nodeExternals = require('webpack-node-externals');


module.exports = {
    mode: 'production',
    entry: "./app.js",
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    target: "node",
    externals:[
        nodeExternals(),
        nodeExternals({
            modulesDir: path.resolve(__dirname, './node_modules')
        })
    ],
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
        }]
    },
    resolve:{
        extensions: ['','.jsx','.js']
    },
};