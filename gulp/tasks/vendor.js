/**
 * Копирует вендорные библиотеки и файлы
 */
var gulp = require('gulp'),
    config = require('../config');

gulp.task('vendor', function () {
    gulp.src(config.vendors.src.js)
        .pipe(gulp.dest(config.vendors.dist.js));
    gulp.src(config.vendors.src.css)
        .pipe(gulp.dest(config.vendors.dist.css));
});