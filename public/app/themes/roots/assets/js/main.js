/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * ======================================================================== */

require(["config"], function() {

        require(["jquery", "fastclick"], function($, FastClick) {

            // Use this variable to set up the common and page specific functions. If you 
            // rename this variable, you will also need to rename the namespace below.
            var Roots = {
                // All pages
                common: function() {
                    // JavaScript to be fired on all pages
                    FastClick.attach(document.body);

                    // Google maps async loading

                    // require(['async!http://maps.google.com/maps/api/js?sensor=false'], function(){
                    //     var $map = $('#gmap').css({
                    //         width: 500,
                    //         height: 400
                    //     }),
                    //         data = google_map_data_var;

                    //     if(data.center && typeof data.center == 'object'){
                    //         data.center = new google.maps.LatLng(data.center.lat, data.center.lng)
                    //     }

                    //     data.zoom = 16;

                    //     var map = new google.maps.Map($map.get(0), data); 
                    // });
                },
                // Home page
                home: function() {
                    // JavaScript to be fired on the home page
                },
                // About us page, note the change from about-us to about_us.
                about_us: function() {
                    // JavaScript to be fired on the about us page
                },
                // custom_template.
                page_template_custom: function() {
                    // JavaScript to be fired on any page with the template 'custom-template';
                }
            };

            // The routing fires all common scripts, followed by the page specific scripts.
            // Add additional events for more control over timing e.g. a finalize event
            var Router = {
                fire: function(func, funcname, args) {
                    var namespace = Pages;
                    if (func !== '' && namespace[func] && typeof namespace[func] === 'function') {
                        namespace[func](args);
                    }
                },
                loadEvents: function() {
                    Router.fire('common');

                    $.each(document.body.className.replace(/-/g, '_').split(/\s+/),function(i,classnm) {

                        // Strip _php off template class
                        if (classnm.indexOf('page_template_') === 0) {
                            classnm = classnm.substring(0, classnm.length - 4);

                            // Strip repeating 'template'
                            classnm = classnm.replace('page_template_template_', 'page_template_')
                        }

                        Router.fire(classnm);
                    });
                }
            };

            Router.loadEvents();

        });

});
