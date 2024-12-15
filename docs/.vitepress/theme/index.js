import DefaultTheme from 'vitepress/theme'
import './index.css'
import Navs from './components/Navs/index.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Navs', Navs)
  },
}
