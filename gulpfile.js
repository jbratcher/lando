// Import packages

const gulp          = require("gulp");
const browserSync   = require("browser-sync").create();
const sass          = require("gulp-sass");

// Create tasks

// Complie Sass and inject into browser

gulp.task('sass', function() {
    return gulp.src(['src/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.stream());
});

// Move js file to src/js

gulp.task('js', function() {
    return gulp.src(['src/js/*.js'])
        .pipe(gulp.dest('src/js'))
        .pipe(browserSync.stream());
});

//Watch Sass & Server

gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: "./",
        port: 8082
    });
    
    gulp.watch(['src/scss/*.scss'], ['sass']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
});

// Move Fonts Folder to src/fonts

gulp.task("fonts", function() {
    return gulp.src("node_modules/font-awesome/fonts/*")
        .pipe(gulp.dest('src/fonts'));
});

// Move Font Awesome CSS to src/css

gulp.task("fa", function() {
    return gulp.src("node_modules/font-awesome/css/font-awesome.min.css")
        .pipe(gulp.dest('src/css'));
});

// Gulp default tasks

gulp.task('default', ['js', 'serve', 'fa', 'fonts'])


