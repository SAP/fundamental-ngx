import { join, Path } from '@angular-devkit/core';
import { Tree } from '@angular-devkit/schematics';

const STYLESHEET_REGEX = /.*\.(css|scss|less|sass)/;

export function findStylesheetFiles(tree: Tree, startDirectory: string = '/'): string[] {
    const result: string[] = [];
    const visitDir = (dirPath: Path) => {
        const { subfiles, subdirs } = tree.getDir(dirPath);

        subfiles.forEach((fileName) => {
            if (STYLESHEET_REGEX.test(fileName)) {
                result.push(join(dirPath, fileName));
            }
        });

        // Visit directories within the current directory to find other stylesheets.
        subdirs.forEach((fragment) => {
            // Do not visit directories or files inside node modules or `dist/` folders.
            if (fragment !== 'node_modules' && fragment !== 'dist') {
                visitDir(join(dirPath, fragment));
            }
        });
    };
    visitDir(startDirectory as Path);
    return result;
}
