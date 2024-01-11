# common vue init

## Description

This repository is vue2 project with common setting.

## Major Library
 - "@popperjs/core": "^2.11.8"
 - "bootstrap": "^5.3.0"
 - "core-js": "^3.8.3"
 - "element-ui": "^2.15.13"
 - "vue": "^2.6.14"
 - "vuex": "^3.6.2"

## Customized setting

### defaultMainSetting.js
 - for multiple pages with same entry file setting (based on main.js)
 - usage
```
// foo.vue
import Vue from './defaultMainSetting.js'
import App from './foo.vue'

new Vue({
  render: h => h(App),
}).$mount('#app')
```
### vue.config.js
 - publicPath: "./"
 - transpileDependencies: true
 - pages (for multiple pages)

### ESline check
 - "vue/no-unused-components": "off"
 - "no-mixed-spaces-and-tabs": 0
 - "no-unused-vars": "off"

### Prettier

using ESlint default format with detailed setting in .prettierrc
