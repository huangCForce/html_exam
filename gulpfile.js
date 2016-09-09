var gulp        = require('gulp');
var browserSync = require('browser-sync').create();

// 静态服务器
gulp.task('browser-sync', function() {
    var files = [
      '*.html',
      'css/*.css',
      'js/*.js'
    ];
    browserSync.init(files,{
      server: {
        baseDir: "./"
      }
    });
});

gulp.task('default', ['browser-sync']);
