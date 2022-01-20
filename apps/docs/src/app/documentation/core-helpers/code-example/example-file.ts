export interface ExampleFile {
    code: string;
    scssFileCode?: string;
    standalone?: boolean;
    language: string;
    fileName?: string;
    entryComponent?: boolean;
    component?: string;
    main?: boolean;
    name?: string;
    typescriptFileCode?: string;
    service?: boolean;
    pipe?: boolean;
    path?: string;
}
