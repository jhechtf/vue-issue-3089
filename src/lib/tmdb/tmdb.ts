import axios, { AxiosInstance, AxiosRequestConfig} from 'axios';
//Import axios
import Cookie from '@lib/Cookie';
// Import cookies

interface tmdbConfigObject{
    base_url: string,
    secure_base_url: string, 
    backdrop_sizes: string[],
    logo_sizes: string[]
    poster_sizes: string[],
    profile_sizes: string[],
    still_sizes: string[]
}

//Export our TMDB class
export default class TmdbWrapper{
    protected apiKey:string;
    // default api key
    protected apiVersion = 3;
    // Api Version to use
    protected $https?:AxiosInstance;
    // HTTPS transport
    protected _config?:tmdbConfigObject;
    // The config object received by the 
    protected _config_loaded:boolean = false;
    constructor(apiKey?:string, customHeaders:object = {} ){
        if(!apiKey){
            //Try to grab the api key from cookies
            apiKey = Cookie.get('_apiKey');

            //If we still haven't found the API key then let we have to stop
            if(!apiKey){
                console.error('Could not find a valid API key!');
                throw new Error('Could not find a valid API key!');
            }
        }
        this.apiKey = apiKey;
        //Set the api key

        let requestConfig:AxiosRequestConfig = {
            baseURL: this.baseUri(),
            headers: customHeaders,
            timeout: 1200, //fiddled about with this number, 
            params:{
                api_key: apiKey
            }
        };
    
        this.$https = axios.create(requestConfig);
        //Create the axios image
        let config = JSON.parse(localStorage.getItem('tmdbConfiguration')!);
        //check local storage to see if we havet he config available to us
        if(!config) {
            this.$https!.get('configuration').then(({ data })=>{
                localStorage.setItem('tmdbConfiguration', JSON.stringify(data) );
                //Store config
                this._config = data.images;
                //set this mother fucker
                this._config_loaded=true;
                // config loaded? hell yeah
            }).catch((err: any)=>{
                console.error(err);
                throw new Error("We could not load the configuration. Please check the network tab to determine why");
            });
        }
        else{
            this._config = config.images, this._config_loaded= true;
        }
    }

    /**
     * @param url URI relative to the API Base
     * @param data the data to pass along in the body
     * @param options AxiosRequestConfig object that you'd like to use for the request.
     */
    public post(url: string, data?:any, options?: AxiosRequestConfig): Promise<any>{
        return this.$https!.post(url, data, options);
    }
    /**
     * @param url the URI relative to the api endpoint you'd like to call
     * @param options an AxiosRequestConfig object that you'd like to pass along
     * @description returns a promise that for the specified get request
     */
    public get(url:string, options?:AxiosRequestConfig): Promise<any>{
        return this.$https!.get(url, options);
    }
    /**
     * @param url URL relative to the API BaseURI
     * @param data the data to pass along to the route
     * @param options AxiosRequestConfig object to use for this request
     */
    public put(url: string, data?: any, options?: AxiosRequestConfig): Promise<any> {
        return this.$https!.put(url, data, options);
    }
    /**
     * @param url the URI relative to the base request URI
     * @param options any request options you want to pass along
     */
    public delete(url: string, options?: AxiosRequestConfig): Promise<any> {
        return this.$https!.delete(url, options);
    }

    /**
     * @param query the search string.
     * @param params any overriding parameters to the search request
     * @description Searches through TV/Movies/People with 
     */
    public search(query: string, params: object= {}): Promise<any> {
        return this.$https!.get('search/multi', {
            params: Object.assign({
                language: "en-US",
                adult: false,
                query
            }, params)
        });
    }

    /**
     * @param image the image name
     * @param size the image size
     * @param https enable http or https?
     * @description builds an image Uri
     */
    public buildImageUri(image: string, size: string= 'original', https: boolean= true ): string {
        if (this._config_loaded === false) {
            console.error('Call to function TMDB::buildImageUri before config could be loaded');
            return '';
        }
        const base = https ? this._config!.secure_base_url : this._config!.base_url;
        // get the base url, which is different depending on https or not
        if (image.charAt(0) === '/') image = image.slice(1);
        return base + size + '/' + image;
    }

    /**
     * @description returns the base URI of the TMDB api
     */
    private baseUri(): string {
        return 'https://api.themoviedb.org/' + this.apiVersion + '/';
    }
}
