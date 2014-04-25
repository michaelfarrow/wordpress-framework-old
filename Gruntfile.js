var themeRoot   = 'web/app/themes/roots',
    themeAssets = themeRoot + '/assets',
    themeLibs   = themeRoot + '/libs';

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        compass: {
            dist: {
                options: {
                    sassDir: themeAssets + '/sass',
                    cssDir: themeAssets + '/css'
                }
            }
        },
        uglify: {
            all: {
                files: [{
                    src: themeAssets + '/js/vendor/modernizr.js',
                    dest: themeAssets + '/js/vendor/modernizr.min.js'
                }]
            }
        },
        cssmin: {
            minify: {
                expand: true,
                cwd: themeAssets + '/css',
                src: ['*.css', '!*.min.css'],
                dest: themeAssets + '/css',
                ext: '.min.css'
            }
        },
        copy: {
            all: {
                files: [
                    {
                        cwd: themeLibs + '/modernizr',
                        src: 'modernizr.js',
                        dest: themeAssets + '/js/vendor',
                        expand: true
                    },
                ]
            }
        },
        watch: {
            all: {
                files: [ themeAssets + '/sass/*.scss' ],
                tasks: [ 'styles' ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', 'compass');
    grunt.registerTask('styles', ['compass', 'cssmin']);
    grunt.registerTask('build', ['compass', 'copy', 'cssmin', 'uglify']);
};