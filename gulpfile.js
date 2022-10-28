const {src, dest, watch, parallel} = require('gulp');

// CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

// Imagenes
const webp = require('gulp-webp')

// Tareas

function css(done) {
    src("src/scss/**/*.scss") // Identifica el/los archivo/s .scss a compilar
    .pipe(plumber()) // Para que no detenga ejecucion cuando hayan errores y aparezca error formateado
    .pipe(sass()) // Compila
    .pipe(dest("build/css")); // Almacena en disco duro (crea archivo css)
    done();
}

function webpTransform(done) {
    const opciones = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')
        .pipe(webp(opciones))
        .pipe(dest('build/img'));
    done();
}

function dev(done) {
    watch("src/scss/**/*.scss", css);
    done();
}

exports.css = css;
exports.webpTransform = webpTransform;
exports.dev = dev;
exports.webp_dev = parallel(webpTransform, dev);