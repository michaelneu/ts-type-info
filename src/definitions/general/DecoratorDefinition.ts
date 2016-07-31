import {StructureFactory} from "./../../factories";
import {NamedDefinition, BaseDefinition, DefinitionType} from "./../base";
import {ExpressionDefinition} from "./../expression";

export class DecoratorDefinition extends BaseDefinition implements NamedDefinition {
    arguments: ExpressionDefinition[] = [];

    constructor() {
        super(DefinitionType.Decorator);
    }

    addArgument(text: string) {
        const def = new StructureFactory().getTypeFromText(text);
        this.arguments.push(def);
        return def;
    }

    // NamedDefinition
    name: string;
}
