var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    config = require('../config').js;

gulp.task('js', function () {
    return gulp.src(config.src)
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest(config.dest));

});