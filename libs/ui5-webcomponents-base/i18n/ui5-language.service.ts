import { effect, inject, Injectable } from '@angular/core';
import { FD_LOCALE_SIGNAL } from '@fundamental-ngx/i18n';
import { setLanguage } from '@ui5/webcomponents-base/dist/config/Language.js';

@Injectable({ providedIn: 'root' })
export class Ui5LanguageService {
    private readonly _localeSignal = inject(FD_LOCALE_SIGNAL);

    constructor() {
        effect(() => {
            const locale = this._localeSignal();
            setLanguage(locale);
        });
    }
}
