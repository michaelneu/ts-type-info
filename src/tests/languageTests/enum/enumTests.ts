﻿import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("enum tests", () => {
    const code = `
enum MyEnum {
    MyImplicit,
    MyExplicit = 7
}

export enum MyExportedEnum {
}

const enum MyConstEnum {
}`;

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        enums: [{
            name: "MyEnum",
            members: [{
                name: "MyImplicit",
                value: 0
            }, {
                name: "MyExplicit",
                value: 7
            }]
        }, {
            name: "MyExportedEnum",
            isExported: true,
            isNamedExportOfFile: true
        }, {
            name: "MyConstEnum",
            isConst: true
        }],
        exports: [{
            name: "MyExportedEnum"
        }]
    });
});
