import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { FdLanguage, loadProperties } from '@fundamental-ngx/i18n';
import { Observable, shareReplay, zip } from 'rxjs';
import { map } from 'rxjs/operators';

const languages = {
    en: 'English',
    ar: 'العربية',
    bg: 'Български',
    cs: 'Český',
    da: 'Dansk',
    de: 'Deutsch',
    el: 'Ελληνικά',
    es: 'Español',
    fi: 'Finnish',
    fr: 'Français',
    he: 'עברית',
    hi: 'हिन्दी',
    hr: 'Hrvatski',
    hu: 'Magyar',
    it: 'Italiano',
    ja: '日本語',
    ka: 'ქართული',
    kk: 'Қазақша',
    ko: '한국어',
    ms: 'Bahasa Melayu',
    nl: 'Nederlands',
    no: 'Norsk',
    pl: 'Polski',
    pt: 'Português(Brazil)',
    ro: 'Română',
    ru: 'Русский',
    sk: 'Slovak',
    sl: 'Slovenský',
    sq: 'Shqip',
    sv: 'Svenska',
    th: 'ไทย',
    tr: 'Türkçe',
    uk: 'Українська',
    zh_CN: '简体中文',
    zh_TW: '繁體中文'
};

export function translations(): Observable<Array<{ value: FdLanguage; name: string }>> {
    const http = inject(HttpClient);
    return zip(
        Object.keys(languages).map((langCode) => {
            const name = languages[langCode];
            langCode = langCode === 'en' ? '' : '_' + langCode;
            return http.get(`assets/i18n/translations${langCode}.properties`, { responseType: 'text' }).pipe(
                map((lang) => ({
                    value: loadProperties(lang),
                    name
                }))
            );
        })
    ).pipe(shareReplay(1));
}
