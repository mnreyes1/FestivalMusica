const {src, dest, watch} = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const plumber = require('gulp-plumber');

function css(done) {
    src("src/scss/**/*.scss") // Identifica el/los archivo/s .scss a compilar
    .pipe(plumber()) // Para que no detenga ejecucion cuando hayan errores y aparezca error formateado
    .pipe(sass()) // Compila
    .pipe(dest("build/css")); // Almacena en disco duro (crea archivo css)
    done();
}

function dev(done) {
    watch("src/scss/**/*.scss", css);
    done();
}

exports.dev = dev;