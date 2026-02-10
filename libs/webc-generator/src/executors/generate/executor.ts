import { ExecutorContext, PromiseExecutor } from '@nx/devkit';
import type * as CEM from '@ui5/webcomponents-tools/lib/cem/types-internal.d.ts';
import { mkdir, readFile, writeFile } from 'fs/promises';
import * as path from 'path';
import { componentTemplate } from './component-template';
import { GenerateExecutorSchema } from './schema';

const SUBDIRS = {
    TYPES: 'types',
    UTILS: 'utils',
    THEMING: 'theming'
};

const FILES = {
    INDEX_TS: 'index.ts',
    NG_PACKAGE_JSON: 'ng-package.json',
    CVA_TS: 'cva.ts',
    BOOLEAN_CVA_TS: 'boolean-cva.ts',
    THEMING_TEMPLATE: 'utils/theming-service-template.tpl'
};

const WEB_COMPONENTS_BASE = 'ui5-webcomponents-base';

/** Converts PascalCase to kebab-case (e.g., 'Ui5Button' -> 'ui5-button'). */
const pascalToKebabCase = (str: string): string => str.replace(/\B([A-Z])/g, '-$1').toLowerCase();

/**
 * Ensures directory exists and writes content to a file.
 * @param filePath Absolute path to the file.
 * @param content The content to write.
 */
async function ensureDirAndWriteFile(filePath: string, content: string): Promise<void> {
    await mkdir(path.dirname(filePath), { recursive: true });
    await writeFile(filePath, content, 'utf-8');
}

/** Determines the capitalized suffix for the theming service based on package name. */
function getPackageSuffix(packageName: string): string {
    const prefix = '@ui5/webcomponents';
    if (!packageName.startsWith(prefix)) {
        throw new Error(`Invalid package name: ${packageName}. Expected format: ${prefix} or ${prefix}-<suffix>`);
    }

    const suffix = packageName.slice(prefix.length + 1);
    const effectiveSuffix = suffix || 'main';
    return effectiveSuffix.charAt(0).toUpperCase() + effectiveSuffix.slice(1);
}

/** Loads the theming template and injects the package suffix. */
async function generateThemingServiceContent(packageName: string): Promise<string> {
    const themingTemplatePath = path.resolve(__dirname, FILES.THEMING_TEMPLATE);
    const content = await readFile(themingTemplatePath, 'utf-8');
    const suffix = getPackageSuffix(packageName);
    const suffixLower = suffix === 'Main' ? '' : '-' + suffix.toLowerCase();
    return content
        .replace(/\${PACKAGE_SUFFIX_LOWER_PLACEHOLDER}/g, suffixLower)
        .replace(/\${PACKAGE_SUFFIX_PLACEHOLDER}/g, suffix);
}

/**
 * Step 1: Resolve and load the CEM file.
 */
async function loadCemData(options: GenerateExecutorSchema, context: ExecutorContext): Promise<CEM.Package> {
    if (!options.cemFile) {
        throw new Error('Could not determine a valid path to the CEM file. Please provide it via the cemFile option.');
    }

    let cemFilePath: string;
    try {
        cemFilePath = require.resolve(options.cemFile, { paths: [context.root] });
    } catch (error) {
        throw new Error(`Failed to resolve CEM file at path ${options.cemFile}. Original error: ${error.message}`);
    }

    const cemContent = await readFile(cemFilePath, 'utf-8');
    return JSON.parse(cemContent) as CEM.Package;
}

/**
 * Defines the structure for the data extracted from the Custom Elements Manifest (CEM).
 */
type ExtractedCemData = {
    componentDeclarations: { declaration: CEM.CustomElementDeclaration; modulePath: string }[];
    allEnums: { name: string; members: string[]; module: string; package: string }[];
};

/**
 * Step 2: Extract all relevant data from the CEM.
 */
function extractCemData(cemData: CEM.Package, options: GenerateExecutorSchema): ExtractedCemData {
    const componentDeclarations = cemData.modules.flatMap((m) => {
        const declarations = (m.declarations || []).filter(
            (d): d is CEM.CustomElementDeclaration =>
                d?.kind === 'class' && 'tagName' in d && 'customElement' in d && d.customElement === true
        );

        return declarations.map((d) => ({ declaration: d, modulePath: m.path }));
    });

    const allEnums = cemData.modules
        .flatMap((m) =>
            (m.declarations || [])
                .filter((d): d is CEM.EnumDeclaration => d?.kind === 'enum')
                .map((e) => ({ enumDeclaration: e, modulePath: m.path }))
        )
        .map(({ enumDeclaration: e, modulePath }) => {
            const ui5Package = options.packageName || '@ui5/webcomponents'; // Default to the package being generated for
            let ui5Module = '';
            const typesPathMatch = modulePath.match(/^(.*\/)?(dist\/types\/[^/]+\.js)$/);

            if (typesPathMatch) {
                ui5Module = typesPathMatch[2].replace(/\.js$/, '');
            } else {
                ui5Module = modulePath.replace(/\.js$/, '');
            }

            return {
                name: e.name,
                members: (e.members || []).map((m) => m.name),
                module: ui5Module,
                package: ui5Package
            };
        });

    return { componentDeclarations, allEnums };
}

/**
 * Generates the types/index.ts file and its ng-package.json.
 */
async function generateTypesFiles(
    allEnums: ExtractedCemData['allEnums'],
    targetDir: string,
    projectName: string
): Promise<string> {
    let typesContent = allEnums
        .map(
            (e) =>
                // Target export format: export { default as CalendarType } from "@ui5/webcomponents-base/dist/types/CalendarType.js";
                `export { default as ${e.name} } from '${e.package}/${e.module}.js';`
        )
        .join('\n');

    if (projectName === WEB_COMPONENTS_BASE) {
        typesContent += addUI5WrapperCustomEventType();
    }

    // Add one empty line at the end if there's content
    if (typesContent) {
        typesContent += '\n';
    }

    const typesIndexFilePath = path.join(targetDir, SUBDIRS.TYPES, FILES.INDEX_TS);
    await ensureDirAndWriteFile(typesIndexFilePath, typesContent);

    const ngPackagePath = path.join(targetDir, SUBDIRS.TYPES, FILES.NG_PACKAGE_JSON);
    await writeFile(ngPackagePath, JSON.stringify({ lib: { entryFile: './index.ts' } }, null, 2), 'utf-8');

    return typesContent ? `export * from './${SUBDIRS.TYPES}';\n` : '';
}

/**
 * Generates the theming service file and its ng-package.json.
 */
async function generateThemingFiles(packageName: string, targetDir: string): Promise<void> {
    const themingServiceContent = await generateThemingServiceContent(packageName);

    const themingIndexPath = path.join(targetDir, SUBDIRS.THEMING, FILES.INDEX_TS);
    await ensureDirAndWriteFile(themingIndexPath, themingServiceContent);

    const ngPackagePath = path.join(targetDir, SUBDIRS.THEMING, FILES.NG_PACKAGE_JSON);
    await writeFile(ngPackagePath, JSON.stringify({ lib: { entryFile: './index.ts' } }, null, 2), 'utf-8');
}

/**
 * Generates all individual component wrapper files.
 */
async function generateComponentFiles(
    componentDeclarations: { declaration: CEM.CustomElementDeclaration; modulePath: string }[],
    allEnums: ExtractedCemData['allEnums'],
    packageName: string,
    targetDir: string
): Promise<string[]> {
    const componentExports: string[] = [];

    await Promise.all(
        componentDeclarations.map(({ declaration }) => {
            const className = declaration.name || '';
            const fileName = pascalToKebabCase(className);
            const componentDir = path.join(targetDir, fileName);

            if (!className) {
                return;
            }

            componentExports.push(`export { ${className} } from './${fileName}';`);

            const componentIndexPath = path.join(componentDir, FILES.INDEX_TS);
            const ngPackagePath = path.join(componentDir, FILES.NG_PACKAGE_JSON);

            const templateContent = componentTemplate(
                declaration,
                allEnums.map((e) => ({ name: e.name, members: e.members })),
                packageName
            );

            return ensureDirAndWriteFile(componentIndexPath, templateContent).then(() =>
                writeFile(ngPackagePath, JSON.stringify({ lib: { entryFile: './index.ts' } }, null, 2), 'utf-8')
            );
        })
    );

    return componentExports;
}

/**
 * Generates the Control Value Accessor (CVA) utility file.
 */
async function generateCvaFile(targetDir: string): Promise<void> {
    const cvaTemplatePath = path.resolve(__dirname, 'utils', FILES.CVA_TS);
    const cvaContent = await readFile(cvaTemplatePath, 'utf-8');

    const cvaFilePath = path.join(targetDir, SUBDIRS.UTILS, FILES.CVA_TS);
    await ensureDirAndWriteFile(cvaFilePath, cvaContent);
}

/**
 * Generates the Boolean Control Value Accessor (Boolean CVA) utility file.
 */
async function generateBooleanCvaFile(targetDir: string): Promise<void> {
    const booleanCvaTemplatePath = path.resolve(__dirname, 'utils', FILES.BOOLEAN_CVA_TS);
    const booleanCvaContent = await readFile(booleanCvaTemplatePath, 'utf-8');

    const booleanCvaFilePath = path.join(targetDir, SUBDIRS.UTILS, FILES.BOOLEAN_CVA_TS);
    await ensureDirAndWriteFile(booleanCvaFilePath, booleanCvaContent);
}

/**
 * Generates the utils secondary entry point files (index.ts and ng-package.json).
 */
async function generateUtilsFiles(targetDir: string): Promise<void> {
    // Generate utils/index.ts that exports the CVA directives
    const utilsContent = `export { BooleanControlValueAccessor } from './boolean-cva';\nexport { GenericControlValueAccessor } from './cva';\n`;

    const utilsIndexPath = path.join(targetDir, SUBDIRS.UTILS, FILES.INDEX_TS);
    await ensureDirAndWriteFile(utilsIndexPath, utilsContent);

    // Generate utils/ng-package.json
    const ngPackagePath = path.join(targetDir, SUBDIRS.UTILS, FILES.NG_PACKAGE_JSON);
    await writeFile(ngPackagePath, JSON.stringify({ lib: { entryFile: './index.ts' } }, null, 2), 'utf-8');
}

function addUI5WrapperCustomEventType(): string {
    return `
import { OutputEmitterRef } from '@angular/core';

type OutputKeys<T> = {
    [K in keyof T]: T[K] extends OutputEmitterRef<any> ? K : never;
}[keyof T];

export type UI5WrapperCustomEvent<T, N extends OutputKeys<T>> = T[N] extends OutputEmitterRef<infer E> ? E : never;
`;
}

/**
 * An NX executor that generates Angular components from UI5 Web Components'
 * custom-elements-internal.json schema.
 */
const runExecutor: PromiseExecutor<GenerateExecutorSchema> = async (options, context) => {
    if (!context.projectName) {
        return { success: false, error: 'Project name is not defined in the executor context.' };
    }

    try {
        console.log(`Starting component generation for project: ${options.packageName}`);
        const packageName = options.packageName || '@ui5/webcomponents';
        const projectRoot = context.root;
        const targetDir = path.join(projectRoot, `libs/${context.projectName}`);

        // Resolve, load, and parse the CEM file
        const cemData = await loadCemData(options, context);

        // Extract necessary data (declarations, enums)
        // PASS THE OPTIONS OBJECT TO extractCemData
        const { componentDeclarations, allEnums } = extractCemData(cemData, options);

        // Generate Utility/Config Files
        await mkdir(targetDir, { recursive: true });

        let exportsContent = '';

        if (allEnums.length > 0) {
            exportsContent += await generateTypesFiles(allEnums, targetDir, context.projectName);
        }

        if (options.skipComponents !== true) {
            // Generate Theming
            await generateThemingFiles(packageName, targetDir);

            // Generate CVA Utility and Utils secondary entry point
            await generateCvaFile(targetDir);
            await generateBooleanCvaFile(targetDir);
            await generateUtilsFiles(targetDir);

            exportsContent += `export * from './utils';\n`;

            // Generate Component Wrappers
            const componentExports = await generateComponentFiles(
                componentDeclarations,
                allEnums,
                packageName,
                targetDir
            );
            exportsContent += componentExports.join('\n');

            // Add theming service export to root index
            exportsContent += `\nexport * from './${SUBDIRS.THEMING}';\n`;
        }

        // Generate the root index.ts file
        const rootIndexPath = path.join(targetDir, FILES.INDEX_TS);
        await writeFile(rootIndexPath, exportsContent, 'utf-8');

        return { success: true };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
        return {
            success: false,
            error: `An error occurred during component generation: ${errorMessage}`
        };
    }
};

export default runExecutor;
