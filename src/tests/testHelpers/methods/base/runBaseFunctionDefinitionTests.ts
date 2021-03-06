import * as assert from "assert";
import {FunctionTestStructure, ParameterTestStructures} from "./../../testStructures";
import {BaseFunctionDefinitions, ParameterDefinitions} from "./../../../../definitions";
import {runUserDefinedTypeGuardTests} from "./../general";
import {runBaseDefinitionTests} from "./runBaseDefinitionTests";
import {runNamedDefinitionTests} from "./runNamedDefinitionTests";
import {runReturnTypedDefinitionTests} from "./runReturnTypedDefinitionTests";
import {runParameteredDefinitionTests} from "./runParameteredDefinitionTests";
import {runThisTypedDefinitionTests} from "./runThisTypedDefinitionTests";
import {runOverloadSignaturedDefinitionTests} from "./runOverloadSignaturedDefinitionTests";
import {runDocumentationedDefinitionTests} from "./runDocumentationedDefinitionTests";

export function runBaseFunctionDefinitionTests(
    runParameterDefinitionTests: (definition: ParameterDefinitions, structure: ParameterTestStructures) => void,
    definition: BaseFunctionDefinitions,
    structure: FunctionTestStructure
) {
    runBaseDefinitionTests(definition, structure);
    runNamedDefinitionTests(definition, structure);
    runReturnTypedDefinitionTests(definition, structure);
    runParameteredDefinitionTests(runParameterDefinitionTests, definition, structure);
    runUserDefinedTypeGuardTests(definition.userDefinedTypeGuard, structure.userDefinedTypeGuard);
    runThisTypedDefinitionTests(definition, structure);
    runOverloadSignaturedDefinitionTests(definition, structure);
    runDocumentationedDefinitionTests(definition, structure);

    it(`${structure.isGenerator ? "should" : "should not"} be a generator function`, () => {
        assert.equal(definition.isGenerator, structure.isGenerator || false);
    });
}
