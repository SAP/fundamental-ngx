import { ChangeDetectorRef, DestroyRef, Pipe, PipeTransform } from '@angular/core';
import { BehaviorSubject, combineLatest, distinctUntilChanged, filter, skip, switchMap } from 'rxjs';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FdLanguageKeyIdentifier } from '../models';
import { FdLanguageKeyArgs } from '../models/fd-language-key';
import { resolveTranslationObservableFn } from '../utils';

@Pipe({
    name: 'fdTranslate',
    pure: false, // required to update the value when the observable is resolved
    standalone: true
})
export class FdTranslatePipe implements PipeTransform {
    /** @hidden */
    private readonly _translationResolver = resolveTranslationObservableFn();

    /** @hidden */
    private readonly _key$ = new BehaviorSubject<FdLanguageKeyIdentifier | undefined>(undefined);

    /** @hidden */
    private readonly _args$ = new BehaviorSubject<FdLanguageKeyArgs | undefined>(undefined);

    /** @hidden */
    private _value: string | undefined;

    /** @hidden */
    constructor(
        private readonly _destroyRef: DestroyRef,
        private _cdr: ChangeDetectorRef
    ) {
        this._instantiateSubscription();
    }

    /** Translate a key with arguments and, optionally, default value */
    transform(
        key: FdLanguageKeyIdentifier | null,
        args?: FdLanguageKeyArgs | Record<string, any>,
        defaultValue = ''
    ): string {
        if (!key) {
            return defaultValue;
        }

        this._key$.next(key);
        this._args$.next(args);

        return this._value || defaultValue;
    }

    /** @hidden */
    private _instantiateSubscription(): void {
        combineLatest([
            this._key$.pipe(skip(1), filter(Boolean), distinctUntilChanged()),
            this._args$.pipe(skip(1), distinctUntilChanged())
        ])
            .pipe(
                switchMap(([key, args]) => this._translationResolver(key, args as any)),
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe((value) => {
                this._value = value;
                this._cdr.markForCheck();
            });
    }
}
