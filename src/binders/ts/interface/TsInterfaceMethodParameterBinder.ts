﻿import {TsNode} from "./../../../compiler";
import {TsFactory} from "./../../../factories";
import {InterfaceMethodParameterBinder} from "./../../base";
import {TsBaseParameterBinder, TsNodedBinder} from "./../base";

export class TsInterfaceMethodParameterBinder extends InterfaceMethodParameterBinder {
    constructor(factory: TsFactory, node: TsNode) {
        super(
            new TsBaseParameterBinder(factory, node),
            new TsNodedBinder(factory, node)
        );
    }
}
