const gulp = require('gulp')
// Чтобы преобразовывать наш код в понятный для браузера js
const browserify = require('browserify')
// Тоже самое что gulp-typescript но первый для nodejs, а tsify браузерный формат
const tsify = require('tsify')
const source = require('vinyl-source-stream')
const watchify = require('watchify')
const fancyLog = require('fancy-log')
const browserSync = require('browser-sync').create()

// Объект который указывает на все html и  css файлы в проекты
const path = {
    pages: ["./src/*.html", "./src/*.css"]
}

// Задача на копирование html файлов из src в dist
gulp.task('copy-file', () => gulp.src(path.pages)
    .pipe(gulp.dest('./dist'))
)

gulp.task('serve', () => {
    browserSync.init({
        server: {
            baseDir: './dist'
        },
        port: 3000,
    })
    gulp.watch(['./dist/*']).on('change', browserSync.reload)
    gulp.watch(['./src/*.html', './src/*.css']).on('change', gulp.series('copy-file'))
})

const whatchifyBrowserify = watchify(browserify( // Обёртка для слежения за изменениями ts
    {
        basedir: '.',
        entries: ["./src/main.ts"], // Файл для обработки
        cache: {},
        debug: true, // Включаем отладку
        packageCache: {}
    })
    .plugin(tsify))

const bundle = () => whatchifyBrowserify
    .bundle() // объединит все модули в один файл
    .on('error', fancyLog) // Логирование при ошибках
    .pipe(source('bundle.js')) // Создасться объединенный файл bundle.js
    .pipe(gulp.dest('./dist')) // Путь к выходному файлу

gulp.task('default', gulp.series(gulp.parallel('copy-file'), bundle))
whatchifyBrowserify.on('update', bundle) // Вызов функции bundle при изменеии ts
whatchifyBrowserify.on('log', fancyLog) // Логирование