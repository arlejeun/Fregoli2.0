const gulp = require('gulp')
	, concat = require('gulp-concat')
	, sass = require('gulp-sass')
	, cleanCSS = require('gulp-clean-css')
    , Q = require('q')
    , convertNewline = require('gulp-convert-newline')
    , generateColors = require('./generate-variables')

const verticalsList = ['default', 'insurance', 'SmartPowerNow']

function getVerticalDir(name) {
	return '../verticals/' + name;
}

gulp.task('generate-colors', () => {
	return Q.all(verticalsList.map(name => {
		var defer = Q.defer()

		gulp.src([getVerticalDir(name) + '/fregoli.cfg'])
			.pipe(generateColors())
			.pipe(gulp.dest(getVerticalDir(name) + '/scss/'))
			.on('end', () => {
				defer.resolve();
			})
		
		return defer.promise
	}))
})

gulp.task('sass', ['generate-colors'], () => {
	return Q.all(verticalsList.map(name => {
		var defer = Q.defer()

		gulp.src([getVerticalDir('shared') + '/*.scss', getVerticalDir(name) + '/scss/*.scss'])
			.pipe(concat('styles.css'))
			.pipe(sass().on('error', sass.logError))
			.pipe(gulp.dest(getVerticalDir(name)))
			.on('end', () => {
				defer.resolve();
			})
		
		return defer.promise
	}))
})

gulp.task('minify-css', ['sass'], () => {
	return Q.all(verticalsList.map(name => {
		var defer = Q.defer()

		gulp.src([getVerticalDir(name) + '/styles.css'])
//			.pipe(cleanCSS())
			.pipe(convertNewline({
				newline: 'crlf'
			}))
			.pipe(gulp.dest(getVerticalDir(name)))
			.on('end', () => {
				defer.resolve();
			})

		return defer.promise
	}))
})

gulp.task('default', ['minify-css'], () => {})
