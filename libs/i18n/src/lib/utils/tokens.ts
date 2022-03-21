import { InjectionToken } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FD_LANGUAGE_ENGLISH } from '../languages/english';
import { FdLanguage } from '../models/lang';

export const FD_LANGUAGE = new InjectionToken<Observable<FdLanguage>>('Language for @fundamental/ngx packages', {
    factory: () => of(FD_LANGUAGE_ENGLISH)
});
