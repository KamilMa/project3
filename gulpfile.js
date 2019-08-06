const gulp = require("gulp");
const { resolve } = require("path");
const browserSync = require("browser-sync").create();
const del = require("del");
const runSequence = require("run-sequence");
const $ = require("gulp-load-plugins")({
    lazy: true
});
const webpack = require("webpack");

gulp.task("webpack", function(cb) {

    return webpack(require("./webpack.config.js"), function(err, stats) {
        if(err) throw err;
        console.log(stats.toString());
        cb();
    });
});


gulp.task("css", function() {
    
    return gulp.src("./src/scss/main.scss")
    .pipe($.plumber())
    .pipe($.sass({
        outputStyle: "expanded"
    }))
    .pipe($.autoprefixer({
        browsers: ["last 5 version", "IE 10"]
    }))
    .pipe(gulp.dest("./dist/css/"))
    .pipe(browserSync.stream()) // wstrzyknięcie nowych styli po zmianie
});


gulp.task("server", function() {

    browserSync.init({
        server:  {
            baseDir: "dist",
            directory: true
        },
        notify: false,
        open: false
    });
});


gulp.task("reload", function() {
    browserSync.reload();
});


gulp.task("clean", function() {

    return del(["./src/dev"], {
        force: true
    });
});

gulp.task("watch", function() {

    gulp.watch("./src/scss/**/*.scss", { interval: 500 }, ["css"]);
    gulp.watch("./dist/index.html", { interval: 500 }, ["reload"]);
    gulp.watch("./src/js/**/*.js", {interval: 500}, function() {
        runSequence("clean", "webpack", "reload");
    });

});

gulp.task("default", runSequence("clean", "css", "webpack", "server", "watch"));
