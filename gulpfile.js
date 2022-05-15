var gulp = require('gulp'),
sass = require('gulp-sass')(require('sass')),
autoprefixer = require('gulp-autoprefixer'),
rename = require('gulp-rename'),
notify = require('gulp-notify'),
browserSync = require('browser-sync').create(),
cleanCSS = require('gulp-clean-css'),
postcss = require('gulp-postcss'),
assets  = require('postcss-assets');

gulp.task('process-styles', function () {
    return gulp.src(['./style.css','style.min.css'])
      .pipe(postcss([assets({
        loadPaths: ['inc/bootstrap-icons/','assets/images/']
      })]))
      .pipe(gulp.dest('.'));
  });

gulp.task('compile-styles', function() {
    return gulp.src('./scss/*.scss')
      .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
      .pipe(autoprefixer('last 2 versions'))
      .pipe(gulp.dest('.'))
      .pipe(rename({suffix: '.min'}))
      .pipe(cleanCSS('level: 2'))
      .pipe(gulp.dest('.'))
      .pipe(browserSync.stream())
      .pipe(notify({ message: 'Styles task complete' }));
  });

gulp.task('styles', gulp.series('compile-styles', 'process-styles'));

gulp.task('serve', function() {

    browserSync.init({
        proxy: "http://localhost:80/projet1/",
        host: 'http://localhost:80/projet1/',
        open: 'external'
    });

    gulp.watch(['./scss/**/*.scss', '!./node_modules/', '!./.git/'],{ ignoreInitial: false, usePolling: true }, gulp.series('compile-styles', 'process-styles'));

    gulp.watch(['./**/*.*', '!./node_modules/', '!./.git/', '!./**/*.scss', '!./style.css', '!./style.min.css'], { ignoreInitial: false, usePolling: true }).on('change', browserSync.reload);
});

gulp.task('watch', () => {
    gulp.watch('./scss/**/*.scss', { ignoreInitial: false, usePolling: true }, gulp.series('compile-styles', 'process-styles'));
});
