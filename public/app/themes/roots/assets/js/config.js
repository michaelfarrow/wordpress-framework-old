requirejs.config({
    baseUrl: '/app/themes/roots',
    paths: {
        js: 'assets/js',
        app: 'assets/js/app',
        models: 'assets/js/models',
        views: 'assets/js/views',
        common: 'assets/js/common',
        config: 'assets/js/config',
        handlebars: 'libs/handlebars/handlebars.amd',
        'underscore.string': 'libs/underscore.string/lib/underscore.string',
        underscore: 'libs/underscore/underscore',
        jquery: 'libs/jquery/dist/jquery',
        backbone: 'libs/backbone/backbone',
        fastclick: 'libs/fastclick/lib/fastclick'
    },
    shim: {
        
    }
});
