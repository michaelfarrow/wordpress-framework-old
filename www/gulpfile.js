var gulp      = require('gulp'),
    copy      = require('gulp-copy'),
    size      = require('gulp-size'),
    minify    = require('gulp-minify-css'),
    uglify    = require('gulp-uglify'),
    jshint    = require('gulp-jshint'),
    jshint_s  = require('jshint-stylish'),
    compass   = require('gulp-compass'),
    requirejs = require('gulp-requirejs-optimize'),
    modernizr = require('gulp-modulizr');

gulp.task('copy-requirejs', function() {
	return gulp.src(path.bower('requirejs/require.js').s())
		.pipe(gulp.dest(path.js().vendor().s()))
		.pipe(size({ title:'Original', showFiles:true }))
		.pipe(uglify())
		.pipe(gulp.dest(path.js().vendor().minified().s()))
		.pipe(size({ title:'Optimized', showFiles:true, gzip:true }))
});

gulp.task('copy-bootstrap-fonts', function() {
	result = gulp.src(path.bower('bootstrap-sass-official/assets/fonts/bootstrap/*').s())
		.pipe(gulp.dest(path.fonts().vendor().append('bootstrap').s()))
		.pipe(size({ title:'Bootstrap Fonts', gzip:true }));
});

gulp.task('compile-compass', function() {
	return gulp.src(path.sass().append('*.scss').s())
		.pipe(compass({
			css: path.css().s(),
			sass: path.sass().s(),
			image: path.images().s()
		}))
		.pipe(minify())
		.pipe(gulp.dest(path.css().minified().s()));
});

gulp.task('custom-modernizr', function() {
	var sizeOptions = {
		showFiles: true,
	}

	return gulp.src(path.bower('modernizr/modernizr.js').s())
		.pipe(size({ title:'Original', showFiles:true }))
		.pipe(modernizr([
			'cssclasses',
			'rgba',
			'svg',
			'boxshadow',
			'backgroundsize',
		]))
		.pipe(gulp.dest(path.js().vendor().s()))
		.pipe(uglify())
		.pipe(gulp.dest(path.js().vendor().minified().s()))
		.pipe(size({ title:'Optimized', showFiles:true, gzip:true }));
});

gulp.task('lint-js', function() {
	return gulp.src(path.js().append('*.js').s())
		.pipe(jshint())
		.pipe(jshint.reporter(jshint_s))
		.pipe(jshint.reporter('fail'));
});

gulp.task('compile-js', function () {
	return gulp.src(path.js().append('main.js').s())
		.pipe(requirejs({
			optimize: 'none',
			findNestedDependencies: true,
			baseUrl: path.theme().s(),
			mainConfigFile: path.js().append('config.js').s(),
			name: 'assets/js/main',
		}))
		.pipe(gulp.dest(path.js().compiled().s()))
		.pipe(size({ title:'Original', showFiles:true }))
		.pipe(uglify())
		.pipe(gulp.dest(path.js().minified().s()))
		.pipe(size({ title:'Optimized', showFiles:true, gzip:true }));
});

gulp.task('default', [
	'copy-requirejs',
	'copy-bootstrap-fonts',
	'custom-modernizr',
	'compile-compass',
	'lint-js',
	'compile-js'
]);

gulp.task('watch', function() {
	gulp.watch(path.sass().append('*.scss').s(), ['compile-compass']);
	gulp.watch(path.js().append('*.js').s(), ['lint-js']);
});


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
