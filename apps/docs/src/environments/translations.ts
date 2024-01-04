import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { FdLanguage, loadProperties } from '@fundamental-ngx/i18n';
import { Observable, shareReplay, zip } from 'rxjs';
import { map } from 'rxjs/operators';

const languages = {
    en: 'English',
    ar: 'Arabic',
    bg: 'Bulgarian',
    cs: 'Czech',
    da: 'Danish',
    de: 'German',
    el: 'Greek',
    es: 'Spanish',
    fi: 'Finnish',
    fr: 'French',
    he: 'Hebrew',
    hi: 'Hindi',
    hr: 'Croatian',
    hu: 'Hungarian',
    it: 'Italian',
    ja: 'Japanese',
    ka: 'Georgian',
    kk: 'Kazakh',
    ko: 'Korean',
    ms: 'Malay',
    nl: 'Dutch',
    no: 'Norwegian',
    pl: 'Polish',
    pt: 'Portuguese',
    ro: 'Romanian',
    ru: 'Russian',
    sh: 'Serbian',
    sk: 'Slovak',
    sl: 'Slovenian',
    sq: 'Albanian',
    sv: 'Swedish',
    th: 'Thai',
    tr: 'Turkish',
    uk: 'Ukrainian',
    zh_CN: 'Chinese',
    zh_TW: 'Chinese traditional'
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
