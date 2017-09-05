const gulp = require('gulp');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');

const clientProject = ts.createProject('Client/tsconfig.json');
const serverProject = ts.createProject('Server/tsconfig.json');

gulp.task("compileClient", () => {
	return clientProject.src()
		.pipe(sourcemaps.init())
		.pipe(clientProject()).js
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('Client/out'));
});

gulp.task("compileServer", () => {
	return serverProject.src()
		.pipe(sourcemaps.init())
		.pipe(serverProject()).js
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('Server/out'));
});

gulp.task('watch', ['compileClient', 'compileServer'], () => {
	gulp.watch(['Client/**/*.ts', 'Client/**/*.tsx', 'Shared/**/*.ts'], ['compileClient']);
	gulp.watch(['Server/**/*.ts', 'Shared/**/*.ts'], ['compileServer']);
});
