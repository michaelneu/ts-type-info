import {applyMixins} from "./../../utils";
import {DefinitionType, AbstractableDefinition} from "./../base";
import {BaseClassMethodDefinition} from "./base";
import {ClassMethodParameterDefinition} from "./ClassMethodParameterDefinition";

export class ClassMethodDefinition extends BaseClassMethodDefinition<ClassMethodParameterDefinition> implements AbstractableDefinition {
    constructor() {
        super(DefinitionType.ClassMethod);
    }

    // AbstractableDefinition
    isAbstract: boolean;
}

applyMixins(ClassMethodDefinition, BaseClassMethodDefinition, [AbstractableDefinition]);