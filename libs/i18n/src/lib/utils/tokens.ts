import { inject, InjectionToken, LOCALE_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FD_LANGUAGE_ENGLISH } from '../languages/english';
import { FdLanguage } from '../models/lang';

export const FD_LANGUAGE = new InjectionToken<Observable<FdLanguage>>('Language for @fundamental-ngx packages', {
    factory: () => new BehaviorSubject(FD_LANGUAGE_ENGLISH)
});

export const FD_LOCALE = new InjectionToken<Observable<string>>('Locale for @fundamental-ngx packages', {
    factory: () => new BehaviorSubject(inject(LOCALE_ID))
});
