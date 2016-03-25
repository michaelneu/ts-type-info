﻿import {TsFactory} from "./../../../factories";
import {TsNode, TsSymbol} from "./../../../compiler";
import {ClassPropertyBinder} from "./../../base";
import {TsBaseClassPropertyBinder} from "./base";

export class TsClassPropertyBinder extends ClassPropertyBinder {
    private symbol: TsSymbol;

    constructor(tsFactory: TsFactory, private node: TsNode) {
        super(new TsBaseClassPropertyBinder(tsFactory, node));

        this.symbol = node.getSymbol();
    }

    getIsAccessor() {
        return this.symbol.isPropertyAccessor();
    }

    getIsReadonly() {
        return this.symbol.isPropertyReadonly();
    }

    getIsConstructorParameter() {
        // this implementation will never be a constructor parameter
        return false;
    }
}