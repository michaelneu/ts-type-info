import {applyMixins} from "./../../../utils";
import {DecoratableDefinition, DefinitionType, ObjectPropertyDefinition} from "./../../base";
import {DecoratorDefinition} from "./../../general";
import {Scope} from "./../Scope";
import {ClassDefinition} from "./../ClassDefinition";
import {ScopedDefinition} from "./ScopedDefinition";

export class BaseClassPropertyDefinition extends ObjectPropertyDefinition<ClassDefinition> implements DecoratableDefinition, ScopedDefinition {
    constructor(definitionType: DefinitionType) {
        super(definitionType);
    }

    // DecoratableDefinition
    decorators: DecoratorDefinition[];
    // ScopeDefinition
    scope: Scope;
}

applyMixins(BaseClassPropertyDefinition, ObjectPropertyDefinition, [DecoratableDefinition, ScopedDefinition]);