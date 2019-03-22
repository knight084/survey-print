module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: [
    // import the components according to requirement from iview
    ['import', {
      libraryName: 'iview',
      libraryDirectory: 'src/components'
    }]
  ]
};
