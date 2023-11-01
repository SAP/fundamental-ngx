import { InjectionToken } from '@angular/core';
import { FdLanguage } from '@fundamental-ngx/i18n';
import { Observable } from 'rxjs';

export const Translations = new InjectionToken<Observable<Array<{ value: FdLanguage; name: string }>>>(
    'Observable of the translations'
);
