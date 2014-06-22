var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    watch = require('gulp-watch'),
    rjs = require('gulp-requirejs'),
    addsrc = require('gulp-add-src'),
    nodemon = require('gulp-nodemon');

gulp.task('server', function () {
    nodemon({
        script: 'ws.js',
        ignore: 'js/'
    });
});
gulp.task('default', ['server','rjs-compile', 'rjs-watch', 'sass-compile', 'sass-watch']);
gulp.task('sass-compile', function () {
    gulp.src('styles/*.scss')
        .pipe(sass())
        .pipe(concat('compiled.css'))
        .pipe(gulp.dest('./styles/'));
});
gulp.task('sass-watch', function () {
    gulp.watch('styles/*.scss', ['sass-compile']);
});
gulp.task('rjs-compile', function () {
    rjs({
        baseUrl: 'js/',
        paths: {
            'lib/i18n': 'lib/i18n.min'
        },
        out: 'todo-compiled.js',
        include: 'todo.js'
    }).pipe(gulp.dest('./js/'));
});
gulp.task('rjs-watch', function () {
    gulp.watch('js/**/*.js', ['rjs-compile']);
});
