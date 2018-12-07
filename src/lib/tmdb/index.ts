import Vue, { VueConstructor } from 'vue';
import TmdbClass from './tmdb';

// TMDB interface options
interface tmdbOptions {
    apiKey: string;
    v4Key?: string;
}

// TmdbPlugin the plugin object to add the $tmdb instance type
const TmdbPlugin = {
    install(Vue: VueConstructor, options: tmdbOptions){
        Vue.prototype.$tmdb = new TmdbClass( options.apiKey );
        // install the TMDB instance
    }
}

// Export TmdbPlugin
export default TmdbPlugin;