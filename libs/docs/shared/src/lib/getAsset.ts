import { ExampleFile } from './core-helpers/code-example/example-file';
import { inject } from '@angular/core';
import { CURRENT_LIB } from './utilities';
import { CURRENT_COMPONENT } from './tokens/current-component.token';

const fileExtensionToLanguage = {
    ts: 'typescript',
    tsx: 'typescript',
    cjs: 'javascript',
    mjs: 'javascript',
    scss: 'sass'
};

export const getAsset = (path: string): Promise<string> =>
    fetch(path, {
        method: 'GET'
    })
        .then((response) => response.text())
        .then((text) => text.trim());

export const getAssetFromModuleAssets = (
    fileName: string,
    currentLib: string = inject(CURRENT_LIB),
    currentComponent: string = inject(CURRENT_COMPONENT)
): Promise<string> => {
    const path = `docs/${currentLib}/${currentComponent}/examples/${fileName}`;
    return getAsset(path);
};

export const getExampleFile = (exampleFileName: string, exampleFile: Partial<ExampleFile> = {}): ExampleFile => {
    const fileExtension = getFileExtensionFromName(exampleFileName);
    const language = fileExtensionToLanguage[fileExtension] || fileExtension;
    return {
        fileName: exampleFileName.replace(new RegExp(`.(component.|directive.)?${fileExtension}$`), ''),
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
