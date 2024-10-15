/* eslint-disable import/order */
import '@/@iconify/icons-bundle'
import App from '@/App.vue'
import layoutsPlugin from '@/plugins/layouts'
import vuetify from '@/plugins/vuetify'
import { loadFonts } from '@/plugins/webfontloader'
import router from '@/router'

import { createPinia } from 'pinia'
import { setupCalendar } from 'v-calendar'
import { createApp } from 'vue'

// Import SCSS
import '@core/scss/template/index.scss'
import '@styles/globalStyles.scss'
import '@styles/styles.scss'
import 'v-calendar/style.css'
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"
import "animate.css"
import animateOnScroll from "@/plugins/animateOnScroll";
import i18n from "@/plugins/i18n";
import MenuService from "@/services/menu.service";
loadFonts()

// Create vue app
const app = createApp(App)
MenuService.GetAll()
// Use plugins
app.use(vuetify)
app.use(createPinia())
app.use(router)
app.use(layoutsPlugin)
app.use(i18n)
app.use(Toast)
// Use plugin with optional defaults
app.use(setupCalendar, {})

app.use(animateOnScroll, {});

// Mount vue app
app.mount('#app')
