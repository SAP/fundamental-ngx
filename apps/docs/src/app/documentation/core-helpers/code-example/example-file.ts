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
    module?: string;
    secondFile?: string;
    thirdFile?: string;
    component?: string;
    fileName?: string;
    appModuleAddon?: string;
}
