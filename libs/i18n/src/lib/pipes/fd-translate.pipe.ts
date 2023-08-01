import { ChangeDetectorRef, DestroyRef, inject, Inject, Pipe, PipeTransform } from '@angular/core';
import { BehaviorSubject, combineLatest, distinctUntilChanged, filter, map, Observable, skip } from 'rxjs';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FdLanguage, FdLanguageKeyArgs } from '../models/lang';
import { FD_LANGUAGE } from '../utils/tokens';
import { TranslationResolver } from '../utils/translation-resolver';

@Pipe({
    name: 'fdTranslate',
    pure: false // required to update the value when the observable is resolved
})
export class FdTranslatePipe implements PipeTransform {
    /** @hidden */
    private readonly _translationResolver = new TranslationResolver();

    /** @hidden */
    private readonly _key$ = new BehaviorSubject<string | undefined>(undefined);

    /** @hidden */
    private readonly _args$ = new BehaviorSubject<FdLanguageKeyArgs | undefined>(undefined);

    /** @hidden */
    private _value: string | undefined;

    /** @hidden */
    private readonly _onDestroy$ = inject(DestroyRef);

    /** @hidden */
    constructor(@Inject(FD_LANGUAGE) private _language$: Observable<FdLanguage>, private _cdr: ChangeDetectorRef) {
        this._instantiateSubscription();
    }

    /** Translate a key with arguments and, optionally, default value */
    transform(key: string, args?: FdLanguageKeyArgs | Record<string, any>, defaultValue = ''): string {
        this._key$.next(key);
        this._args$.next(args);

        return this._value || defaultValue;
    }

    /** @hidden */
    private _instantiateSubscription(): void {
        combineLatest([
            this._language$,
            this._key$.pipe(skip(1), filter(Boolean), distinctUntilChanged()),
            this._args$.pipe(skip(1), distinctUntilChanged())
        ])
            .pipe(
                map(([lang, key, args]) => this._translationResolver.resolve(lang, key, args)),
                takeUntilDestroyed(this._onDestroy$)
            )
            .subscribe((value) => {
                this._value = value;
                this._cdr.markForCheck();
            });
    }
}
