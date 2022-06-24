module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver', {
          extensions: ['.png', '.svg', '.ts', '.tsx'],
          root: ['./'],
          alias: {
            'assets': './assets',
            'atoms': './src/atoms',
            'components': './src/components',
            'navigation': './src/navigation',
            'screens': './src/screens',
            'styles': './src/styles',
            'types': './src/types',
            'utilities': './src/utilities'
          }
        }
      ],
      "react-native-reanimated/plugin",
    ]
  };
};
