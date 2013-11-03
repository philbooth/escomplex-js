'use strict';

var check, esprima, walker, escomplex;

check = require('check-types');
esprima = require('esprima');
walker = require('escomplex-ast-moz');
escomplex = require('escomplex');

exports.analyse = analyse;

function analyse (source, options) {
    if (check.isArray(source)) {
        return analyseSources(source, options);
    }

    return analyseSource(source, options);
}

function analyseSources (sources, options) {
    return performAnalysis(sources.map(function (source) {
        return {
            path: source.path,
            ast: getSyntaxTree(source.code)
        };
    }), options);
}

function getSyntaxTree (source) {
    return esprima.parse(source, { loc: true });
}

function performAnalysis (ast, options) {
    return escomplex.analyse(ast, walker, options);
}

function analyseSource (source, options) {
    return performAnalysis(getSyntaxTree(source), options);
}

