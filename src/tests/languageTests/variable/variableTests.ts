﻿import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";
import {VariableDeclarationType} from "./../../../definitions";

describe("variable tests", () => {
    const code = `
/**
 * Some description
 */
var myImplicitAny;
var myExplicitTypeVar: number;
var myImplicitTypeVar = "my string";
let myLet: string;
const myConst: number;
`;

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        variables: [{
            name: "myImplicitAny",
            declarationType: VariableDeclarationType.Var,
            type: { text: "any" },
            documentationComment: `/**\n * Some description\n */`
        }, {
            name: "myExplicitTypeVar",
            declarationType: VariableDeclarationType.Var,
            type: { text: "number" }
        }, {
            name: "myImplicitTypeVar",
            declarationType: VariableDeclarationType.Var,
            type: { text: "string" },
            defaultExpression: { text: `"my string"` }
        }, {
            name: "myLet",
            declarationType: VariableDeclarationType.Let,
            type: { text: "string" }
        }, {
            name: "myConst",
            declarationType: VariableDeclarationType.Const,
            type: { text: "number" }
        }]
    });
});
