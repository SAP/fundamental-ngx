import type { ExecutorContext } from '@nx/devkit';
import type * as CEM from '@ui5/webcomponents-tools/lib/cem/types-internal.d.ts';
import runExecutor, { extractCemData, getPackageSuffix, pascalToKebabCase } from './executor';

jest.mock('fs/promises', () => ({
    mkdir: jest.fn().mockResolvedValue(undefined),
    readFile: jest.fn(),
    writeFile: jest.fn().mockResolvedValue(undefined)
}));

import * as fs from 'fs/promises';

const PROJECT_ROOT = process.cwd().replace(/[/\\]libs[/\\].*$/, ''); // resolve to monorepo root

const makeContext = (projectName = 'ui5-webcomponents'): ExecutorContext => ({
    projectName,
    root: PROJECT_ROOT,
    cwd: PROJECT_ROOT,
    isVerbose: false,
    projectsConfigurations: { version: 2, projects: {} }
});

const minimalCem: CEM.Package = {
    schemaVersion: '1.0.0',
    modules: [
        {
            kind: 'javascript-module',
            path: 'dist/Button.js',
            declarations: [
                {
                    kind: 'class',
                    name: 'Button',
                    tagName: 'ui5-button',
                    customElement: true
                } as CEM.CustomElementDeclaration
            ]
        }
    ]
};

const cemWithEnum: CEM.Package = {
    schemaVersion: '1.0.0',
    modules: [
        ...minimalCem.modules,
        {
            kind: 'javascript-module',
            path: 'dist/types/ButtonDesign.js',
            declarations: [
                {
                    kind: 'enum',
                    name: 'ButtonDesign',
                    members: [{ kind: 'field', name: 'Default' }]
                } as CEM.EnumDeclaration
            ]
        }
    ]
};

describe('pascalToKebabCase', () => {
    it('lowercases a single PascalCase word', () => {
        expect(pascalToKebabCase('Button')).toBe('button');
    });

    it('converts two-word PascalCase to kebab-case', () => {
        expect(pascalToKebabCase('AvatarGroup')).toBe('avatar-group');
    });

    it('handles Ui5 prefix correctly', () => {
        expect(pascalToKebabCase('Ui5Button')).toBe('ui5-button');
    });

    it('leaves an already-lowercase word unchanged', () => {
        expect(pascalToKebabCase('button')).toBe('button');
    });

    it('documents current behavior for consecutive uppercase letters (implementation limitation)', () => {
        // Known limitation: consecutive uppercase letters each get a dash.
        // 'TableHeaderCellActionAI' → 'table-header-cell-action-a-i' (not 'action-ai').
        // This test pins the current behavior — update if the regex is fixed.
        expect(pascalToKebabCase('TableHeaderCellActionAI')).toBe('table-header-cell-action-a-i');
    });
});

describe('getPackageSuffix', () => {
    it('returns "Main" for the base @ui5/webcomponents package', () => {
        expect(getPackageSuffix('@ui5/webcomponents')).toBe('Main');
    });

    it('capitalizes the suffix for @ui5/webcomponents-fiori', () => {
        expect(getPackageSuffix('@ui5/webcomponents-fiori')).toBe('Fiori');
    });

    it('capitalizes the suffix for @ui5/webcomponents-ai', () => {
        expect(getPackageSuffix('@ui5/webcomponents-ai')).toBe('Ai');
    });

    it('throws for a package without the expected prefix', () => {
        expect(() => getPackageSuffix('@some/other-package')).toThrow(/Invalid package name/);
    });

    it('does not throw for a package that starts with @ui5/webcomponents but has no dash separator', () => {
        // '@ui5/webcomponentssomething' passes the startsWith guard — documents the current behavior.
        expect(getPackageSuffix('@ui5/webcomponentssomething')).toBe('Omething');
    });
});

describe('extractCemData', () => {
    const defaultOptions = { packageName: '@ui5/webcomponents', targetDir: '', outputPath: '', tsConfig: '' };
    const noPackageOptions = { targetDir: '', outputPath: '', tsConfig: '' };

    const makePackage = (overrides: Partial<CEM.Package> = {}): CEM.Package => ({
        schemaVersion: '1.0.0',
        modules: [],
        ...overrides
    });

    const componentModule: CEM.JavaScriptModule = {
        kind: 'javascript-module',
        path: 'dist/Button.js',
        declarations: [
            {
                kind: 'class',
                name: 'Button',
                tagName: 'ui5-button',
                customElement: true
            } as CEM.CustomElementDeclaration
        ]
    };

    const enumModule: CEM.JavaScriptModule = {
        kind: 'javascript-module',
        path: 'dist/types/ButtonDesign.js',
        declarations: [
            {
                kind: 'enum',
                name: 'ButtonDesign',
                members: [
                    { kind: 'field', name: 'Default' },
                    { kind: 'field', name: 'Emphasized' }
                ]
            } as CEM.EnumDeclaration
        ]
    };

    const nonCustomElementModule: CEM.JavaScriptModule = {
        kind: 'javascript-module',
        path: 'dist/utils/something.js',
        declarations: [
            {
                kind: 'class',
                name: 'InternalHelper'
            } as CEM.ClassDeclaration
        ]
    };

    const nonTypesEnumModule: CEM.JavaScriptModule = {
        kind: 'javascript-module',
        path: 'dist/enums/SomeEnum.js',
        declarations: [
            {
                kind: 'enum',
                name: 'SomeEnum',
                members: [{ kind: 'field', name: 'A' }]
            } as CEM.EnumDeclaration
        ]
    };

    it('extracts component declarations from modules', () => {
        const cem = makePackage({ modules: [componentModule] });
        const { componentDeclarations } = extractCemData(cem, defaultOptions);
        expect(componentDeclarations).toHaveLength(1);
        expect(componentDeclarations[0].declaration.name).toBe('Button');
    });

    it('filters out non-custom-element class declarations', () => {
        const cem = makePackage({ modules: [nonCustomElementModule] });
        const { componentDeclarations } = extractCemData(cem, defaultOptions);
        expect(componentDeclarations).toHaveLength(0);
    });

    it('extracts enum declarations with members', () => {
        const cem = makePackage({ modules: [enumModule] });
        const { allEnums } = extractCemData(cem, defaultOptions);
        expect(allEnums).toHaveLength(1);
        expect(allEnums[0].name).toBe('ButtonDesign');
        expect(allEnums[0].members).toEqual(['Default', 'Emphasized']);
    });

    it('strips .js extension from enum module path in dist/types/', () => {
        const cem = makePackage({ modules: [enumModule] });
        const { allEnums } = extractCemData(cem, defaultOptions);
        expect(allEnums[0].module).toBe('dist/types/ButtonDesign');
    });

    it('uses options.packageName as the enum package', () => {
        const cem = makePackage({ modules: [enumModule] });
        const { allEnums } = extractCemData(cem, {
            packageName: '@ui5/webcomponents-fiori',
            targetDir: '',
            outputPath: '',
            tsConfig: ''
        });
        expect(allEnums[0].package).toBe('@ui5/webcomponents-fiori');
    });

    it('falls back to @ui5/webcomponents when packageName is undefined', () => {
        const cem = makePackage({ modules: [enumModule] });
        const { allEnums } = extractCemData(cem, noPackageOptions);
        expect(allEnums[0].package).toBe('@ui5/webcomponents');
    });

    it('strips .js from non-types enum module paths', () => {
        const cem = makePackage({ modules: [nonTypesEnumModule] });
        const { allEnums } = extractCemData(cem, noPackageOptions);
        expect(allEnums[0].module).toBe('dist/enums/SomeEnum');
    });
});

describe('runExecutor', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        (fs.readFile as jest.Mock).mockImplementation((filePath: string) => {
            if ((filePath as string).endsWith('.json')) {
                return Promise.resolve(JSON.stringify(minimalCem));
            }
            return Promise.resolve('/* template content */');
        });
    });

    it('returns failure when cemFile option is missing', async () => {
        const result = await runExecutor({ targetDir: '', outputPath: '', tsConfig: '' }, makeContext());
        expect(result.success).toBe(false);
        expect((result as any).error).toMatch(/cemFile/i);
    });

    it('returns failure when projectName is not defined in context', async () => {
        const contextWithoutProjectName = { ...makeContext(), projectName: undefined as any };
        const result = await runExecutor(
            {
                cemFile: '@ui5/webcomponents/dist/custom-elements-internal.json',
                targetDir: '',
                outputPath: '',
                tsConfig: ''
            },
            contextWithoutProjectName
        );
        expect(result.success).toBe(false);
    });

    it('returns failure when require.resolve throws (non-existent module)', async () => {
        const result = await runExecutor(
            {
                cemFile: '@ui5/webcomponents-nonexistent/dist/custom-elements.json',
                targetDir: '',
                outputPath: '',
                tsConfig: ''
            },
            makeContext()
        );
        expect(result.success).toBe(false);
        expect((result as any).error).toMatch(/resolve/i);
    });

    it('returns failure when CEM file contains invalid JSON', async () => {
        (fs.readFile as jest.Mock).mockResolvedValue('{invalid-json}');
        const result = await runExecutor(
            {
                cemFile: '@ui5/webcomponents/dist/custom-elements-internal.json',
                targetDir: '',
                outputPath: '',
                tsConfig: ''
            },
            makeContext()
        );
        expect(result.success).toBe(false);
    });

    it('returns success and writes types files when skipComponents is true and enums present', async () => {
        (fs.readFile as jest.Mock).mockImplementation((filePath: string) => {
            if ((filePath as string).endsWith('.json')) {
                return Promise.resolve(JSON.stringify(cemWithEnum));
            }
            return Promise.resolve('/* template content */');
        });
        const result = await runExecutor(
            {
                cemFile: '@ui5/webcomponents/dist/custom-elements-internal.json',
                targetDir: '',
                outputPath: '',
                tsConfig: '',
                skipComponents: true
            },
            makeContext()
        );
        expect(result.success).toBe(true);
        const writeFileCalls = (fs.writeFile as jest.Mock).mock.calls.map((c: any[]) => c[0] as string);
        expect(writeFileCalls.some((p) => p.includes('types'))).toBe(true);
        expect(writeFileCalls.some((p) => p.includes('theming'))).toBe(false);
    });

    it('skips types files when CEM has no enums', async () => {
        const result = await runExecutor(
            {
                cemFile: '@ui5/webcomponents/dist/custom-elements-internal.json',
                targetDir: '',
                outputPath: '',
                tsConfig: ''
            },
            makeContext()
        );
        expect(result.success).toBe(true);
        const writeFileCalls = (fs.writeFile as jest.Mock).mock.calls.map((c: any[]) => c[0] as string);
        expect(writeFileCalls.some((p) => p.includes('types'))).toBe(false);
    });

    it('writes theming, utils, and component files on full happy path', async () => {
        const result = await runExecutor(
            {
                cemFile: '@ui5/webcomponents/dist/custom-elements-internal.json',
                packageName: '@ui5/webcomponents',
                targetDir: '',
                outputPath: '',
                tsConfig: ''
            },
            makeContext()
        );
        expect(result.success).toBe(true);
        const writeFileCalls = (fs.writeFile as jest.Mock).mock.calls.map((c: any[]) => c[0] as string);
        expect(writeFileCalls.some((p) => p.includes('theming'))).toBe(true);
        expect(writeFileCalls.some((p) => p.includes('utils'))).toBe(true);
        expect(writeFileCalls.some((p) => /[/\\]button[/\\]index\.ts/.test(p))).toBe(true);
    });

    it('root index does not contain types export when no enums present', async () => {
        const result = await runExecutor(
            {
                cemFile: '@ui5/webcomponents/dist/custom-elements-internal.json',
                targetDir: '',
                outputPath: '',
                tsConfig: ''
            },
            makeContext()
        );
        expect(result.success).toBe(true);
        const rootWriteCall = (fs.writeFile as jest.Mock).mock.calls.find((c: any[]) =>
            /libs\/ui5-webcomponents\/index\.ts$/.test(c[0])
        );
        expect(rootWriteCall).toBeDefined();
        expect(rootWriteCall[1]).not.toContain("export * from './types'");
    });
});
