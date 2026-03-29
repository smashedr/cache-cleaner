import { createApp } from 'vue'
import App from './App.vue'
import '@/main.ts'
import './style.css'
import { bootstrapDirective } from '@/directives/bootstrap.ts'

createApp(App).directive('bs', bootstrapDirective).mount('#app')
