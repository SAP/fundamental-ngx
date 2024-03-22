import { names } from '@nx/devkit';

export interface GenerationContext extends ReturnType<typeof names> {
    selector: string;
    startCaseName: string;
    projectName: string;
    scopeName: string;
    projectImportPath: string;
}
