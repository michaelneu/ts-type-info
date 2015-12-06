var ts = require("typescript");
var definitions_1 = require("./definitions");
var path = require("path");
var tmp = require("tmp");
var fs = require("fs");
var utils_1 = require("./utils");
function getFileInfo(fileNames) {
    var options = { noLib: false, experimentalDecorators: true };
    var host = ts.createCompilerHost(options);
    var program = ts.createProgram(fileNames, options, host);
    var tsTypeChecker = program.getTypeChecker();
    return program.getSourceFiles()
        .filter(function (file) { return path.basename(file.fileName) !== "lib.d.ts"; })
        .map(function (file) {
        var typeChecker = new utils_1.TypeChecker(tsTypeChecker, file);
        var definitionCache = new utils_1.ClassDefinitionCache(typeChecker);
        return new definitions_1.FileDefinition(typeChecker, definitionCache, file);
    });
}
exports.getFileInfo = getFileInfo;
function getStringInfo(code) {
    var tmpFile = tmp.fileSync({ postfix: ".ts" });
    var fileDefinition;
    try {
        code = utils_1.StringUtils.ensureEndsWithNewline(code);
        fs.writeFileSync(tmpFile.name, code);
        fileDefinition = getFileInfo([tmpFile.name])[0];
    }
    finally {
        tmpFile.removeCallback();
    }
    return fileDefinition;
}
exports.getStringInfo = getStringInfo;

//# sourceMappingURL=main.js.map
