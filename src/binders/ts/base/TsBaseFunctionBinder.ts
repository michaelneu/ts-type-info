﻿import {BaseParameterDefinition, BaseParameterDefinitionConstructor} from "./../../../definitions";
import {TsFactory} from "./../../../factories";
import {TsNode} from "./../../../compiler";
import {BaseFunctionBinder} from "./../../base";
import {TsNamedBinder} from "./TsNamedBinder";
import {TsTypeParameteredBinderByNode} from "./TsTypeParameteredBinderByNode";
import {TsParameteredBinderByNode, TsParameterBinderByNodeConstructor} from "./TsParameteredBinderByNode";
import {TsReturnTypedBinderByNode} from "./TsReturnTypedBinderByNode";

export class TsBaseFunctionBinder<ParameterType extends BaseParameterDefinition<any>> extends BaseFunctionBinder<ParameterType> {
    constructor(
        private tsFactory: TsFactory,
        private node: TsNode,
        private paramDefinition: BaseParameterDefinitionConstructor<ParameterType>,
        private paramBinder: TsParameterBinderByNodeConstructor<ParameterType>
    ) {
        super(
            new TsNamedBinder(node),
            new TsTypeParameteredBinderByNode(tsFactory, node),
            new TsParameteredBinderByNode(tsFactory, node, paramDefinition, paramBinder),
            new TsReturnTypedBinderByNode(tsFactory, node)
        );
    }
}
