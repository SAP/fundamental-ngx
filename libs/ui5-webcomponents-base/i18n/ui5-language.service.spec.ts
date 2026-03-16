import { signal, WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FD_LANGUAGE_FRENCH, FD_LANGUAGE_SIGNAL, FD_LOCALE_SIGNAL } from '@fundamental-ngx/i18n';
import { Ui5LanguageService } from './ui5-language.service';
import { provideUi5LanguageBridge } from './ui5-language.initializer';

const mockSetLanguage = jest.fn();
jest.mock('@ui5/webcomponents-base/dist/config/Language.js', () => ({
    setLanguage: (...args: unknown[]) => mockSetLanguage(...args)
}));

describe('Ui5LanguageService', () => {
    let localeSignal: WritableSignal<string>;

    beforeEach(() => {
        mockSetLanguage.mockClear();
        localeSignal = signal('en');

        TestBed.configureTestingModule({
            providers: [
                { provide: FD_LOCALE_SIGNAL, useValue: localeSignal },
                Ui5LanguageService
            ]
        });
    });

    it('should call setLanguage on init with initial locale', () => {
        TestBed.inject(Ui5LanguageService);
        TestBed.flushEffects();

        expect(mockSetLanguage).toHaveBeenCalledWith('en');
    });

    it('should react to locale changes', () => {
        TestBed.inject(Ui5LanguageService);
        TestBed.flushEffects();
        mockSetLanguage.mockClear();

        localeSignal.set('de');
        TestBed.flushEffects();

        expect(mockSetLanguage).toHaveBeenCalledWith('de');
    });

    it('should react to language changes via derived locale', () => {
        // Use real linkedSignal-based FD_LOCALE_SIGNAL
        TestBed.resetTestingModule();
        TestBed.configureTestingModule({
            providers: [Ui5LanguageService]
        });

        TestBed.inject(Ui5LanguageService);
        TestBed.flushEffects();
        mockSetLanguage.mockClear();

        const langSignal = TestBed.inject(FD_LANGUAGE_SIGNAL);
        langSignal.set(FD_LANGUAGE_FRENCH);
        TestBed.flushEffects();

        expect(mockSetLanguage).toHaveBeenCalledWith('fr');
    });
});

describe('provideUi5LanguageBridge', () => {
    beforeEach(() => {
        mockSetLanguage.mockClear();
    });

    it('should return EnvironmentProviders', () => {
        const providers = provideUi5LanguageBridge();
        expect(providers).toBeTruthy();
    });

    it('should instantiate Ui5LanguageService when initializer runs', () => {
        TestBed.configureTestingModule({
            providers: [
                { provide: FD_LOCALE_SIGNAL, useValue: signal('en') },
                provideUi5LanguageBridge()
            ]
        });

        // Trigger injector creation which runs environment initializers
        TestBed.inject(Ui5LanguageService);
        TestBed.flushEffects();

        expect(mockSetLanguage).toHaveBeenCalledWith('en');
    });
});
