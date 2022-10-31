import { Directive, Inject, Input, OnDestroy, Self, SkipSelf } from '@angular/core';
import { cloneDeep, merge } from 'lodash-es';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { FD_LANGUAGE_ENGLISH } from '../languages';
import { FdLanguage, FdLanguagePatch } from '../models';
import { FD_LANGUAGE } from './../utils/tokens';

@Directive({
    selector: '[fdPatchLanguage]',
    providers: [
        {
            provide: FD_LANGUAGE,
            useValue: new BehaviorSubject<FdLanguage>(FD_LANGUAGE_ENGLISH)
        }
    ]
})
export class FdPatchLanguageDirective implements OnDestroy {
    /** @hidden */
    private readonly _languagePatch$ = new BehaviorSubject<FdLanguagePatch | null>(null);
    /** @hidden */
    private readonly _onDestroy$ = new Subject<void>();

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
                map(([parentLang, languagePatch]) => merge(cloneDeep(parentLang), languagePatch)),
                takeUntil(this._onDestroy$)
            )
            .subscribe((translation) => fdLanguageSubject$.next(translation));
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._onDestroy$.next();
    }
}
