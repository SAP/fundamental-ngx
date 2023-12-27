import { formatFiles, Tree } from '@nx/devkit';
import { DownportTranslationsGeneratorSchema } from './schema';
import { getOriginalTranslations } from './utils/get-original-translations';
import { sync } from 'fast-glob';
import { readFileSync } from 'fs';
import { basename } from 'path';
import { loadProperties } from './utils/load-properties';
import { MessageFormatElement, parse, TYPE } from '@formatjs/icu-messageformat-parser';
import { ValidPluralRule } from '@formatjs/icu-messageformat-parser/types';
import { loadJson, RecursiveRecord } from './utils/load-json';

const pluralizationEngine = new Set(['be', 'bs', 'cnr', 'dz', 'hr', 'ru', 'sr', 'uk']);

const downportedLanguageToLanguageFullName = {
    en: 'English',
    ar: 'Arabic',
    bg: 'Bulgarian',
    cs: 'Czech',
    da: 'Danish',
    de: 'German',
    el: 'Greek',
    es: 'Spanish',
    fi: 'Finnish',
    fr: 'French',
    he: 'Hebrew',
    hi: 'Hindi',
    hr: 'Croatian',
    hu: 'Hungarian',
    it: 'Italian',
    ja: 'Japanese',
    ka: 'Georgian',
    kk: 'Kazakh',
    ko: 'Korean',
    ms: 'Malay',
    nl: 'Dutch',
    no: 'Norwegian',
    pl: 'Polish',
    pt: 'Portuguese',
    ro: 'Romanian',
    ru: 'Russian',
    sh: 'Serbian',
    sk: 'Slovak',
    sl: 'Slovenian',
    sq: 'Albanian',
    sv: 'Swedish',
    th: 'Thai',
    tr: 'Turkish',
    uk: 'Ukrainian',
    zh_CN: 'Chinese',
    zh_TW: 'Chinese_traditional'
};

const ruleMap: Record<ValidPluralRule, string> = {
    zero: 'if (PLACEHOLDER === 0)',
    one: 'if (PLACEHOLDER === 1)',
    two: 'if (PLACEHOLDER === 2)',
    few: "if (pluralization.process(PLACEHOLDER) === 'few')",
    many: "if (pluralization.process(PLACEHOLDER) === 'many')",
    other: 'else'
};

function parsedToString(contextual?: boolean): (formatElement: MessageFormatElement) => string {
    return (formatElement: MessageFormatElement) => {
        if (formatElement.type === TYPE.literal) {
            return formatElement.value;
        }
        if (formatElement.type === TYPE.argument) {
            return contextual ? `\${params['${formatElement.value}']}` : `{{${formatElement.value}}}`;
        }
        if (formatElement.type === TYPE.plural) {
            const varIdentifier = `params['${formatElement.value}']`;
            const val = Object.entries(formatElement.options)
                .map(([rule, pluralOrSelectOption]) => {
                    const formatElements = pluralOrSelectOption.value.map((el) => {
                        if (el.type === TYPE.pound) {
                            return {
                                type: TYPE.literal,
                                value: `\${${varIdentifier}}`
                            } as MessageFormatElement;
                        }
                        return el;
                    });
                    if (ruleMap[rule]) {
                        return `${ruleMap[rule].replace('PLACEHOLDER', varIdentifier)} {
                    return \`${formatElements.map(parsedToString(true)).join('')}\`;
                }`;
                    }
                    return `if(${varIdentifier}=${rule}) {
                    return \`${formatElements.map(parsedToString(true)).join('')}\`;
            }`;
                })
                .join('\n');
            return `\${(() => {${val}})()}`;
        }
        throw new Error(`Unknown format element type '${formatElement.type}'`);
    };
}

export async function downportTranslationsGenerator(tree: Tree, options: DownportTranslationsGeneratorSchema) {
    const translations = sync(options.translationsGlob);
    translations.forEach((translationPath) => {
        const langCode = ((c) => c || 'en')(
            basename(translationPath, '.properties')
                .split('_')
                .filter((f) => f !== 'translations')
                .join('_')
        );
        const languageName = downportedLanguageToLanguageFullName[langCode];
        if (!languageName) {
            throw new Error(`Unknown lang code '${langCode}' provided with translation file path '${translationPath}'`);
        }
        const outputFilePath = `libs/i18n/src/lib/languages/${languageName.toLowerCase()}.ts`;
        const originalTranslations = getOriginalTranslations(tree, outputFilePath);
        const propertiesContent = readFileSync(translationPath, 'utf-8');
        const jsonContent = Object.entries(loadProperties(propertiesContent)).reduce((acc, [key, strValue]) => {
            const parsedValue = parse(strValue);
            const isSimpleTranslation = parsedValue.every(({ type }) => type === TYPE.literal);
            if (isSimpleTranslation) {
                acc[key] = JSON.stringify(strValue);
            } else {
                const someArePlural = parsedValue.some(({ type }) => type === TYPE.plural);
                if (someArePlural) {
                    acc[key] = `(params) => {
                        return \`${parsedValue.map(parsedToString(true)).join('')}\`;
                    }`;
                } else {
                    acc[key] = JSON.stringify(parsedValue.map(parsedToString(false)).join(''));
                }
            }
            return acc;
        }, {});
        Object.keys(originalTranslations).forEach((key) => {
            originalTranslations[key] = jsonContent[key] || originalTranslations[key];
        });
        const finalTranslations = loadJson(originalTranslations);
        tree.write(
            outputFilePath,
            `
        /* eslint-disable */
        import { FdLanguage } from '../models/lang';
        ${
            pluralizationEngine.has(langCode)
                ? "import { PluralizationSet1 } from './pluralization/set1';\nconst pluralization = new PluralizationSet1();\n"
                : ''
        }
        export const FD_LANGUAGE_${languageName.toUpperCase()}: FdLanguage = {
            ${renderHierarchy(finalTranslations)}
        };
        `
        );
    });
    const indexTsContent = tree
        .children('libs/i18n/src/lib/languages')
        .reduce((acc: string[], fileName) => {
            if (fileName !== 'index.ts' && fileName !== 'pluralization') {
                acc.push(`export * from './${fileName.replace('.ts', '')}';`);
            }
            return acc;
        }, [])
        .join('\n');
    tree.write('libs/i18n/src/lib/languages/index.ts', indexTsContent);
    await formatFiles(tree);
}

function renderHierarchy(flat: RecursiveRecord): string {
    return Object.entries(flat)
        .map(([key, value]) => {
            if (typeof value === 'string') {
                return `${key}: ${value},`;
            }
            return `${key}: {${renderHierarchy(value)}},`;
        })
        .join('\n');
}

export default downportTranslationsGenerator;
