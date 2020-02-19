export interface StackblitzFile {
    path: string;
    componentName: string;
    basis: string;
    selector: string;
    entryComponent: boolean;
    main: boolean;
}


export interface StackblitzParameters {
    tsFiles: StackblitzFile[];
}
