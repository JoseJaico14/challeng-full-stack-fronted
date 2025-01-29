const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    historyApiFallback: true, // Asegura que se manejen todas las rutas
  },
  // css: {
  //   loaderOptions: {
  //     sass: {
  //       additionalData: `@import './src/assets/styles/styles.scss';`,
  //     }
  //   }
  // },
})
