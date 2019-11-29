
const path = require('path');

module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: {
      '@assets': `${path.resolve(__dirname, 'src/assets')}`,
      '@pages': `${path.resolve(__dirname, 'src/pages')}`,
      '@components': `${path.resolve(__dirname, 'src/components')}`
    }
  };

  return config;
};
