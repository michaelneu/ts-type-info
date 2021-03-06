﻿import * as typeConstants from "./typeConstants";

export interface Options {
    compilerOptions?: CompilerOptions;
    compilerHost?: typeConstants.TypeScriptCompilerHost;
    tsConfigFilePath?: string;
    showDebugMessages?: boolean;
    includeTsNodes?: boolean;
}

export interface CompilerOptions extends typeConstants.TypeScriptCompilerOptions {
}
