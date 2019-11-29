
const path = require('path');
const RouteManifest = require('webpack-route-manifest');

module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: {
      '@assets': `${path.resolve(__dirname, 'src/assets')}`,
      '@pages': `${path.resolve(__dirname, 'src/pages')}`,
      '@components': `${path.resolve(__dirname, 'src/components')}`
    }
  };

  config.plugins.push(
		new RouteManifest({
			minify: true,
			filename: 'rmanifest.json',
			routes(str) {
				let out = str.replace('@pages', '').toLowerCase();
				if (out === '/article') return '/blog/:title';
				if (out === '/home') return '/';
				return out;
			}
		})
  );

  return config;
};
