const {src, dest, watch, parallel} = require('gulp');

// CSS
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

// Imagenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

// Tareas
function css(done) {
    src('src/scss/**/*.scss') // Identifica el/los archivo/s .scss a compilar
    .pipe(plumber()) // Para que no detenga ejecucion cuando hayan errores y aparezca error formateado
    .pipe(sass()) // Compila
    .pipe(dest('build/css')); // Almacena en disco duro (crea archivo css)
    done();
}

function imagenes(done) {
    const opciones = {
        optimizationLevel: 3
    }
    src('src/img/**/*.{png,jpg}')
        .pipe(cache(imagemin(opciones)))
        .pipe(dest('build/img'));
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

function avifVersion(done) {
    const opciones = {
        quality: 50
    };
    src('src/img/**/*.{png,jpg}')
        .pipe(avif(opciones))
        .pipe(dest('build/img'));
    done();
}

function dev(done) {
    watch('src/scss/**/*.scss', css);
    done();
}

exports.css = css;
exports.imagenes = imagenes
exports.webpTransform = webpTransform;
exports.avifVersion = avifVersion;
exports.dev = parallel(imagenes, webpTransform, avifVersion, dev);