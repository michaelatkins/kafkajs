var gulp = require('gulp'),
jshint = require('gulp-jshint'),
mocha = require('gulp-mocha');

gulp.task('lint', function(){
  return gulp.src('src/**.js', {read:false}).pipe(jshint());
});

gulp.task('test', function(){
  return gulp.src('test/**.js', {read:false}).pipe(mocha());
});
