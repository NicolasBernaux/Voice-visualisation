var gulp         = require( 'gulp' ),
    gulp_stylus  = require( 'gulp-stylus' ),
    gulp_plumber = require( 'gulp-plumber' );
const autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify'),
    notify       = require('gulp-notify')

gulp.task( 'css', function()
          {
    return gulp.src( './src/gulp/stylus/main.styl' )
        .pipe(gulp_plumber({errorHandler: notify.onError("STYLUS Error: <%= error.message %>")}))
        .pipe( gulp_stylus( { compress: true } ) )
        .pipe( gulp.dest( './src/gulp/prefixer/' ) );
} );

gulp.task('prefixer', function()
          {
    gulp.src('./src/gulp/prefixer/main.css')
        .pipe(autoprefixer({
        browsers: ['last 5 versions'],
        cascade: false
    }))
        .pipe(gulp.dest('./src/css/'))
} );

gulp.task('js', function() {
    return gulp.src('./src/gulp/js/script.js')
        .pipe(gulp_plumber({errorHandler: notify.onError("JS Error: <%= error.message %>")}))
        .pipe( uglify() )   // Minify them
        .pipe( gulp.dest( './src/js/' ) );      // Put it in folder
});

gulp.task( 'watch', function()
          {
    gulp.watch( './src/gulp/stylus/**', [ 'css' ] );
    gulp.watch( './src/gulp/prefixer/**', ['prefixer'] ); 
    gulp.watch( './src/gulp/js/**', ['js'] );
} );

gulp.task( 'default', [ 'css', 'prefixer', 'js', 'watch' ] );