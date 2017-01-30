var durandal = require('gulp-durandal');

var durandal = require('gulp-durandal');

gulp.task('start', function () {
    durandal({
        baseDir: 'app',   //same as default, so not really required.
        main: 'main.js',  //same as default, so not really required.
        output: 'main.js', //same as default, so not really required.
        almond: true,
        minify: true
    })
        .pipe(gulp.dest('dir/to/save/the/output'));
});

gulp.task('start-async', function (cb) {
    durandal({
    })
        .on('error', cb)
        .pipe(gulp.dest('dir/to/save/the/output'))
        .on('end', cb)
})