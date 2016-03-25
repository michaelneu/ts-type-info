import CodeBlockWriter from "code-block-writer";
import {ParentedDefinition, BaseDefinition, DefinitionType, ParameteredDefinition} from "./../base";
import {applyMixins} from "./../../utils";
import {ClassConstructorParameterDefinition} from "./ClassConstructorParameterDefinition";
import {ClassDefinition} from "./ClassDefinition";

export class ClassConstructorDefinition
        extends BaseDefinition
        implements ParentedDefinition<ClassDefinition>, ParameteredDefinition<ClassConstructorParameterDefinition> {
    onWriteFunctionBody: (writer: CodeBlockWriter) => void;

    constructor() {
        super(DefinitionType.ClassConstructor);
    }

    // IParentedDefinition
    parent: ClassDefinition;
    // ParameteredDefinition
    parameters: ClassConstructorParameterDefinition[];
}

applyMixins(ClassConstructorDefinition, BaseDefinition, [ParameteredDefinition]);