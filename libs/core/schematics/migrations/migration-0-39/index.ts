import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';

const replacements = [
    [['fdAutoComplete', 'fd-auto-complete'], 'fdkAutoComplete'],
    [['fnClicked'], 'fdkClicked'],
    [['fnDisabled'], 'fdkDisabled'],
    [['fd-focus-key-manager-item', 'fdFocusKeyManagerItem'], 'fdkFocusKeyManagerItem'],
    [['fd-focus-key-manager-list', 'fdFocusKeyManagerList'], 'fdkFocusKeyManagerList'],
    [['fnFocusableItem'], 'fdkFocusableItem'],
    [['fnFocusableList'], 'fdkFocusableList'],
    [['fdIgnoreClickOnSelection', 'fd-ignore-click-on-selection'], 'fdkIgnoreClickOnSelection'],
    [['fdInitialFocus', 'fd-initial-focus'], 'fdkInitialFocus'],
    [['fdLineClamp', 'fd-lineclamp'], 'fdLineClamp'],
    [['fdOnlyDigits', 'fd-only-digits'], 'fdkOnlyDigits'],
    [['fdOverflowListItem', 'fd-overflow-list-item'], 'fdkOverflowListItem'],
    [['fdOverflowList', 'fd-overflow-list'], 'fdkOverflowList'],
    [['fnReadonly'], 'fdkReadonly'],
    [['fdRepeat', 'fd-repeat'], 'fdkRepeat'],
    [['fdResizeHandle', 'fd-resize-handle'], 'fdkResizeHandle'],
    [['fdResize', 'fd-resize'], 'fdkResize'],
    [['fdTemplate', 'fd-template'], 'fdkTemplate'],
    [['fdTruncate', 'fd-truncate'], 'fdkTruncate']
];

export default function mySchematic(): Rule {
    return (tree: Tree, context: SchematicContext) => {
        const files = getFilesWithExtension(tree, '/', 'html');

        files.forEach((file) => {
            let fileContents = tree.read(file)?.toString() as string;

            if (!fileContents) {
                return;
            }

            replacements.forEach((replacement) => {
                const deprecated = replacement[0] as string[];
                const actual = replacement[1] as string;

                deprecated.forEach((selector) => {
                    if (!fileContents.includes(selector)) {
                        return;
                    }

                    fileContents = fileContents.split(selector).join(actual);

                    context.logger.info(`✅️ Replaced old ${selector} directive selector with current ${actual}`);
                });
            });

            tree.overwrite(file, fileContents);
        });
    };
}

function getFilesWithExtension(tree: Tree, path: string, extension: string): string[] {
    const files: string[] = [];
    const rootDir = tree.getDir(path);
    const test = rootDir.subfiles.filter((file) => file.endsWith(`.${extension}`)).map((file) => `${path}${file}`);
    files.push(...test);
    rootDir.subdirs.forEach((dir) => {
        files.push(...getFilesWithExtension(tree, `${path}${dir}/`, extension));
    });

    return files;
}
