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
                options: {
                    sourceMap: true
                },
                files: [
                    {
                        cwd: 
                        src: themeAssets + '/js/vendor/modernizr.js',
                        dest: themeAssets + '/js/vendor/modernizr.min.js'
                    },
                    {
                        src: themeAssets + '/js/main.all.js',
                        dest: themeAssets + '/js/main.all.min.js'
                    },
                    {
                        src: themeAssets + '/js/main.almond.all.js',
                        dest: themeAssets + '/js/main.almond.all.min.js'
                    }
                ]
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
                    {
                        cwd: themeLibs + '/requirejs',
                        src: 'require.js',
                        dest: themeAssets + '/js/vendor',
                        expand: true
                    },
                ]
            }
        },
        requirejs: {
            compile: {
                options: {
                    optimize: 'none',
                    findNestedDependencies: true,
                    baseUrl: themeRoot,
                    mainConfigFile: themeAssets + '/js/config.js',
                    name: 'assets/js/main',
                    out: themeAssets + '/js/main.all.js'
                }
            },
            compile_almond: {
                options: {
                    optimize: 'none',
                    findNestedDependencies: true,
                    baseUrl: themeRoot,
                    mainConfigFile: themeAssets + '/js/config.js',
                    name: 'libs/almond/almond',
                    include: [
                        'assets/js/main'
                    ],
                    out: themeAssets + '/js/main.almond.all.js'
                }
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
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    grunt.registerTask('default', 'compass');
    grunt.registerTask('styles', ['compass', 'cssmin']);
    grunt.registerTask('build', ['compass', 'copy', 'cssmin', 'requirejs', 'uglify']);
};
