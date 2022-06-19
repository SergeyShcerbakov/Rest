const gulp = require('gulp');

function rebase(){
    gulp.src('app/*.html')
    .pipe(gulp.dest('dist'));
}

exports.rebase = rebase;