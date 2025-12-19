export interface GenerateExecutorSchema {
    cemFile?: string;
    targetDir: string;
    outputPath: string;
    packageName?: string;
    tsConfig: string;
    skipComponents?: boolean;
    dependencyCemFiles?: string[];
}
