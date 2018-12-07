//TODO: see if we can turn this into a singleton instance? Unsure how that would work in TypeScript

/**
 * ???Theory???
 * 1. class definition (with lowercase name)
 * 2. export default new cookie();
 */

 interface cMapInterface{
     [key:string]: string
 }

// Export the Cookie class. this is a static class -- no need or point in calling "new Cookie"
export default class Cookie{
    static _cMap:{ [key:string] : string} = {};
    //cookie map
    static parsed:boolean = false;
    //have cookies been parsed?

    /**
     * @description looks for the given name string in our cookies
     * @param name The name of the cookie we are looking for
     * @returns the value of the cookie OR undefined
     */
    static get(name:string): string{
        if(!Cookie.parsed) Cookie.parse();
        // If the cookies are not parsed, we parse them
        return Cookie._cMap[name];
        //This already returns 
    }

    /**
     * @description set a cookie with the given name+value
     * @param name the name of the cookie we are setting
     * @param value the value of the cookie 
     * @param path the URL path for the cookie to be accessible on.
     * @param expires the GMT String or a JS Date Object for when the cookie expires
     */
    static set(name:string, value:any|null, path?:string|null, expires?:string|Date){
        let expiresDate:Date;
        let cookieValue:string = [name, value].map(v=>encodeURIComponent(v)).join('=');
        //Encode cookie name and cookie values to make sure that we are not going to break our browser.
        //we then also join these two things via equal sign.
        if(expires == null){
            //If the expires date is null, we make a new one
            expiresDate = new Date();
        }else{
            expiresDate = typeof expires == 'string' ? new Date(expires) : expires;
        }

    }

    /**
     * @description Gets all the cookies.
     * @returns an object with all of the cookies mapped to name->value pairs
     */
    static getAll(): object {
        if (!Cookie.parsed) Cookie.parse();
        //If we haven't parsed cookies yet, we probably should;
        return Cookie._cMap;

    }

    /**
     * 
     * @param name the cookie name to be deleted. Will also remove from the cookie map on the object
     */
    static delete(name:string) {
        Cookie.set(name, null, null, '1970-12-31T00:00:00' );
        delete Cookie._cMap[name];
    }

    /**
     * @description parse goes through the document cookies and splits them out into key/value pairs. only the first Cookie.get should take much longer than a few milliseconds
     */
    static parse(){
        Cookie._cMap = document.cookie.split(';').reduce((cum:cMapInterface,cur:string)=>{
            let [name, value] = cur.trim().split('=');
            cum[name]= value;
            return cum;
        }, {});
        Cookie.parsed = true;
    }
}