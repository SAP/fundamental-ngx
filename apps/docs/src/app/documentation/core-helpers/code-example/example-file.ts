export interface ExampleFile {
    code: {
        default: string
    };
    name?: string;
    language?: string;
    tagname?: string;
    typescriptFileCode?: {
        default: string
    };
    scssFileCode?: {
        default: string
    };
    secondFile?: string;
    thirdFile?: string;
    component?: string;
    fileName?: string;
    entryComponent?: string;
    declarationArray?: string;
    imports?: string;
}
