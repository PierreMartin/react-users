var path = require('path');
var webpack = require('webpack');
var assetsPath = path.join(__dirname, '..', 'public', 'assets');

var commonLoaders = [
    // ES6 + JSX
    {
        test: /\.js$|\.jsx$/,
        loader: 'babel-loader',
        // Reason why we put this here instead of babelrc :   https://github.com/gaearon/react-transform-hmr/issues/5#issuecomment-142313637
        query: {
            presets: ['es2015', 'react', 'stage-0'],
            plugins: ['transform-decorators-legacy']
        },
        include: path.join(__dirname, '..', 'app'),             // normalement ici on charge .babelrc
        exclude: path.join(__dirname, '..', 'node_modules')
    },

    // JSON
    {
        test: /\.json$/,
        loader: 'json-loader'
    },

    // IMAGES :
    {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: 'url',
        query: {
            name: '[hash].[ext]',
            limit: 10000
        }
    },

    // HTML :
    {
        test: /\.html$/,
        loader: 'html-loader'
    }
];

module.exports = {
    // The configuration for the server-side rendering
    name: 'server-side rendering',
    context: path.join(__dirname, '..', 'app'),
    entry: {
        server: './server'
    },
    target: 'node',
    output: {
        // The output directory as absolute path
        path: assetsPath,
        // The filename of the entry chunk as relative path inside the output.path directory
        filename: 'server.js',
        // The output path from the view of the Javascript
        publicPath: '/assets/',  // hotReload
        libraryTarget: 'commonjs2'
    },
    module: {
        loaders: commonLoaders.concat([
            // CSS (en dev, le css sera directement dans les style, mais en prod on generera un fichier css à part)
            {
                test: /\.css$/,
                loader: 'css/locals?module&localIdentName=[name]__[local]___[hash:base64:5]'
            }
        ])
    },
    resolve: {
        root: [path.join(__dirname, '..', 'app')],
        extensions: ['', '.js', '.jsx', '.css']
    },

    plugins: [
        new webpack.DefinePlugin({
            __DEVCLIENT__: false,
            __DEVSERVER__: true
        }),
        new webpack.IgnorePlugin(/vertx/)
    ]
};

// 25:50