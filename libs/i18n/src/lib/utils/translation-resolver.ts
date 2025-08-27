import { Injectable, isDevMode } from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { IntlMessageFormat } from 'intl-messageformat';
import { get } from 'lodash-es';
import { FD_LANGUAGE_ENGLISH } from '../languages';
import {
    FdLanguage,
    FdLanguageKey,
    FdLanguageKeyArgs,
    FdLanguageKeyFunction,
    FdLanguageKeyIdentifier
} from '../models';

const _internalReferenceRegExp = /\{\s*@@([^{}\s]*)\s*}/g;

@Injectable({
    providedIn: 'root'
})
/** Utility class, that provides the logic to resolve FdLanguage translations */
export class TranslationResolver {
    /** Resolves the translation for the provided language by key and args */
    resolve(
        lang: FdLanguage,
        key: FdLanguageKeyIdentifier,
        args?: FdLanguageKeyArgs,
        locale?: Nullable<string>,
        fallbackLanguage: FdLanguage = FD_LANGUAGE_ENGLISH
    ): string {
        const resolvedValue = this._resolveWithoutFallback(lang, key, args, locale);
        if (resolvedValue !== '') {
            return resolvedValue;
        }
        if (isDevMode() && fallbackLanguage) {
            console.warn(
                `Could not resolve translation by "${key}" key in the provided language file. Falling back to fallback language.`
            );
        }
        // not a function, not a string, fall back to english, if possible
        return this._resolveWithoutFallback(fallbackLanguage, key, args, locale);
    }

    /** @hidden */
    private _resolveWithoutFallback(
        lang: FdLanguage,
        key: FdLanguageKeyIdentifier,
        args?: FdLanguageKeyArgs,
        locale?: Nullable<string>
    ): string {
        const resolvedValue = this._getRaw(lang, key, args);
        if (resolvedValue !== '') {
            return this._interpolate(resolvedValue, args, locale);
        }
        return '';
    }

    /**
     * @hidden
     */
    private _interpolate(expression: string, args: FdLanguageKeyArgs = {}, locale?: Nullable<string>): string {
        if (expression.indexOf('{') === -1) {
            return expression;
        }
        const result = new IntlMessageFormat(expression, locale || 'en-US').format(args || {});
        return Array.isArray(result) ? result.join('') : result.toString();
    }

    /**
     * Returns the raw ICU string for the provided language by key and args
     **/
    private _getRaw(lang: FdLanguage, key: FdLanguageKeyIdentifier, args?: FdLanguageKeyArgs): string {
        const val = this._getFdLanguageKeyValue(lang, key, args);
        if (typeof val === 'string') {
            const internalReferences = val.match(_internalReferenceRegExp);
            if (internalReferences) {
                const replacements: Array<[string, string]> = internalReferences.map((internalReference) => {
                    const internalReferenceKey = internalReference.replace(
                        _internalReferenceRegExp,
                        '$1'
                    ) as FdLanguageKeyIdentifier;
                    const replacementValue = this._getRaw(lang, internalReferenceKey, args);
                    return [internalReference, replacementValue];
                });
                return this._applyReplacements(val, replacements);
            }
            return val;
        }
        if (isDevMode()) {
            console.warn(`Could not resolve translation by "${key}" key in the provided language file`);
        }
        return val ?? '';
    }

    /** @hidden */
    private _getFdLanguageKeyValue(
        lang: FdLanguage,
        key: FdLanguageKeyIdentifier,
        args?: FdLanguageKeyArgs
    ): string | null {
        const resolvedKey = this._tryResolveKey(lang, key);
        if (typeof resolvedKey === 'string') {
            return resolvedKey;
        }
        return this._tryExecuteLanguageFunction(resolvedKey, args);
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
        expression?: Nullable<FdLanguageKeyFunction<any>>,
        args: FdLanguageKeyArgs = {}
    ): string | null {
        if (!expression) {
            return null;
        }
        try {
            return expression(args) ?? null;
        } catch {
            return null;
        }
    }

    /**
     * Applies replacements to the raw string
     * @hidden */
    private _applyReplacements(rawString: string, replacements: Array<[string, string]> = []): string {
        (replacements as Array<[string, string]>).forEach(([internalReference, replacementValue]) => {
            rawString = rawString.split(internalReference).join(replacementValue);
        });
        return rawString;
    }
}
