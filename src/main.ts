import App from './App.vue';

import { setupPinia } from './store';

const app = createApp ( App );

setupPinia ( app );

app.mount ( '#app' );
