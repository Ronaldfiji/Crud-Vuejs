import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

/*
import bootstrap
*/
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
/*
import fontawsome
*/
import "../node_modules/@fortawesome/fontawesome-free/css/all.css"

/*
import stylesheet
*/
import "../public/style/style.css"

createApp(App).use(router).mount('#app')
