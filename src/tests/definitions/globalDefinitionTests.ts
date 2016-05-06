﻿import * as assert from "assert";
import {createVariable} from "./../../createFunctions";
import {GlobalDefinition} from "./../../definitions";

describe("GlobalDefinition", () => {
    describe("#addFiles()", () => {
        const def = new GlobalDefinition();
        def.addFiles({ fileName: "test.ts" }, { fileName: "test2.ts" });

        // good enough to just check the number of files is correct...
        // this is tested more thoroughly in the createFile tests
        it("should have the right number of files", () => {
            assert.equal(def.files.length, 2);
        });
    });

    describe("#getFile()", () => {
        const def = new GlobalDefinition();
        def.addFiles({ fileName: "test.ts" }, { fileName: "test2.ts" });

        it("should get the correct file when specifying a file name", () => {
            assert.equal(def.getFile("test2.ts"), def.files[1]);
        });

        it("should get the correct file when specifying a function", () => {
            assert.equal(def.getFile(f => f.fileName === "test2.ts"), def.files[1]);
        });
    });

    describe("#getPathToDefinition()", () => {
        const def = new GlobalDefinition();
        def.addFiles({
        }, {
            namespaces: [{
                name: "n1"
            }, {
                name: "n2",
                namespaces: [{
                    name: "n3",
                    variables: [{ name: "v1" }, { name: "v2" }]
                }]
            }]
        }, {
            variables: [{ name: "v" }]
        });

        describe("getting the path to a variable in a file", () => {
            const path = def.getPathToDefinition(def.files[2].variables[0]);

            it("should have the correct file", () => {
                assert.equal(path.file, def.files[2]);
            });

            it("the array should have the correct namespace length", () => {
                assert.equal(path.namespaces.length, 0);
            });
        });

        describe("getting the path to a variable in a file within a namespace", () => {
            const path = def.getPathToDefinition(def.files[1].namespaces[1].namespaces[0].variables[1]);

            it("should have the correct file", () => {
                assert.equal(path.file, def.files[1]);
            });

            it("the array should have the correct namespace length", () => {
                assert.equal(path.namespaces.length, 2);
            });

            it("should have the first namespace as the first item in the array", () => {
                assert.equal(path.namespaces[0], def.files[1].namespaces[1]);
            });

            it("should have the second namespace as the second item in the array", () => {
                assert.equal(path.namespaces[1], def.files[1].namespaces[1].namespaces[0]);
            });
        });

        describe("getting the path to a variable not in any file", () => {
            const path = def.getPathToDefinition(createVariable({ name: "v" }));

            it("path should be null", () => {
                assert.equal(path, null);
            });
        });
    });
});
