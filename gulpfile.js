"use strict";

const {parallel, series, src, dest, watch} = require('gulp');
const uglify = require('gulp-terser'),
	concat = require('gulp-concat'),
	javascriptObfuscator = require('gulp-javascript-obfuscator'),
	sass = require('gulp-sass')(require('sass')),
	versionNumber = require('gulp-version-number'),
	htmlmin = require('gulp-htmlmin'),
	browserSync = require('browser-sync').create(),
	replace = require('gulp-replace');


sass.compiler = require('node-sass');

const versionConfig = {
	'value': '%MDS%',
	'append': {
		'key': 'v',
		'to': ['css', 'js'],
	},
};

function compressVendorJS() {
	return src([
		'node_modules/jquery/dist/jquery.js',
		'node_modules/jquery-ui-dist/jquery-ui.js',
		'node_modules/jquery-ui-timepicker-addon/dist/jquery-ui-timepicker-addon.js',
		'node_modules/moment/moment.js',
		'node_modules/fullcalendar-scheduler/main.js',
		'node_modules/chart.js/dist/chart.js',
		'node_modules/bootstrap/dist/js/bootstrap.js',
		'node_modules/sweetalert2/dist/sweetalert2.all.js',
		'node_modules/underscore/underscore.js'
	])
		.pipe(concat('js-lib.js'))
		.pipe(replace('/*!', '/*'))
		.pipe(uglify())
		.pipe(dest('public/js/')
		);
}

function compressAppJS() {
	return src('scripts/*.js')
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(dest('public/js/')
		);
}

function obfuscateAppJS() {
	return src('scripts/*.js')
		.pipe(concat('main.js'))
		.pipe(javascriptObfuscator(
			{
				// restrictive options
				// domainLock: ['www.dda.com'],
				// debugProtection: true,
				// debugProtectionInterval: true,
				// disableConsoleOutput: true,
				// log: false,
				// selfDefending: true,
				// restrictive options //
				compact: true,
				controlFlowFlattening: true,
				controlFlowFlatteningThreshold: 1,
				deadCodeInjection: true,
				deadCodeInjectionThreshold: 1,
				identifierNamesGenerator: 'hexadecimal',
				renameGlobals: false,
				rotateStringArray: true,
				stringArray: true,
				stringArrayEncoding: 'rc4',
				stringArrayThreshold: 1,
				transformObjectKeys: true,
				unicodeEscapeSequence: false
			}
		))
		.pipe(dest('public/js/')
		);
}

function minifyCSS() {
	return src('styles/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(replace('/*!', '/*'))
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(dest('public/css/')
		);
}

// Minify HTML and version static assets
function minifyHTML() {
	return src('public/*.html')
		.pipe(htmlmin({
			collapseWhitespace: true,
			removeComments: true,
			sortAttributes: true,
			sortClassName: true
		}))
		.pipe(versionNumber(versionConfig))
		.pipe(dest('dist/'));
}

function copyStaticAssets() {
	return src([
		'public/data/**',
		'public/img/**',
		'public/php/**',
		'public/manifest.json',
		'public/service-worker.js'
	], { base: './src'})
		.pipe(dest('dist'));
}

// browserSync Static server
function browserSyncServer() {
	browserSync.init({
		server: {
			baseDir: "./dist"
		}
	});
}

exports.bsync = browserSyncServer;

exports.css = minifyCSS;
exports.js = compressAppJS;
exports.vendor = compressVendorJS;

// Configure the browserSync task and watch file path for change
exports.watch = function () {
	browserSyncServer();
	watch('styles/*.scss', {ignoreInitial: false}, series(minifyCSS, function (done) {
		// browserSync.reload();
		done();
	}));
	watch('scripts/*.js', {ignoreInitial: false}, series(compressAppJS, function (done) {
		browserSync.reload();
		done();
	}));

	watch('public/*.html', {ignoreInitial: false}, series(minifyHTML, function (done) {
		browserSync.reload();
		done();
	}));
};

exports.default = parallel(
	minifyHTML,
	minifyCSS,
	compressAppJS,
	compressVendorJS
	// copyStaticAssets
);

exports.prod = parallel(
	minifyHTML,
	minifyCSS,
	obfuscateAppJS,
	compressVendorJS
	// copyStaticAssets
);



