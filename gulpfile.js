var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var rimraf = require('rimraf');
var sequence = require('run-sequence');

gulp.task('clean', function(cb) {
    rimraf('./dist/*',cb);
});

gulp.task('sass', function() {
    return gulp.src('src/flex-layout.scss')
      .pipe($.sass({
          includePaths: ['./src'],
          errLogToConsole: true,
          outputStyle: 'nested'
      }))
      .pipe(gulp.dest('./dist/'))
    ;
});

gulp.task('build', function(cb) {
    sequence('clean', ['sass'], cb);
});

gulp.task('server', ['build'], function() {
    gulp.src('.')
        .pipe($.webserver({
            port: 8079,
            host: 'localhost',
            fallback: 'index.html',
            livereload: true,
            open: true
        }))
    ;
});

gulp.task('default', ['server'], function() {
    gulp.watch(['./src/*.*'], ['sass']);
});
