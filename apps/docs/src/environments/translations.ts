import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { FdLanguage, loadProperties } from '@fundamental-ngx/i18n';
import { Observable, shareReplay, zip } from 'rxjs';
import { map } from 'rxjs/operators';

const languages = {
    sq: 'Shqip',
    bg: 'Български',
    zh_CN: '简体中文',
    cs: 'Český',
    de: 'Deutsch',
    en: 'English',
    fr: 'Français',
    ka: 'ქართული',
    hi: 'हिन्दी',
    it: 'Italiano',
    pl: 'Polski',
    pt: 'Português(Brazil)',
    ru: 'Русский',
    tr: 'Türkçe',
    uk: 'Українська'
};

export function translations(): Observable<Array<{ value: FdLanguage; name: string }>> {
    const http = inject(HttpClient);
    return zip(
        Object.keys(languages).map((locale) =>
            http
                .get(`assets/i18n/translations${locale === 'en' ? '' : `_${locale}`}.properties`, {
                    responseType: 'text'
                })
                .pipe(
                    map((lang) => ({
                        value: loadProperties(lang),
                        name: languages[locale]
                    }))
                )
        )
    ).pipe(shareReplay(1));
}
