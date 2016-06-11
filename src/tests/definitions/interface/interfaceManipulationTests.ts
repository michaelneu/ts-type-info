﻿import * as assert from "assert";
import {InterfaceDefinition} from "./../../../definitions";
import * as testHelpers from "./../../testHelpers";

describe("InterfaceDefinition", () => {
    describe("#addCallSignature()", () => {
        const i = new InterfaceDefinition();
        const returnedDef = i.addCallSignature({
            returnType: "string",
            parameters: [{ name: "myParam" }],
            typeParameters: [{ name: "T" }]
        });
        i.addCallSignature({
            returnType: "number"
        });

        it("the returned definition should be in the array", () => {
            assert.equal(returnedDef, i.callSignatures[0]);
        });

        testHelpers.runCallSignatureDefinitionTests(i.callSignatures[0], {
            returnType: { text: "string" },
            parameters: [{ name: "myParam" }],
            typeParameters: [{ name: "T" }],
            minArgumentCount: 1
        });

        testHelpers.runCallSignatureDefinitionTests(i.callSignatures[1], {
            returnType: { text: "number" }
        });
    });

    describe("#addExtends()", () => {
        const i = new InterfaceDefinition();
        const returnedDef = i.addExtends("test");
        i.addExtends("test2");

        it("the returned definition should be in the array", () => {
            assert.equal(returnedDef, i.extendsTypes[0]);
        });

        it("should have two extends expressions", () => {
            assert.equal(i.extendsTypes.length, 2);
        });

        it("should have a test expression", () => {
            assert.equal(i.extendsTypes[0].text, "test");
        });
    });

    describe("#addIndexSignature()", () => {
        const i = new InterfaceDefinition();
        const returnedDef = i.addIndexSignature({
            keyName: "num",
            keyType: "number",
            returnType: "Date"
        });
        i.addIndexSignature({
            keyName: "str",
            returnType: "number"
        });

        it("the returned definition should be in the array", () => {
            assert.equal(returnedDef, i.indexSignatures[0]);
        });

        testHelpers.runIndexSignatureDefinitionTests(i.indexSignatures[0], {
            keyName: "num",
            keyType: { text: "number" },
            returnType: { text: "Date" }
        });

        testHelpers.runIndexSignatureDefinitionTests(i.indexSignatures[1], {
            keyName: "str",
            keyType: { text: "string" }, // defaults to string
            returnType: { text: "number" }
        });
    });

    describe("#addMethod()", () => {
        const i = new InterfaceDefinition();
        const returnedDef = i.addMethod({
            name: "myMethod1",
            typeParameters: [{ name: "T" }],
            returnType: "string",
            parameters: [{ name: "myParam" }]
        });
        i.addMethod({
            name: "myMethod2"
        });

        it("the returned definition should be in the array", () => {
            assert.equal(returnedDef, i.methods[0]);
        });

        testHelpers.runInterfaceMethodDefinitionTests(i.methods[0], {
            name: "myMethod1",
            typeParameters: [{ name: "T" }],
            returnType: { text: "string" },
            parameters: [{ name: "myParam" }]
        });

        testHelpers.runInterfaceMethodDefinitionTests(i.methods[1], {
            name: "myMethod2"
        });
    });

    describe("#addProperty()", () => {
        const i = new InterfaceDefinition();
        const returnedDef = i.addProperty({
            isOptional: true,
            name: "myProperty1",
            type: "string"
        });
        i.addProperty({
            name: "myProperty2"
        });

        it("the returned definition should be in the array", () => {
            assert.equal(returnedDef, i.properties[0]);
        });

        testHelpers.runInterfacePropertyDefinitionTests(i.properties[0], {
            isOptional: true,
            name: "myProperty1",
            type: { text: "string" }
        });

        testHelpers.runInterfacePropertyDefinitionTests(i.properties[1], {
            name: "myProperty2"
        });
    });

    describe("#addNewSignature()", () => {
        const i = new InterfaceDefinition();
        const returnedDef = i.addNewSignature({
            returnType: "string",
            parameters: [{ name: "myParam" }],
            typeParameters: [{ name: "T" }]
        });
        i.addNewSignature({
            returnType: "number"
        });

        it("the returned definition should be in the array", () => {
            assert.equal(returnedDef, i.newSignatures[0]);
        });

        testHelpers.runCallSignatureDefinitionTests(i.newSignatures[0], {
            returnType: { text: "string" },
            parameters: [{ name: "myParam" }],
            typeParameters: [{ name: "T" }],
            minArgumentCount: 1
        });

        testHelpers.runCallSignatureDefinitionTests(i.newSignatures[1], {
            returnType: { text: "number" }
        });
    });
});
