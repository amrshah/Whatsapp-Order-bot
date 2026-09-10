import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

if (import.meta.env.VITE_REVERB_APP_KEY) {
    const isHttps = window.location.protocol === 'https:' || import.meta.env.VITE_REVERB_SCHEME === 'https';
    
    // Auto-resolve host for production VPS vs local development
    const host = (import.meta.env.VITE_REVERB_HOST && import.meta.env.VITE_REVERB_HOST !== '127.0.0.1' && import.meta.env.VITE_REVERB_HOST !== 'localhost')
        ? import.meta.env.VITE_REVERB_HOST
        : window.location.hostname;

    window.Echo = new Echo({
        broadcaster: 'reverb',
        key: import.meta.env.VITE_REVERB_APP_KEY,
        wsHost: host,
        wsPort: import.meta.env.VITE_REVERB_PORT || (isHttps ? 443 : 8080),
        wssPort: import.meta.env.VITE_REVERB_PORT || (isHttps ? 443 : 8080),
        forceTLS: isHttps,
        enabledTransports: ['ws', 'wss'],
    });
}
