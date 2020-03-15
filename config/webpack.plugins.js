const webpack = require('webpack');
const cssnano = require('cssnano');
const glob = require('glob');
const path = require('path');
const fs = require('fs');

const WebpackBar = require('webpackbar');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const WebappWebpackPlugin = require('webapp-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const config = require('./site.config');

// Hot module replacement
const hmr = new webpack.HotModuleReplacementPlugin();

// Optimize CSS assets
const optimizeCss = new OptimizeCssAssetsPlugin({
    assetNameRegExp: /\.css$/g,
    cssProcessor: cssnano,
    cssProcessorPluginOptions: {
        preset: [
            'default',
            {
                discardComments: {
                    removeAll: true,
                },
            },
        ],
    },
    canPrint: true,
});

// Clean webpack
const clean = new CleanWebpackPlugin();

// Stylelint
const stylelint = new StyleLintPlugin();

// Extract CSS
const cssExtract = new MiniCssExtractPlugin({
    filename: 'style.[contenthash].css',
});

// HTML generation
const paths = [];
const generateHTMLPlugins = () => glob.sync('./src/**/*.html').map((dir) => {
    const filename = path.basename(dir);

    return new HTMLWebpackPlugin({
        filename,
        template: path.join(config.root, config.paths.src, filename),
        meta: {
            viewport: config.viewport,
        },
    });
});

// Favicons
const favicons = new WebappWebpackPlugin({
    logo: config.favicon,
    prefix: 'images/favicons/',
    favicons: {
        appName: config.site_name,
        appDescription: config.site_description,
        developerName: null,
        developerURL: null,
        icons: {
            android: true,
            appleIcon: true,
            appleStartup: false,
            coast: false,
            favicons: true,
            firefox: false,
            windows: false,
            yandex: false,
        },
    },
});

// Webpack bar
const webpackBar = new WebpackBar({
    color: '#ff6469',
});

module.exports = [
    clean,
    stylelint,
    cssExtract,
    ...generateHTMLPlugins(),
    fs.existsSync(config.favicon) && favicons,
    config.env === 'production' && optimizeCss,
    webpackBar,
    config.env === 'development' && hmr,
].filter(Boolean);
