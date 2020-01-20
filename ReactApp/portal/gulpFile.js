'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var path = require('path');

//var jsDest = path.dirname('C:\\Work\\Projects\\Insight\\Portal\\MVCApp\\Insight.Portal.App\\Scripts\\React\\q\\');
//var cssDest = path.dirname('C:\\Work\\Projects\\Insight\\Portal\\MVCApp\\Insight.Portal.App\\Content\\q\\');
const jsDest = path.resolve(`${__dirname}../../../MVCApp/Insight.Portal.App/Scripts/React`);
const cssDest = path.resolve(`${__dirname}../../../MVCApp/Insight.Portal.App/Content`);

gulp.task('sass', function() {
  gulp.src('./src/scss/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('./src/css/'));
});

gulp.task('watch', function () {
  gulp.watch('./src/scss/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'watch']);

gulp.task('js-copy', function () {
  gulp.src('./build/static/js/main.????????.js')
      .pipe(rename('bundle.js'))
      .pipe(gulp.dest(jsDest));
});


gulp.task('css-copy', function () {
  gulp.src('./build/static/css/*.css')
      .pipe(rename('react.css'))
      .pipe(gulp.dest(cssDest));
});

gulp.task('copy', ['js-copy', 'css-copy']);

