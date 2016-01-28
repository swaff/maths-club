browserify \
    -x react \
    -x react-dom \
    src/main.js \
    -t [ babelify --presets [ es2015 react ] ] \
    > dist/bundle.js
