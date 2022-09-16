export interface SchematicsOptions {
    collection: string;
    tsConfig: string;
}

export interface PrepareOptions {
    schematics?: SchematicsOptions;
    packageJsonPath?: string;
    versionsOverrides?: {
        projectVersion?: string;
    };
    distPath: string;
}
