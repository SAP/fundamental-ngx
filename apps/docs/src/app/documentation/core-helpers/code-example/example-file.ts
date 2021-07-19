export interface ExampleFile {
    code: {
        default: string;
    };
    scssFileCode?: {
        default: string;
    };
    standalone?: boolean;
    language: string;
    fileName?: string;
    entryComponent?: boolean;
    component?: string;
    main?: boolean;
    name?: string;
    typescriptFileCode?: {
        default: string;
    };
    service?: boolean;
    pipe?: boolean;
    path?: string;
}
