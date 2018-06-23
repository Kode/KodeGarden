const gulp = require('gulp');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');

const serverProject = ts.createProject('Server/tsconfig.json');

gulp.task("compileServer", () => {
	return serverProject.src()
		.pipe(sourcemaps.init())
		.pipe(serverProject()).js
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('Server/out'));
});

gulp.task('watch', ['compileServer'], () => {
	gulp.watch(['Server/**/*.ts', 'Shared/**/*.ts'], ['compileServer']);
});
