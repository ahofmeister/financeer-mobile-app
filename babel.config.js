module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ["module:react-native-dotenv"],
      [
        'module-resolver',
        {
          root: ['./src/'],
          alias: {
            App: "./App",
            images: './src/resources/images'
          }
        }
      ],
      'nativewind/babel',
      'react-native-reanimated/plugin'
    ]
  }
}
