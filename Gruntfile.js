var themeRoot   = 'public/app/themes/roots',
    themeAssets = themeRoot + '/assets',
    themeLibs   = themeRoot + '/libs';

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        modernizr: {
            dist: {
                devFile: themeLibs + '/modernizr/modernizr.js',
                outputFile: themeAssets + '/js/vendor/modernizr.js',
                files : {
                    src: [
                        themeAssets + '/sass/*.scss',
                        themeAssets + '/js/*.js',
                        themeRoot + '/common/assets/scss/*.scss'
                    ]
                },
                matchCommunityTests: true
            }
        },
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
                    sourceMap: false
                },
                files: [
                    {
                        src: themeAssets + '/js/main.all.js',
                        dest: themeAssets + '/js/main.all.min.js'
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
            }
        },
        watch: {
            all: {
                files: [
                    themeAssets + '/sass/*.scss',
                    themeAssets + '/js/*.js',
                ],
                tasks: [ 'styles', 'modernizr' ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks("grunt-modernizr");

    grunt.registerTask('default', 'compass');
    grunt.registerTask('styles', ['compass', 'cssmin']);
    grunt.registerTask('build', ['compass', 'copy', 'cssmin', 'requirejs', 'modernizr', 'uglify']);
};
