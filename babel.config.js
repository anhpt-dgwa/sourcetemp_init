const presets = [
  [
    '@babel/preset-env',
    {
      targets: {
        ie: 11,
        esmodules: true
      },
      useBuiltIns: 'entry',
      corejs: 3
    }
  ]
];

module.exports = { presets }