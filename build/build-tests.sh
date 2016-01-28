browserify \
    -x react \
    -x react-dom \
    test/main.js \
    -t [ babelify --presets [ es2015 react ] ] \
    > test/bundle.js
