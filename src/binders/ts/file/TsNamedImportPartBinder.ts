﻿import {ExportableDefinitions, ExpressionDefinition} from "./../../../definitions";
import {TsFactory} from "./../../../factories";
import {NamedImportPartBinder} from "./../../base";
import {TsBaseDefinitionBinder, TsNodedBinder} from "./../base";
import {TsNode} from "./../../../compiler";

export class TsNamedImportPartBinder extends NamedImportPartBinder {
    private defsOrExpression: {
        definitions: ExportableDefinitions[];
        expression: ExpressionDefinition | null;
    };

    constructor(private readonly factory: TsFactory, private readonly node: TsNode) {
        super(
            new TsBaseDefinitionBinder(),
            new TsNodedBinder(factory, node)
        );
        this.defsOrExpression = this.factory.getDefinitionsOrExpressionFromExportSymbol(node.getSymbol()!);
    }

    getName() {
        return this.node.getNamedImportPropertyName() || this.node.getNamedImportName() || "";
    }

    getAlias() {
        return this.node.getNamedImportPropertyName() == null ? null : this.node.getNamedImportName();
    }

    getDefinitions() {
        return this.defsOrExpression.definitions;
    }

    getExpression() {
        return this.defsOrExpression.expression;
    }
}
