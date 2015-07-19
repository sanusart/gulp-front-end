"use strict";

var gulp = require('gulp');
var browserSync = require('browser-sync');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var cp = require('child_process');
var sass = require('gulp-sass');
var concatenate = require('gulp-concat');
var args = require('yargs').argv;
var gulpif = require('gulp-if');
var inlinesource = require('gulp-inline-source');
var jade = require('gulp-jade');

var messages = {
  jekyllBuild: '<span style="color: grey">Running:</span> build',
  cssChanged: '<span style="color: grey">CSS UPDATED:</span>',
  jsChanged: '<span style="color: grey">JavaScript UPDATED:</span>'
};

var css_files = [
  'node_modules/normalize.css/normalize.css',
  'src/css/style.css',
  "!src/css/styles.css"
];
var js_files = [
  'src/js/script.js',
  "!src/js/scripts.js"
];

gulp.task('css', ['sass'], function() {
  browserSync.notify(messages.cssChanged);
  return gulp.src(css_files)
    .pipe(gulpif(args.min, minifyCss()))
    .pipe(concatenate('styles.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
    .pipe(gulp.dest('src/css'));
});

gulp.task('js', function() {
  browserSync.notify(messages.jsChanged);
  return gulp.src(js_files)
    .pipe(gulpif(args.min, uglify()))
    .pipe(concatenate('scripts.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.reload({
      stream: true
    }))
    .pipe(gulp.dest('src/js'));
});

gulp.task('sass', function() {
  return gulp.src('src/css/style.scss')
    .pipe(sass())
    .pipe(gulp.dest('src/css'));
});

if (args.jade) {
  gulp.task('html', function() {
    var YOUR_LOCALS = {};
    gulp.src('./src/*.jade')
      .pipe(jade({
        locals: YOUR_LOCALS,
        pretty: true
      }))
      .pipe(gulpif(args.min, minifyHtml()))
      .pipe(gulp.dest('dist/'))
      .pipe(browserSync.reload({
        stream: true
      }))
      .pipe(gulp.dest('src/'));
  });
} else {
  gulp.task('html', function() {
    gulp.src([
        'src/*.html'
      ])
      .pipe(gulpif(args.min, minifyHtml()))
      .pipe(gulp.dest('dist/'));
    browserSync.reload();
  });
}

gulp.task('fonts', function() {
  return gulp.src([
      'src/assets/font-awesome/fonts/**'
    ])
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('build', ['fonts', 'html', 'css', 'js'], function() {
  browserSync.reload();
});

gulp.task('browser-sync', ['build'], function() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  });
});

gulp.task('watch', function() {
  gulp.watch('src/css/*.scss', ['css']);
  gulp.watch('src/js/script.js', ['js']);
  gulp.watch(['src/*.html', 'src/*.jade'], ['html']);
});

gulp.task('default', ['browser-sync', 'watch']);

/**
 * Use with `gulp release --min` - will enable all minifications (`--bs` will start browser-sync after)
 */
gulp.task('release', ['build'], function() {
  gulp.start('html');
  // Start browser sync just for preview
  if (args.bs) {
    browserSync.init({
      server: {
        baseDir: 'dist'
      }
    });
  }
});
