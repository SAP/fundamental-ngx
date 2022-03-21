import { ChangeDetectorRef, Inject, isDevMode, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { get } from 'lodash-es';
import {
    BehaviorSubject,
    combineLatest,
    distinctUntilChanged,
    filter,
    map,
    Observable,
    skip,
    Subject,
    takeUntil
} from 'rxjs';

import { FD_LANGUAGE_ENGLISH } from '../languages';
import { FdLanguage, FdLanguageKeyArgs, FdLanguageKey, FdLanguageKeyFunction } from '../models/lang';
import { FD_LANGUAGE } from '../utils/tokens';

@Pipe({
    name: 'fdTranslate',
    pure: false // required to update the value when the observable is resolved
})
export class FdTranslatePipe implements PipeTransform, OnDestroy {
    /** @hidden */
    private readonly _curlyBracesRegExp = /{{\s*([^{}\s]*)\s*}}/g;

    /** @hidden */
    private readonly _key$ = new BehaviorSubject<string | undefined>(undefined);

    /** @hidden */
    private readonly _args$ = new BehaviorSubject<FdLanguageKeyArgs | undefined>(undefined);

    /** @hidden */
    private _value: string | undefined;

    /** @hidden */
    private readonly _onDestroy$ = new Subject<void>();

    constructor(@Inject(FD_LANGUAGE) private _language$: Observable<FdLanguage>, private _cdr: ChangeDetectorRef) {
        this._instantiateSubscription();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._onDestroy$.next();
    }

    transform(key: string, args?: FdLanguageKeyArgs, defaultValue = ''): string {
        this._key$.next(key);
        this._args$.next(args);

        return this._value ?? defaultValue;
    }

    /** @hidden */
    _interpolate(expression: string, args: FdLanguageKeyArgs = {}): string {
        return expression.replace(this._curlyBracesRegExp, (matchingGroup: string, match: string) => {
            const key = match?.trim();
            return args[key]?.toString() ?? '';
        });
    }

    /** @hidden */
    private _instantiateSubscription(): void {
        combineLatest([
            this._language$,
            this._key$.pipe(skip(1), filter(Boolean), distinctUntilChanged()),
            this._args$.pipe(skip(1), distinctUntilChanged())
        ])
            .pipe(
                map(([lang, key, args]) => {
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
                }),
                takeUntil(this._onDestroy$)
            )
            .subscribe((value) => {
                this._value = value;
                this._cdr.markForCheck();
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
                return resolvedFunctionValue;
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
