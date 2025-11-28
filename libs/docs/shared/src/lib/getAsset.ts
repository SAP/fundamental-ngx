import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ExampleFile } from './core-helpers/code-example/example-file';
import { CURRENT_COMPONENT } from './tokens/current-component.token';
import { CURRENT_LIB } from './utilities';

const fileExtensionToLanguage = {
    ts: 'typescript',
    tsx: 'typescript',
    cjs: 'javascript',
    mjs: 'javascript',
    scss: 'sass'
};

export const getAsset = (path: string): Observable<string> =>
    inject(HttpClient)
        .get(path, {
            responseType: 'text',
            headers: {
                // This one is needed for vite to ignore transforming TypeScript source files.
                accept: 'text/html'
            }
        })
        .pipe(map((r) => r.trim()));

export const getAssetFromModuleAssets = (
    fileName: string,
    currentLib: string = inject(CURRENT_LIB),
    currentComponent: string = inject(CURRENT_COMPONENT)
): Observable<string> => {
    const path = `docs/${currentLib}/${currentComponent}/examples/${fileName}`;
    return getAsset(path);
};

export const getExampleFile = (exampleFileName: string, exampleFile: Partial<ExampleFile> = {}): ExampleFile => {
    const fileExtension = getFileExtensionFromName(exampleFileName);
    const language = fileExtensionToLanguage[fileExtension] || fileExtension;
    const extractedFileName = exampleFileName.replace(new RegExp(`.(component.|directive.)?${fileExtension}$`), '');
    return {
        fileName: extractedFileName,
        originalFileName: extractedFileName,
        name: exampleFileName,
        language,
        code: getAssetFromModuleAssets(exampleFileName),
        ...exampleFile
    };
};

const getFileExtensionFromName = (fileName: string): string => {
    const parts = fileName.split('.');
    return parts[parts.length - 1];
};
