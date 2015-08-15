/*global module:false */

/**
 * @param grunt
 */
module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        useref: {
            html: 'dist/*.html',
            temp: 'dist'
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        src: [
                            'index.html',
                            'email-confirm.html',
                            '401.html',
                            '404.html',
                            '503.html',
                            '*.png',
                            '*.ico',
                            'browserconfig.xml',
                            'manifest.json',
                            'assets/**/*'
                        ],
                        dest: 'dist'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: [
                            'images/*.png',
                            'images/*.jpg',
                            'assets/css/images/**/*',
                            'assets/css/ie9.css',
                            'assets/css/leaflet.css',
                            'assets/js/ie/respond.min.js',
                            'assets/css/font-awesome.min.css',
                            'assets/fonts/*'
                        ],
                        dest: 'dist',
                        filter: 'isFile'
                    }
                ]
            }
        },
        clean: {
            build: ['dist/assets']
        },
        cdnify: {
            build: {
                options: {
                    rewriter: function (url) {
                        var regex = new RegExp('^(?:[a-z]+:)?//', 'i');
                        if (regex.test(url)) {
                            return url;
                        }
                        return url.substring(url.lastIndexOf('/')+1);
                    }
                },
                files: [{
                    expand: true,
                    cwd: 'dist',
                    src: '*.{css,html}',
                    dest: 'dist'
                }]
            }
        }
    });
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-useref');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-cdnify');

    grunt.registerTask('build', ['copy', 'useref', 'concat', 'uglify', 'cssmin', 'clean', 'cdnify']);
};
