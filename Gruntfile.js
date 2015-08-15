/*global module:false */

/**
 * @param grunt
 */
module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        useref: {
            html: 'dist/*.html',
            temp: 'temp'
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
                            'assets/css/images/**/*'
                        ],
                        dest: 'dist',
                        filter: 'isFile'
                    }
                ]
            }
        },
        clean: {
            build: ['dist/assets']
        }
    });
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-useref');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('build', ['copy', 'useref', 'concat', 'uglify', 'cssmin', 'clean']);
};
