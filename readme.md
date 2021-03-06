﻿TSTypeInfo
==========

[![npm version](https://badge.fury.io/js/ts-type-info.svg)](https://badge.fury.io/js/ts-type-info) [![Build Status](https://travis-ci.org/dsherret/ts-type-info.svg?branch=master)](https://travis-ci.org/dsherret/ts-type-info?branch=master)
[![Coverage Status](https://coveralls.io/repos/dsherret/ts-type-info/badge.svg?branch=master&service=github)](https://coveralls.io/github/dsherret/ts-type-info?branch=master)

Simple TypeScript AST and code generator.

Uses the [TypeScript Compiler API](https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API) to get information about TypeScript code in an easy to use format.

* [Version 6.2 information](https://github.com/dsherret/ts-type-info/wiki/What%27s-New)

```
npm install ts-type-info --save-dev
```

## AST

```typescript
// V:\TestFile.ts
﻿
export class MyClass {
    myStringProperty: string;
    readonly myNumberProperty = 253;

    myMethod(myParameter: string) {
        return `Test: ${myParameter}`;
    }
}
```

Get the file info:

```typescript
import * as TsTypeInfo from "ts-type-info";

const result = TsTypeInfo.getInfoFromFiles(["V:\\TestFile.ts"]);
const property = result.getFile("TestFile.ts")
    .getClass("MyClass")                            // get first by name
    .getProperty(p => p.defaultExpression != null); // or first by what matches

console.log(property.name);                   // myNumberProperty
console.log(property.type.text);              // number
console.log(property.defaultExpression.text); // 253
console.log(property.isReadonly);             // true

// or access the arrays directly
const myMethod = result.files[0].classes[0].methods[0];

console.log(myMethod.name); // myMethod
```

If you notice a language feature missing please open [an issue](https://github.com/dsherret/ts-type-info/issues).

## Code Generation

You can work with objects retrieved from the AST or start with your own new file definition:

```typescript
import * as TsTypeInfo from "ts-type-info";

// create whatever you like at the start
const file = TsTypeInfo.createFile({
    classes: [{
        name: "MyClass",
        methods: [{
            name: "myMethod",
            parameters: [{ name: "myParam", type: "string" }],
            onBeforeWrite: writer => writer.write("// myMethod is here"),
            onWriteFunctionBody: writer => {
                writer.write(`if (myParam != null && myParam.length > 40)`).block(() => {
                    writer.write("alert(myParam)");
                });
                writer.newLine().write("return myParam;");
            }
        }]
    }]
});

// add to it later
const myClass = file.getClass("MyClass");
myClass.isAbstract = true;
myClass.addDecorator({
    name: "MyDecorator"
});

myClass.addProperty({
    name: "myProperty1",
    type: "string"
});
myClass.addProperty({
    name: "myProperty2",
    type: "number",
    defaultExpression: "4"
});

// write it out
console.log(file.write());
```

Outputs:

```typeScript
@MyDecorator
abstract class MyClass {
    myProperty1: string;
    myProperty2 = 4;

    // myMethod is here
    myMethod(myParam: string) {
        if (myParam != null && myParam.length > 40) {
            alert(myParam);
        }

        return myParam;
    }
}
```

### Simple Examples

* [Strict Interfaces](examples/strictInterfaces/readme.md) - Make all interface properties required and append "Strict" to the end of the interface name.

### Full Examples

* [Server Bridge](https://github.com/dsherret/server-bridge) - Automatically generates client side code to communicate with the server from the server side code.
* [TsObjectCreate](https://github.com/dsherret/ts-object-create) - Code generation that writes functions for creating objects with their types.

## Include tsNodes

In case there's something you need from the compiler that's not implemented in this library, set the `includeTsNodes` option to true.
This will include the TypeScript compiler nodes in the `tsNode` property of most objects.

```typescript
import * as ts from "typescript";
import * as TsTypeInfo from "ts-type-info";

const result = TsTypeInfo.getInfoFromFiles(["V:\\TestFile.ts"], { includeTsNodes: true });
const typeChecker = result.getTypeChecker(); // ts.TypeChecker in case you need it
const myMethod = result.getFile("TestFile.ts").getClass("MyClass").getMethod("myMethod");
const myMethodNode = myMethod.tsNode as ts.MethodDeclaration;

console.log(myMethodNode.body.statements[0].getText()); // "return `Test: ${myParameter}`;"
```
