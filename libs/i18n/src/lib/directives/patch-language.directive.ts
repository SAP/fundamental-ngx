import { DestroyRef, Directive, Inject, Input, Self, SkipSelf, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { cloneDeep, merge } from 'lodash-es';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { FD_LANGUAGE_ENGLISH } from '../languages';
import { FdLanguage, FdLanguagePatch } from '../models';
import { patchedObj } from '../utils';
import { FD_LANGUAGE } from '../utils/tokens';

@Directive({
    selector: '[fdPatchLanguage]',
    providers: [
        {
            provide: FD_LANGUAGE,
            useValue: new BehaviorSubject<FdLanguage>(FD_LANGUAGE_ENGLISH)
        }
    ],
    standalone: true
})
export class FdPatchLanguageDirective {
    /** @hidden */
    private readonly _languagePatch$ = new BehaviorSubject<FdLanguagePatch | null>(null);
    /** @hidden */
    private readonly _onDestroy$ = inject(DestroyRef);

    /** part of the language object to be overriden */
    @Input('fdPatchLanguage') set languagePatch(value: FdLanguagePatch) {
        this._languagePatch$.next(value);
    }

    /** @hidden */
    constructor(
        @SkipSelf() @Inject(FD_LANGUAGE) parentFdLanguage$: Observable<FdLanguage>,
        @Self() @Inject(FD_LANGUAGE) fdLanguageSubject$: BehaviorSubject<FdLanguage>
    ) {
        combineLatest([parentFdLanguage$, this._languagePatch$])
            .pipe(
                map(([parentLang, languagePatch]) =>
                    merge(cloneDeep(parentLang), patchedObj(parentLang, languagePatch || {}))
                ),
                takeUntilDestroyed(this._onDestroy$)
            )
            .subscribe((translation) => fdLanguageSubject$.next(translation));
    }
}
