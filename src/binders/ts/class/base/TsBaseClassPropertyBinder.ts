﻿import {TsFactory} from "./../../../../factories";
import {TsNode} from "./../../../../compiler";
import {BaseClassPropertyBinder} from "./../../../base";
import {TsDecoratableBinder, TsBaseObjectPropertyBinder} from "./../../base";
import {TsScopedBinder} from "./TsScopedBinder";

export class TsBaseClassPropertyBinder extends BaseClassPropertyBinder {
    constructor(factory: TsFactory, node: TsNode) {
        super(
            new TsBaseObjectPropertyBinder(factory, node),
            new TsDecoratableBinder(factory, node),
            new TsScopedBinder(node)
        );
    }
}
