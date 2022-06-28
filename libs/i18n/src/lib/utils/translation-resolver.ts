import { isDevMode } from '@angular/core';
import { get } from 'lodash-es';
import { FD_LANGUAGE_ENGLISH } from '../languages';
import { FdLanguage, FdLanguageKey, FdLanguageKeyArgs, FdLanguageKeyFunction } from '../models';

/** Utility class, that provides the logic to resolve FdLanguage translations */
export class TranslationResolver {
    /** @hidden */
    private readonly _curlyBracesRegExp = /{{\s*([^{}\s]*)\s*}}/g;

    /** Resolves the translation for the provided language by key and args */
    resolve(lang: FdLanguage, key: FdLanguageKey, args?: FdLanguageKeyArgs): string {
        const resolvedValue = this._getFdLanguageKeyValue(lang, key, args);
        if (typeof resolvedValue === 'string') {
            return resolvedValue;
        }
        if (isDevMode()) {
            console.warn(
                `Could not resolve translation by "${key}" key in the provided language file. Falling back to English`
            );
        }
        // not a function, not a string, fall back to english, if possible
        return this._getFdLanguageKeyValue(FD_LANGUAGE_ENGLISH, key, args) ?? '';
    }

    /**
     * @hidden
     * "protected" access modified is used in order to be able to reference this method directly in tests
     */
    protected _interpolate(expression: string, args: FdLanguageKeyArgs = {}): string {
        return expression.replace(this._curlyBracesRegExp, (matchingGroup: string, match: string) => {
            const key = match?.trim();
            return args[key]?.toString() ?? '';
        });
    }

    /** @hidden */
    private _getFdLanguageKeyValue(lang: FdLanguage, key: FdLanguageKey, args?: FdLanguageKeyArgs): string | null {
        const resolvedKey = this._tryResolveKey(lang, key);
        if (typeof resolvedKey === 'string') {
            // if that's a string, return it with interpolation
            return this._interpolate(resolvedKey, args);
        }
        if (typeof resolvedKey === 'function') {
            // attempt to resolve function
            const resolvedFunctionValue = this._tryExecuteLanguageFunction(resolvedKey, args);
            if (resolvedFunctionValue) {
                return this._interpolate(resolvedFunctionValue, args);
            }
        }
        return null;
    }

    /** @hidden */
    private _tryResolveKey(lang: FdLanguage, path: any): FdLanguageKey | null {
        try {
            const expression: FdLanguageKey = get(lang, path);
            if (typeof expression === 'function') {
                return expression;
            }
            return expression?.toString() ?? null;
        } catch {
            return null;
        }
    }

    /** @hidden */
    private _tryExecuteLanguageFunction(
        expression: FdLanguageKeyFunction,
        args: FdLanguageKeyArgs = {}
    ): string | null {
        try {
            return expression(args) ?? null;
        } catch {
            return null;
        }
    }
}
