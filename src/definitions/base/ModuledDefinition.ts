﻿import {ExportableDefinitions} from "./../../definitions";
import {StructureFactory} from "./../../factories";
import {EnumStructure, FunctionStructure, InterfaceStructure, TypeAliasStructure, VariableStructure} from "./../../structures";
import {EnumDefinition} from "./../enum";
import {ClassDefinition} from "./../class";
import {FunctionDefinition} from "./../function";
import {InterfaceDefinition} from "./../interface";
import {NamespaceDefinition} from "./../namespace";
import {VariableDefinition} from "./../variable";
import {TypeAliasDefinition} from "./../general";

export abstract class ModuledDefinition {
    namespaces: NamespaceDefinition[] = [];
    classes: ClassDefinition[] = [];
    interfaces: InterfaceDefinition[] = [];
    enums: EnumDefinition[] = [];
    functions: FunctionDefinition[] = [];
    variables: VariableDefinition[] = [];
    typeAliases: TypeAliasDefinition[] = [];

    addEnums(...enums: EnumStructure[]) {
        const factory = new StructureFactory();
        this.enums.push(...enums.map(e => factory.getEnum(e)));
        return this;
    }

    addFunctions(...functions: FunctionStructure[]) {
        const factory = new StructureFactory();
        this.functions.push(...functions.map(e => factory.getFunction(e)));
        return this;
    }

    addInterfaces(...interfaces: InterfaceStructure[]) {
        const factory = new StructureFactory();
        this.interfaces.push(...interfaces.map(i => factory.getInterface(i)));
        return this;
    }

    addTypeAliases(...typeAliases: TypeAliasStructure[]) {
        const factory = new StructureFactory();
        this.typeAliases.push(...typeAliases.map(t => factory.getTypeAlias(t)));
        return this;
    }

    addVariables(...variables: VariableStructure[]) {
        const factory = new StructureFactory();
        this.variables.push(...variables.map(t => factory.getVariable(t)));
        return this;
    }

    getExports() {
        const exports: ExportableDefinitions[] = [];
        const addExportedToExports = (e: ExportableDefinitions) => {
            if (e.isExported && !e.isDefaultExportOfFile) {
                exports.push(e);
            }
        };

        this.namespaces.forEach(addExportedToExports);
        this.classes.forEach(addExportedToExports);
        this.interfaces.forEach(addExportedToExports);
        this.enums.forEach(addExportedToExports);
        this.functions.forEach(addExportedToExports);
        this.variables.forEach(addExportedToExports);
        this.typeAliases.forEach(addExportedToExports);

        return exports;
    }
}
