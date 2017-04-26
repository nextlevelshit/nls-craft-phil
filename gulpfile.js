'use strict';

var gulp        = require('gulp')
var sass        = require('gulp-sass')
var sourcemaps  = require('gulp-sourcemaps')

var config = {
    src: {
        baseDir: './src',
        stylesDir: '/scss',
    },
    dest: {
        baseDir: './web/assets/',
        stylesDir: '/css'
    }
}

gulp.task('sass', function() {
    return gulp.src(config.src.baseDir + config.src.stylesDir + '/main.scss')
        // .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        // .pipe(sourcemaps.write(config.dest.baseDir + config.dest.stylesDir))
        .pipe(gulp.dest(config.dest.baseDir + config.dest.stylesDir))
})

gulp.task('sass:watch', function() {
    gulp.watch(config.src.baseDir + config.src.stylesDir + '**/*.scss', ['sass'])
})
