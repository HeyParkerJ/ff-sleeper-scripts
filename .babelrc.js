module.exports = 
{
  "presets": [
    ["@babel/preset-env", {
      targets: {
        esmodules: true,
      }
    }]
  ],
  "plugins": [
    "@babel/plugin-transform-runtime",
    "transform-node-env-inline"
  ]

}
