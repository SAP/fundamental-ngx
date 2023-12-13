import { ChangeDetectorRef, DestroyRef, Pipe, PipeTransform } from '@angular/core';
import { BehaviorSubject, combineLatest, distinctUntilChanged, filter, skip, switchMap } from 'rxjs';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FdLanguageKeyArgs, FdLanguageKeyIdentifier } from '../models/lang';
import { resolveTranslationObservableFn } from '../utils';

@Pipe({
    name: 'fdTranslate',
    pure: false, // required to update the value when the observable is resolved
    standalone: true
})
export class FdTranslatePipe implements PipeTransform {
    /** @ignore */
    private readonly _translationResolver = resolveTranslationObservableFn();

    /** @ignore */
    private readonly _key$ = new BehaviorSubject<FdLanguageKeyIdentifier | undefined>(undefined);

    /** @ignore */
    private readonly _args$ = new BehaviorSubject<FdLanguageKeyArgs | undefined>(undefined);

    /** @ignore */
    private _value: string | undefined;

    /** @ignore */
    constructor(private readonly _destroyRef: DestroyRef, private _cdr: ChangeDetectorRef) {
        this._instantiateSubscription();
    }

    /** Translate a key with arguments and, optionally, default value */
    transform(key: FdLanguageKeyIdentifier, args?: FdLanguageKeyArgs | Record<string, any>, defaultValue = ''): string {
        this._key$.next(key);
        this._args$.next(args);

        return this._value || defaultValue;
    }

    /** @ignore */
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
