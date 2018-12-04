const gulp = require('gulp');

const clean = require('gulp-clean');
const concat = require('gulp-concat');
const cssnano = require('gulp-cssnano');
const polyfer = require('gulp-polyfer');
const postcss = require('gulp-postcss');
const postcssPresetEnv = require('postcss-preset-env');
const htmlmin = require('gulp-htmlmin');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const gulpSequence = require('gulp-sequence');
const htmlreplace = require('gulp-html-replace');
const ext_replace = require('gulp-ext-replace');
const pump = require('pump')

gulp.task('clean', function () {
    return gulp.src('./public/*')
        .pipe(clean());
});

gulp.task('build-css', function () {
    const plugins = [
        postcssPresetEnv
    ];
    gulp.src('./app/css/*.css')
        .pipe(concat('styles.css'))
        .pipe(polyfer())
        .pipe(cssnano())
        .pipe(postcss(plugins))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('build-js', function () {
    pump(
        gulp.src('./app/js/**/*.js'),
        concat('index.js'),
        babel({ presets: ['@babel/env'] }),
        uglify(),
        gulp.dest('./public/js'),
        function (err) {
            console.log(err);
        }
    )
});

gulp.task('mv-img', function () {
    gulp.src('./app/**/*.{ico,png,jpg}')
        .pipe(gulp.dest('./public/'));
});

gulp.task('build-html', function () {
    gulp.src('./app/**/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(htmlreplace({
            css: './css/styles.css',
            js: './js/index.js',
        }, {
                resolvePaths: true,
            }))
        .pipe(ext_replace('.mst'))
        .pipe(gulp.dest('./public/'));
});

gulp.task('mv-mst', function () {
    gulp.src('./app/**/*.mst')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./public/'));
});

gulp.task('build', function () {
    gulpSequence('clean', 'build-css', 'build-js', 'build-html', 'mv-img', 'mv-mst')(function (err) {
        if (err) {
            console.log('err');
        }
    });
});

gulp.task('watch', function () {
    gulp.watch('./app/css/**/*.css', ['build-css']);
    gulp.watch('./app/js/**/*.js', ['build-js']);
    gulp.watch('./app/**/*.html', ['build-html']);
    gulp.watch('./app/img/*.{jpg,png}', ['build-html']);
    gulp.watch('./app/**/*.mst', ['mv-mst']);
});
