import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocaleService {
    // Signal to track current locale
    readonly currentLocale = signal('de');

    // Available locales
    readonly availableLocales = [
        { code: 'en', name: 'English' },
        { code: 'en-US-u-ca-hebrew', name: 'Hebrew(English)' },
        { code: 'he-u-ca-hebrew', name: 'Hebrew' },
        { code: 'de', name: 'Deutsch' },
        { code: 'en-US-u-ca-islamic-civil', name: 'Islamic (Civil, English)' },
        { code: 'ar-u-ca-islamic-civil', name: 'Islamic (Civil, Arabic)' },
        { code: 'en-US-u-ca-islamic-umalqura', name: 'Islamic (Umm al-Qura, English)' },
        { code: 'ja-u-ca-japanese', name: 'Japanese' },
        { code: 'zh-Hans-CN-u-ca-chinese', name: 'Simplified Chinese' },
        { code: 'fa-IR-u-ca-persian', name: 'Persian' }
    ];

    setLocale(locale: string): void {
        this.currentLocale.set(locale);
    }

    getLocale(): string {
        return this.currentLocale();
    }
}
