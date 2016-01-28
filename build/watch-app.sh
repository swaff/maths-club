watchify \
    -x react \
    -x react-dom \
    src/main.js \
    -o dist/bundle.js \
    -t [ babelify --presets [ es2015 react ] ] \
    -v
