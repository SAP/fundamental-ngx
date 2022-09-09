export interface SchematicsOptions {
    collection: string;
    tsConfig: string;
}

export interface CopyReadmeOptions {
    readmePath: string;
    targetPath: string;
}

export interface PrepareOptions {
    schematics?: SchematicsOptions;
    copyReadme?: CopyReadmeOptions;
    packageJsonPath?: string;
    versionsOverrides?: {
        projectVersion?: string;
    };
    distPath: string;
}
