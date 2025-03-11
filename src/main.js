import { createApp } from 'vue'
import { createPinia } from 'pinia'

//Components
import App from './App.vue'
import router from './router'

//Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Material Design Icons
import '@mdi/font/css/materialdesignicons.css'

//Gsap
import gsap from 'gsap'

const app = createApp(App)

const vuetify = createVuetify({
  components,
  directives,
})

export default createVuetify({
  icons: {
    defaultSet: 'mdi', // default is 'mdi', only for display purposes
  },
})

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(gsap)

app.mount('#app')
