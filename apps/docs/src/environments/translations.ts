import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { FdLanguage, loadProperties } from '@fundamental-ngx/i18n';
import { Observable, shareReplay, zip } from 'rxjs';
import { map } from 'rxjs/operators';

const languages = {
    'sq-AL': 'Shqip',
    'bg-BG': 'Български',
    'zh-CN': '简体中文',
    'cs-CZ': 'Český',
    'de-DE': 'Deutsch',
    'en-US': 'English',
    'fr-FR': 'Français',
    'ka-GE': 'ქართული',
    'hi-IN': 'हिन्दी',
    'it-IT': 'Italiano',
    'pl-PL': 'Polski',
    'pt-BR': 'Português(Brazil)',
    'ru-RU': 'Русский',
    'tr-TR': 'Türkçe',
    'uk-UA': 'Українська'
};

export function translations(): Observable<Array<{ value: FdLanguage; name: string }>> {
    const http = inject(HttpClient);
    return zip(
        Object.keys(languages).map((locale) =>
            http.get(`assets/i18n/translations_${locale}.properties`, { responseType: 'text' }).pipe(
                map((lang) => ({
                    value: loadProperties(lang),
                    name: languages[locale]
                }))
            )
        )
    ).pipe(shareReplay(1));
}
