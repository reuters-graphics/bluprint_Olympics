const path = require('path');

module.exports = {
  test: /\.scss$/,
  include: path.resolve(__dirname, '../../../../src/js'),
  use: [{
    loader: 'style-loader',
  }, {
    loader: 'css-loader',
    options: {
      modules: true,
      sourceMap: true,
    },
  }, {
    loader: 'postcss-loader',
    options: {
      sourceMap: true,
      plugins: [
        require('autoprefixer'),
      ],
    },
  }, {
    loader: 'resolve-url-loader',
    options: {},
  }, {
    loader: 'sass-loader',
    options: {
      sourceMap: true,
    },
  }],
};
