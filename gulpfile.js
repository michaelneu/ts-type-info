var gulp = require("gulp");
var del = require("del");
var mocha = require("gulp-mocha");
var istanbul = require("gulp-istanbul");
var ts = require("gulp-typescript");
var tslint = require("gulp-tslint");
var replace = require("gulp-replace");
var sourcemaps = require("gulp-sourcemaps");
var CodeBlockWriter = require("code-block-writer").default;
var p = require("./package.json");
var fs = require("fs");
var path = require("path");

gulp.task("typescript", ["clean-scripts"], function() {
    var tsProject = ts.createProject("tsconfig.json", {
        typescript: require("typescript")
    });

    return gulp.src(["./src/typings/**/*.d.ts", "./src/**/*.ts", "!./src/tests/**/test-files/**/*.ts"])
        .pipe(sourcemaps.init())
        .pipe(ts(tsProject))
        .pipe(replace(/(}\)\()(.*\|\|.*;)/g, '$1/* istanbul ignore next */$2'))
        .pipe(replace(/(var __extends = \(this && this.__extends\))/g, '$1/* istanbul ignore next */'))
        .pipe(replace(/(if \(!exports.hasOwnProperty\(p\)\))/g, '/* istanbul ignore else */ $1'))
        // ignore empty constructors (for mixins and static classes)
        .pipe(replace(/(function [A-Za-z]+\(\) {[\s\n\t]+})/g, '/* istanbul ignore next */ $1'))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest("./dist"));
});

gulp.task("pre-test", ["typescript"], function () {
    return gulp.src(["dist/**/*.js", "!dist/tests/**/*.js", "!dist/utils/file-utils.js"])
        .pipe(istanbul())
        .pipe(istanbul.hookRequire());
});

gulp.task("test", ["pre-test"], function() {
    return gulp.src(["dist/tests/**/*.js"])
        .pipe(mocha({ reporter: "progress" }))
        .pipe(istanbul.writeReports())
        .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }));
});

gulp.task("tslint", function() {
    return gulp.src(["./src/**/*.ts", "!./src/typings/**/*.d.ts"])
        .pipe(tslint())
        .pipe(tslint.report("verbose"));
});

gulp.task("generate-definition-file", function(cb) {
    // use this library to generate the definition file
    var writer = new CodeBlockWriter({ opts: "\r\n" });
    var tsTypeInfo = require("./dist/main");
    var Scope = tsTypeInfo.Scope;
    var fileInfo = tsTypeInfo.getFileInfo(["./src/main.ts"]).filter(function(f) { return /main\.ts$/.test(f.fileName); })[0];
    var definitions = fileInfo.reExports.map(function(d) { return d.definition; });
    var interfaces = definitions.filter(function(d) { return d instanceof tsTypeInfo.InterfaceDefinition; });
    var classes = definitions.filter(function(d) { return d instanceof tsTypeInfo.ClassDefinition; });
    var functions = fileInfo.functions.filter(function(f) { return f.isExported; });
    var enums = definitions.filter(function(d) { return d instanceof tsTypeInfo.EnumDefinition; });

    writer.writeLine("// auto-generated by: gulp generate-definition-file");
    writer.write("declare module \"ts-type-info\"").block(function() {
        // todo: use ts-type-writer to do this
        interfaces.forEach(function(c) {
            var extendsClause = "";
            var typeParameterClause = "";

            if (c.typeParameters.length > 0) {
                typeParameterClause += "<";

                c.typeParameters.forEach(function(p, i) {
                    if (i != 0) {
                        typeParameterClause += ", ";
                    }

                    typeParameterClause += p.name;

                    if (p.typeExpression != null) {
                        typeParameterClause += " extends " + p.typeExpression.text;
                    }
                });

                typeParameterClause += "> ";
            }

            if (c.extendsTypeExpressions.length > 0) {
                extendsClause += " extends ";
                c.extendsTypeExpressions.forEach(function (b, i) {
                    if (i != 0) {
                        extendsClause += ", ";
                    }

                    extendsClause += b.text;

                    if (b.types[0].definition.typeParameters.length > 0) {
                        extendsClause += "<" + b.types[0].definition.typeParameters[0].constraint.text + ">";
                    }
                });
            }

            writer.write("export interface " + c.name + typeParameterClause + extendsClause).block(function() {
                c.properties.forEach(function(p) {
                    if (p.name.indexOf("fill") !== 0 && p.name !== "tsType") {
                        writer.writeLine(p.name + ": " + p.typeExpression.text + ";");
                    }
                });
            }).newLine();
        });

        classes.forEach(function(c) {
            var extendsClause = "";
            var typeParameterClause = "";

            if (c.typeParameters.length > 0) {
                typeParameterClause += "<";

                c.typeParameters.forEach(function(p, i) {
                    if (i != 0) {
                        typeParameterClause += ", ";
                    }

                    typeParameterClause += p.name;

                    if (p.typeExpression != null) {
                        typeParameterClause += " extends " + p.typeExpression.text;
                    }
                });

                typeParameterClause += "> ";
            }

            if (c.extendsTypeExpressions.length > 0) {
                extendsClause += " extends ";
                c.extendsTypeExpressions.forEach(function (b, i) {
                    if (i != 0) {
                        extendsClause += ", ";
                    }

                    extendsClause += b.text;
                });
            }

            writer.write("export class " + c.name + typeParameterClause + extendsClause).block(function() {
                c.properties.forEach(function(p) {
                    if (p.scope === Scope.public && p.name.indexOf("fill") !== 0 && p.name !== "tsType") {
                        writer.writeLine(p.name + ": " + p.typeExpression.text + ";");
                    }
                });
            }).newLine();
        });

        enums.forEach(function(enumDef) {
            writer.write("export enum " + enumDef.name).block(function() {
                enumDef.members.forEach(function(member, i) {
                    if (i != 0) {
                        writer.write(",").newLine();
                    }

                    writer.write(member.name + " = " + member.value);
                });
            }).newLine();
        });

        functions.forEach(function(func) {
            writer.write("export function " + func.name + "(");
            func.parameters.forEach(function(p, i) {
                if (i != 0) {
                    writer.write(", ");
                }

                writer.write(p.name + (p.isOptional ? "?" : "")  + ": " + p.typeExpression.text);
            });
            writer.write("): " + func.returnTypeExpression.text + ";").newLine();
        });
    });

    fs.writeFile(path.join(__dirname, "ts-type-info.d.ts"), writer.toString(), function(err) {
        if (err) throw err;
        cb();
    });
});

function pad(width, string, padding) {
    return (width <= string.length) ? string : pad(width, string + padding, padding)
}

gulp.task("generate-readme", function(cb) {
    // use this library to generate the readme.md file
    var readmeCode = fs.readFileSync(path.join(__dirname, "resources/readme-code.ts"), "utf8");
    var readmeText = fs.readFileSync(path.join(__dirname, "resources/readme.txt"), "utf8");
    var tsTypeInfo = require("./dist/main");
    var readmeInfo = tsTypeInfo.getStringInfo(readmeCode);

    console.log(readmeInfo.classes[0].staticProperties);

    readmeText = readmeText
        .replace("{{Code}}", readmeCode)
        .replace("{{CodeOutput}}", JSON.stringify(readmeInfo));

    fs.writeFile(path.join(__dirname, "readme.md"), readmeText, function(err) {
        if (err) throw err;
        cb();
    });
});

gulp.task("ensure-dir-structures-match", function() {
    var FileUtils = require("./dist/utils/file-utils").FileUtils;
    var definitionDir = __dirname + "/src/definitions";
    var definitionFileNames = FileUtils.getAllFileNamesFromFolder(definitionDir).map(function(f) {
        return f.replace(definitionDir, "");
    });
    var testHelperDir = __dirname + "/src/tests/test-helpers";
    var testHelperFileNames = FileUtils.getAllFileNamesFromFolder(testHelperDir).map(function(f) {
        return f.replace(testHelperDir, "").replace("run-", "").replace("-tests", "");
    });

    var onlyInDefinitionFileNames = definitionFileNames.filter(function(f) {
        return testHelperFileNames.indexOf(f) === -1;
    });
    var onlyInTestHelperFileNames = testHelperFileNames.filter(function(f) {
        return definitionFileNames.indexOf(f) === -1;
    });

    if (onlyInDefinitionFileNames.length > 0) {
        console.log("Add these to test helpers (with run- prefix and -tests suffix):");
        console.log(onlyInDefinitionFileNames);
    }
    if (onlyInTestHelperFileNames.length > 0) {
        console.log("Add these to definitions or fix test-helpers:");
        console.log(onlyInTestHelperFileNames);
    }
})

gulp.task("watch", function() {
    gulp.watch("./src/**/*.ts", ["tslint", "typescript"]);
});

gulp.task("clean-scripts", function(cb) {
    return del(["./dist/**/*{.js,.js.map}"], cb);
});

gulp.task("default", ["tslint", "typescript"]);
