'use strict';

var gulp = require('gulp'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    minifyHtml = require('gulp-minify-html'),
    del = require('del'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

// copy lib dependencies
gulp.task('lib', function() {
  return gulp.src(
    ['bower_components/jquery/dist/jquery.min.js',
     'bower_components/underscore/underscore-min.js',
     'bower_components/backbone/backbone-min.js',
     'bower_components/moment/min/moment.min.js'])
     .pipe(gulp.dest('app/js/lib'));
});

gulp.task('html', function() {
    var assets = useref.assets({searchPath: '{tmp,app}'});

    return gulp.src('app/**/*.html')
        .pipe(assets)
        // concatenate libs
        .pipe(gulpif('lib/*.js', concat('lib.js')))
        // uglify main js
        // TODO: uglify main.js after concat
        .pipe(gulpif(['models/*.js', 'collections/*.js', 'views/*.js', 'app.js'], concat('main.js')))
        .pipe(assets.restore())
        .pipe(useref())
        // minify html
        .pipe(gulpif('*.html', minifyHtml()))
        // output files
        .pipe(gulp.dest('dist'));
});

// watch file for changes and reload
gulp.task('serve', function () {
    browserSync({
        notify: false,
        logPrefix: '4th-rp',
        server: ['tmp', 'app'],
        port: 8000
    });

    gulp.watch(['app/**/*.html'], reload);
});

// clean output directory
gulp.task('clean', del.bind(null, ['tmp', 'dist'], {dot: true}));
