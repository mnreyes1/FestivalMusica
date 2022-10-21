const {src, dest, watch} = require("gulp");
const sass = require("gulp-sass")(require("sass"));

function css(done) {
    src("src/sass/app.scss").pipe(sass()).pipe(dest("build/css"))
    done();
}

function dev(done) {
    watch("src/sass/app.scss", css);
    done();
}

exports.dev = dev;