﻿import {getInfoFromString} from "./../../../main";
import {runFileDefinitionTests} from "./../../testHelpers";

describe("interface extends interface tests", () => {
    const code = `
interface MyBaseInterface {
    name: string;
}

interface MyChildInterface extends MyBaseInterface {
    name2: string;
}
`;

    const def = getInfoFromString(code);

    runFileDefinitionTests(def, {
        interfaces: [{
            name: "MyBaseInterface",
            properties: [{
                name: "name",
                type: { text: "string" }
            }]
        }, {
            name: "MyChildInterface",
            extendsTypes: [{
                text: "MyBaseInterface"
            }],
            properties: [{
                name: "name2",
                type: { text: "string" }
            }]
        }]
    });
});
