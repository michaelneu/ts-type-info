﻿import {TsNode} from "./../../../compiler";
import {TsFactory} from "./../../../factories";
import {DefaultExpressionedBinder} from "./../../base";

export class TsDefaultExpressionedBinder extends DefaultExpressionedBinder {
    constructor(private readonly factory: TsFactory, private readonly node: TsNode) {
        super();
    }

    getDefaultExpression() {
        const tsExpression = this.node.getDefaultExpression();
        return (tsExpression == null) ? null : this.factory.getExpression(tsExpression);
    }
}
