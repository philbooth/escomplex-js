/*globals require, exports */

'use strict';

var check, esprima, walker, escomplex;

check = require('check-types');
esprima = require('esprima');
walker = require('escomplex-ast-moz');
escomplex = require('escomplex');

exports.analyse = analyse;

function analyse (source, options) {
    if (check.array(source)) {
        return analyseSources(source, options);
    }

    return analyseSource(source, options);
}

function analyseSources (sources, options) {
    var asts = sources.map(function (source) {
        try {
            return {
                path: source.path,
                ast: getSyntaxTree(source.code)
            };
        } catch (error) {
            if (!options.ignoreErrors) {
                error.message = source.path + ': ' + error.message;
                throw error;
            }
            return null;
        }
    }).filter(function(o) { return !!o; });
    return performAnalysis(asts, options);
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

