import { createApp } from 'vue'
import '@/main.ts'
import './style.css'
import App from './App.vue'
import { bootstrapDirective } from '@/directives/bootstrap.ts'
// import tooltipDirective from '@/directives/tooltip.ts'

// createApp(App).mount('#app')

// const app = createApp(App)
// app.directive('tooltip', tooltipDirective)
// app.mount('#app')

createApp(App).directive('bs', bootstrapDirective).mount('#app')
