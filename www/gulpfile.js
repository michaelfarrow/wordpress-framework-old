var gulp = require('gulp'),
    copy = require('gulp-copy'),
    minify = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    compass = require('gulp-compass'),
    requirejs = require('gulp-requirejs-optimize'),
    modernizr = require('gulp-modulizr');

gulp.task('copy-requirejs', function() {
	return gulp.src(path.bower('requirejs/require.js').s())
		.pipe(gulp.dest(path.js().vendor().s()))
		.pipe(uglify())
		.pipe(gulp.dest(path.js().vendor().minified().s()));
});

gulp.task('copy-bootstrap-fonts', function() {
	return gulp.src(path.bower('bootstrap-sass-official/assets/fonts/bootstrap/*').s())
		.pipe(gulp.dest(path.fonts().vendor().append('bootstrap').s()));
});

gulp.task('compile-compass', function() {
	return gulp.src(path.sass().append('*.scss').s())
		.pipe(compass({
			css: path.css().s(),
			sass: path.sass().s(),
			image: path.images().s()
		}))
		.pipe(minify())
		.pipe(gulp.dest(path.css().minified().s()))
});

gulp.task('custom-modernizr', function() {
	return gulp.src(path.bower('modernizr/modernizr.js').s())
		.pipe(modernizr([
			'cssclasses',
			'rgba',
			'svg',
			'boxshadow',
			'backgroundsize',
		]))
		.pipe(gulp.dest(path.js().vendor().s()))
		.pipe(uglify())
		.pipe(gulp.dest(path.js().vendor().minified().s()));
});


gulp.task('default', [
	'copy-requirejs',
	'copy-bootstrap-fonts',
	'compile-compass',
	'custom-modernizr'
]);


function path(p, f){
	if(f) f = '/' + f;
	this.path = p + path.format(f);
};

path.theme = function() {
	return new path('public/app/themes/roots');
};

path.assets = function() {
	return path.theme().append('assets');
};

path.bower = function(p) {
	return path.theme().append('libs').append(p);
};

path.sass = function() {
	return path.assets().append('sass');
};

path.css = function() {
	return path.assets().append('css');
};

path.images = function() {
	return path.assets().append('images');
};

path.fonts = function() {
	return path.assets().append('fonts');
};

path.js = function() {
	return path.assets().append('js');
};

path.format = function(p) {
	if(!p) return '';
	return p;
},

path.prototype = {

	path: '',

	toString: function(){
		return this.path;
	},

	s: function(){
		return this.toString();
	},

	append: function(p) {
		return new path(this.path, p);
	},

	compiled: function() {
		return this.append('.compiled');
	},

	minified: function() {
		return this.append('.minified');
	},

	vendor: function() {
		return this.append('vendor');
	}

}
