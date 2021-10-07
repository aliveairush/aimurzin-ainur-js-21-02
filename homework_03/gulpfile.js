const gulp = require('gulp')
const less = require('gulp-less')

const browserSync = require("browser-sync").create();

const postcss = require('gulp-postcss');
const cssnano = require('cssnano');

/** less Таска
 * 1) Находит все файлы less.
 * 2) Прохоняет их через less
 * 3) Сохраняет результат в css папке
 * */
gulp.task('less', function (done){
    gulp.src('./less/index.less')
        .pipe(less())
        .pipe(gulp.dest('./css/'))
    done()
})

/** less:watch Таска
 * Следит за любыми изменениями над файлами,
 * в случае изменения вызывается таска less */
gulp.task('less:watch', function (){
    gulp.watch("./less/**/*.less", gulp.series("less"))
})


/**  serve Таска*/
gulp.task("serve", function (){
    browserSync.init({
        server: {
            baseDir: "./"
        },
        port: 3000
    })
    gulp.watch("./**/*").on("change", browserSync.reload)
})


gulp.task('default', gulp.parallel('less:watch', 'serve'))

gulp.task('build', function (done){
    gulp.src("./css/*.css")
        .pipe(postcss([cssnano]))
        .pipe(gulp.dest("./build/css/"));
    gulp.src("./index.html")
        .pipe(gulp.dest("./build/"));
    done();
})