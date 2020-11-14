const gulp = require("gulp"); //引入gulp
const sass = require("gulp-sass"); //引入gulp-sass
const connect = require("gulp-connect"); //引入gulp-connect(搭建本地服务)
const sourcemaps = require("gulp-sourcemaps"); //
const babel = require("gulp-babel") //高版本ES转ES5
    //Html
gulp.task("html", done => {
    gulp.src("*.html") //获取所有的html
        .pipe(gulp.dest("dist")) //将获取的Html拷贝到dist文件夹中
        .pipe(connect.reload()); //搭建本地服务
    done();
});
/* css */
gulp.task("css", done => {
    gulp.src("css/*.css") //获取所有的html
        .pipe(gulp.dest("dist/css")) //将获取的Html拷贝到dist文件夹中
        .pipe(connect.reload()); //搭建本地服务
    done();
});
gulp.task("font", done => {
    gulp.src("font/*") //获取所有的html
        .pipe(gulp.dest("dist/font")) //将获取的Html拷贝到dist文件夹中
        .pipe(connect.reload()); //搭建本地服务
    done();
});
//sass
gulp.task("sass", done => {
    gulp.src("sass/*.scss") //获取sass文件夹中所有的.scss文件
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed' //编译排版格式(压缩)
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("dist/css")) //将获取到的文件拷贝到dist文件里的css文件夹中（没有的话自动生成）
        .pipe(connect.reload()); //搭建本地服务
    done();
});
//js
gulp.task("babel", done => {
    gulp.src("js/*.js")
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(gulp.dest("dist/js"))
        .pipe(connect.reload());
    done()
});
//img
gulp.task("img", done => {
        gulp.src("img/*.{jpg,png,webp,gif}")
            .pipe(gulp.dest("dist/img"))
            .pipe(connect.reload());
        done()
    })
    //创建本地服务
gulp.task("server", done => {
    connect.server({
        root: "dist", //根目录
        livereload: true //自动同步
    })
    done();
});
//创建监听
gulp.task("watch", done => {
    gulp.watch("*.html", gulp.series("html"));
    gulp.watch("sass/*.scss", gulp.series("sass"));
    gulp.watch("js/*.js", gulp.series("babel"));
    gulp.watch("img/*..{jpg,png}", gulp.series("img"));
    gulp.watch("css/*.css", gulp.series("css"));
    gulp.watch("font/*", gulp.series("font"));
    done();
});
gulp.task("build", gulp.parallel("html", "sass", "babel", "img", "font", "css"));
gulp.task("default", gulp.series("build", "server", "watch"));