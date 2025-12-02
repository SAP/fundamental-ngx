import { DestroyRef, Directive, Inject, Input, Self, SkipSelf, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge } from '@fundamental-ngx/cdk/utils';
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
    private readonly _destroyRef = inject(DestroyRef);

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
                    merge(
                        structuredClone(parentLang),
                        patchedObj(parentLang, languagePatch || {}) as Partial<FdLanguage>
                    )
                ),
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe((translation) => fdLanguageSubject$.next(translation));
    }
}
