export interface GenerateExecutorSchema {
    cemFile?: string;
    targetDir: string;
    outputPath: string;
    tsConfig: string;
    skipComponents?: boolean;
}
