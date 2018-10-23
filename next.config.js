const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const withImages = require('next-images');
const Dotenv = require('dotenv-webpack');
const commonsChunkConfig = require('@zeit/next-css/commons-chunk-config');
const path = require('path');

// require.extensions['.css'] = () => {};

require('css-modules-require-hook')({
  generateScopedName: '[name]__[local]___[hash:base64:5]',
  extensions        : ['.scss', '.css'],
  camelCase         : 'dashes',
});

module.exports = withCSS(withSass(withImages({
  cssLoaderOptions: {
    modules       : true,
    importLoaders : 1,
    camelCase     : 'dashes',
    localIdentName: '[name]__[local]___[hash:base64:5]',
    minimize      : process.env.NODE_ENV === 'production',
    sourceMap     : true,
    allChunks     : true,
  },
  sassLoaderOptions: {
    includePaths: [path.join(__dirname, 'node_modules')],
  },
  webpack: (config, { dev }) => {
    config.module.rules.push({
      test  : /\.(eot|woff|woff2|ttf|png|jpg|svg)$/,
      loader: 'file-loader?limit=10000&name=[name]-[hash].[ext]',
    });
    config.plugins.push(new Dotenv({
      path      : process.env.NODE_ENV === 'production' ? '.env.production' : '.env',
      systemvars: true,
    }));
    // In development sourcemaps are handled automatically
    if (!dev) {
      config.devtool = 'cheap-module-source-map';
    }
    config = commonsChunkConfig(config, /\.(css|sass|scss)$/);
    return config;
  },
})));
