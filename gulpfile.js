'use strict';

var gulp = require('gulp')
var sass = require('gulp-sass')
var sourcemaps = require('gulp-sourcemaps')
var browserify = require('gulp-browserify');

var config = {
    src: {
        baseDir: './src',
        stylesDir: '/scss',
        stylesMainFile: '/main.scss',
        scriptsDir: '/js',
        scriptsMainFile: '/main.js'
    },
    dest: {
        baseDir: './web/assets/',
        stylesDir: '/css',
        scriptsDir: '/js'
    }
}

gulp.task('sass', function(done) {
    var src = config.src.baseDir + config.src.stylesDir + config.src.stylesMainFile

    return gulp.src(src)
        // .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        // .pipe(sourcemaps.write(config.dest.baseDir + config.dest.stylesDir))
        .pipe(gulp.dest(config.dest.baseDir + config.dest.stylesDir))
    done()
})

gulp.task('sass:watch', function() {
    var src = config.src.baseDir + config.src.stylesDir + '**/*.scss'

    gulp.watch(src).on('change', gulp.parallel('sass'));
})

gulp.task('scripts', function(done) {
    var src = config.src.baseDir + config.src.scriptsDir + config.src.scriptsMainFile
    var dest = config.dest.baseDir + config.dest.scriptsDir
    // Single entry point to browserify
    gulp.src(src)
        .pipe(browserify({
            insertGlobals: true,
            debug: true
        }))
        .pipe(gulp.dest(dest))
    done()
});

gulp.task('scripts:watch', function() {
    var src = config.src.baseDir + config.src.scriptsDir + '**/*.js'

    gulp.watch(src).on('change', gulp.parallel('scripts'));
})

gulp.task('dev', gulp.parallel('sass:watch', 'scripts:watch'))

gulp.task('build', gulp.series('sass', 'scripts'))

gulp.task('default', gulp.series('build', 'dev'))
