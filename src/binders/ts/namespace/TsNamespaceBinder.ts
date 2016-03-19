import {TsFactory} from "./../../../factories";
import {TsNode} from "./../../../compiler";
import {NamespaceBinder} from "./../../base";
import {TsNamedBinder, TsExportableBinder, TsAmbientableBinder, TsModuledBinder} from "./../base";

export class TsNamespaceBinder extends NamespaceBinder {
    constructor(tsFactory: TsFactory, private node: TsNode) {
        super(
            new TsNamedBinder(node),
            new TsExportableBinder(node),
            new TsAmbientableBinder(node),
            new TsModuledBinder(tsFactory, node)
        );
    }

    getNamespaceDeclarationType() {
        return this.node.getNamespaceDeclarationType();
    }
}
