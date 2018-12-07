const path = require('path');

const fromSrc = (...p)=> path.join(__dirname, 'src', ...p);

module.exports = {
    // css:{
    //     loaderOptions:{
    //         sass: {
    //             data: `
    //                 @include 'node_modules/bootstrap/scss/functions';
    //             `
    //         }
    //     }
    // }, // Gotta figure out what I want to do with this information...
    baseUrl: './',
    chainWebpack: config => {
        config.resolve.alias
            .set('@lib', fromSrc('lib') );
        config.resolve.alias
            .set('@components', fromSrc('components') );
    }
}