module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        compass: {
            dist: {
                options: {
                    sassDir: 'web/app/themes/roots/assets/sass',
                    cssDir: 'web/app/themes/roots/assets/css'
                }
            }
        },
        // uglify: {
        //     all: {
        //         files: {
        //             'public/js/config.min.js': ['public-compiled/js/config.js'],
        //             'public/js/main.min.js': ['public-compiled/js/main.js']
        //         }
        //     }
        // },
        cssmin: {
            minify: {
                expand: true,
                cwd: 'web/app/themes/roots/assets/css',
                src: ['*.css', '!*.min.css'],
                dest: 'web/app/themes/roots/assets/css',
                ext: '.min.css'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', 'compass');
    grunt.registerTask('build', ['compass', 'cssmin']);
};