export interface ExampleFile<
    ProvidedCodeType = string | Promise<string>,
    ProvidedScssCodeType = string | Promise<string>,
    ProvidedTsCodeType = string | Promise<string>
> {
    code: ProvidedCodeType;
    scssFileCode?: ProvidedScssCodeType;
    standalone?: boolean;
    pure?: boolean;
    language: string;
    fileName?: string;
    entryComponent?: boolean;
    component?: string;
    main?: boolean;
    name?: string;
    typescriptFileCode?: ProvidedTsCodeType;
    service?: boolean;
    pipe?: boolean;
    path?: string;
}
