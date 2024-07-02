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
        nodeExternals()
    ],
    resolve:{
        extensions: ['','.jsx','.js']
    }
};