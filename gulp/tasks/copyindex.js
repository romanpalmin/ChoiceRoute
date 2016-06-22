/**
 * Копирует index.html
 */
var gulp = require('gulp'),
    rename = require('gulp-rename'),
    config = require('../config');

gulp.task('copyindex', function () {
    return gulp.src(config.paths.src + '/index-build.html')
        .pipe(rename('index.html'))
        .pipe(gulp.dest(config.paths.dist));
});