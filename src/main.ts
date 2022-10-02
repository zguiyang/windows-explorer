import App from './App.vue';

import './styles/index.scss';

import { setupPinia } from './store';

const app = createApp ( App );

setupPinia ( app );

app.mount ( '#app' );
