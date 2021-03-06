import {BasePropertyTestStructure} from "./../../testStructures";
import {BasePropertyDefinition} from "./../../../../definitions";
import {runBaseDefinitionTests} from "./runBaseDefinitionTests";
import {runNamedDefinitionTests} from "./runNamedDefinitionTests";
import {runOptionalDefinitionTests} from "./runOptionalDefinitionTests";
import {runTypedDefinitionTests} from "./runTypedDefinitionTests";
import {runReadonlyableDefinitionTests} from "./runReadonlyableDefinitionTests";

export function runBasePropertyDefinitionTests(definition: BasePropertyDefinition, structure: BasePropertyTestStructure) {
    runBaseDefinitionTests(definition, structure);
    runNamedDefinitionTests(definition, structure);
    runOptionalDefinitionTests(definition, structure);
    runTypedDefinitionTests(definition, structure);
    runReadonlyableDefinitionTests(definition, structure);
}
