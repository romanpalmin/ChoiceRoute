'use strict';
var project = '/';
var src = './src' + project;
var dist = './build' + project;
var srcAssets = src;
var distAssets = dist;

console.log(srcAssets);

module.exports = {
    paths: {
        project: project,
        src: src,
        dist: dist,
        srcAssets: srcAssets,
        distAssets: distAssets
    },

    clean: {
        dest: dist
    },

    css: {
        src: [srcAssets + '/css/**/*.css', '!' + srcAssets + '/css/*.min.css'],
        dest: distAssets
    },

    js: {
        src: [srcAssets + '/js/**/*.js', '!' + srcAssets + '/js/**/*.min.js'
        ],
        dest: distAssets + '/js'
    },

    watch: {
        src: src
    },

    vendors: {
        src: {
            js: [
                './node_modules/jquery/dist/jquery.min.js',
                './node_modules/select2/dist/js/select2.min.js'
                ],
            css: [
                './node_modules/select2/dist/css/select2.min.css'
            ]
        },
        dist: {
            js: distAssets + '/js/vendor',
            css: distAssets + '/css/vendor'
        }
    }
};