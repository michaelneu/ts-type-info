import {applyMixins} from "./../../../utils";
import {DecoratorDefinition} from "./../../general";
import {DecoratableDefinition, DefinitionType, BaseParameterDefinition} from "./../../base";
import {Scope} from "./../Scope";
import {ScopedDefinition} from "./ScopedDefinition";

export class BaseClassMethodParameterDefinition<ParentType> extends BaseParameterDefinition<ParentType> implements DecoratableDefinition, ScopedDefinition {
    constructor(definitionType: DefinitionType) {
        super(definitionType);
    }

    // DecoratableDefinition
    decorators: DecoratorDefinition[];
    // ScopedDefinition
    scope: Scope;
}

applyMixins(BaseClassMethodParameterDefinition, BaseParameterDefinition, [DecoratableDefinition]);