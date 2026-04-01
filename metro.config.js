/**
 * Metro configuration for React Native + Expo SDK 54
 * Properly configured for ES6 imports and polyfills
 */

const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Ensure proper module resolution and polyfill handling
config.transformer = {
  ...config.transformer,
  getTransformOptions: async () => ({
    transform: {
      experimentalImportSupport: true,
      inlineRequires: true,
    },
  }),
};

config.resolver = {
  ...config.resolver,
  sourceExts: ['js', 'jsx', 'json', 'ts', 'tsx'],
  assetExts: config.resolver.assetExts.filter(ext => ext !== 'js'),
};

module.exports = config;
