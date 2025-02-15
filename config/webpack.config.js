const path = require('path');

const config = require('./site.config');
const loaders = require('./webpack.loaders');
const plugins = require('./webpack.plugins');

module.exports = {
    context: path.join(config.root, config.paths.src),
    entry: [
        '@babel/polyfill',
        'whatwg-fetch',
        path.join(config.root, config.paths.src, 'js/main.js'),
        path.join(config.root, config.paths.src, 'css/main.scss'),
    ],
    output: {
        path: path.join(config.root, config.paths.dist),
        filename: '[name].[hash].js',
    },
    mode: ['production', 'development'].includes(config.env)
        ? config.env
        : 'development',
    devtool: config.env === 'production'
        ? 'hidden-source-map'
        : 'cheap-eval-source-map',
    devServer: {
        contentBase: path.join(config.root, config.paths.src),
        watchContentBase: true,
        hot: true,
        open: true,
        public: `localhost:${config.port}`,
        port: config.port,
        host: config.dev_host,
    },
    module: {
        rules: loaders,
    },
    plugins,
};
