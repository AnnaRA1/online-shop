// Подключаем модули галпа
const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const rigger = require("gulp-rigger");


// Порядок подключения js файлов
const jsFiles = [
    './src/js/main.js',
];

const cssFiles = [
    './src/scss/style.scss',
];
// Таск на стили css
function styles() {
    // Шаблон для поиска файлов CSS
    return gulp.src(cssFiles)
        // Объеденение файлов в один

        .pipe(sass())
        // Переобразование с scss to css

        .pipe(autoprefixer({
            cascade: false
        }))
        // Добавить префиксы

        .pipe(cleanCSS({
            level: 2
        }))
        // Минификация файла 

        .pipe(gulp.dest('./dist/css/'))
        // AudioDestinationNode(куда помещаются файлы)

        .pipe(browserSync.stream());
        // Автоматическое обновление 
}

// Таск на стили js
function scripts() {
    return gulp.src(jsFiles)
        .pipe(rigger())
        .pipe(concat('main.js'))
        .pipe(uglify({
            toplevel: true
        }))
        .pipe(gulp.dest('./dist/js/'))
        .pipe(browserSync.stream());

}

function images() {
    return gulp.src('src/img/**/*.{jpg,jpeg,png,svg}')
        .pipe(imagemin({optimizationLevel: 5}))
        .pipe(gulp.dest('dist/img'));
}


// Удалить все в указанной папке
function clean() {
    return del(['dist/*']);
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './dist',
            index: 'index.html'
        }
    });

    gulp.watch('./src/scss/**/*.scss', styles);
    // Следить за файлами CSS

    gulp.watch('./src/js/**/*.js', scripts)
    // gulp.watch('./src/html/index.html', html)
    gulp.watch('src/html/**/*.html', html);
}
function html() {
    return gulp.src('src/html/index.html')
    .pipe(rigger())
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream())
}

gulp.task('html', html);
gulp.task('clean', clean);
gulp.task('styles', styles);
gulp.task('scripts', scripts);

gulp.task('watch', watch);
gulp.task('build', gulp.series(clean, images, gulp.parallel(html, styles, scripts)));
gulp.task('dev', gulp.series('build', 'watch'));