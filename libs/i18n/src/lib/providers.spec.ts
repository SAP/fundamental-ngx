import { Component, inject, LOCALE_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FD_LANGUAGE_CHINESE_SIMPLIFIED } from './languages/chinese_simplified';
import { FD_LANGUAGE_ENGLISH } from './languages/english';
import { FD_LANGUAGE_FRENCH } from './languages/french';
import { FD_LANGUAGE_GERMAN } from './languages/german';
import { FdLanguage } from './models/fd-language';
import { provideAllFundamentalLanguages, provideFundamentalTranslations } from './providers';
import { registerLanguage, resetRegistry } from './utils/detect-language';
import { FD_LANGUAGE_SIGNAL } from './utils/tokens';

describe('provideFundamentalTranslations', () => {
    afterEach(() => {
        resetRegistry();
    });

    it('with LOCALE_ID="de" and provider → FD_LANGUAGE_SIGNAL resolves to German', () => {
        @Component({ selector: 'fd-test-pft', template: '' })
        class TestPftComponent {
            langSignal = inject(FD_LANGUAGE_SIGNAL);
        }

        TestBed.configureTestingModule({
            imports: [TestPftComponent],
            providers: [{ provide: LOCALE_ID, useValue: 'de' }, provideFundamentalTranslations(FD_LANGUAGE_GERMAN)]
        });

        const fixture = TestBed.createComponent(TestPftComponent);
        expect(fixture.componentInstance.langSignal()).toBe(FD_LANGUAGE_GERMAN);
    });

    it('without provider and LOCALE_ID="de" → FD_LANGUAGE_SIGNAL resolves to English', () => {
        @Component({ selector: 'fd-test-pft-no-reg', template: '' })
        class TestPftNoRegComponent {
            langSignal = inject(FD_LANGUAGE_SIGNAL);
        }

        TestBed.configureTestingModule({
            imports: [TestPftNoRegComponent],
            providers: [{ provide: LOCALE_ID, useValue: 'de' }]
        });

        const fixture = TestBed.createComponent(TestPftNoRegComponent);
        expect(fixture.componentInstance.langSignal()).toBe(FD_LANGUAGE_ENGLISH);
    });

    it('with multiple languages registered → correct language resolves per LOCALE_ID', () => {
        @Component({ selector: 'fd-test-pft-multi-de', template: '' })
        class TestPftMultiDeComponent {
            langSignal = inject(FD_LANGUAGE_SIGNAL);
        }

        TestBed.configureTestingModule({
            imports: [TestPftMultiDeComponent],
            providers: [
                { provide: LOCALE_ID, useValue: 'fr' },
                provideFundamentalTranslations(FD_LANGUAGE_GERMAN, FD_LANGUAGE_FRENCH)
            ]
        });

        const fixture = TestBed.createComponent(TestPftMultiDeComponent);
        expect(fixture.componentInstance.langSignal()).toBe(FD_LANGUAGE_FRENCH);
    });

    it('with zh-CN locale and Chinese Simplified registered → resolves to Chinese Simplified', () => {
        @Component({ selector: 'fd-test-pft-zh', template: '' })
        class TestPftZhComponent {
            langSignal = inject(FD_LANGUAGE_SIGNAL);
        }

        TestBed.configureTestingModule({
            imports: [TestPftZhComponent],
            providers: [
                { provide: LOCALE_ID, useValue: 'zh-CN' },
                provideFundamentalTranslations(FD_LANGUAGE_CHINESE_SIMPLIFIED)
            ]
        });

        const fixture = TestBed.createComponent(TestPftZhComponent);
        expect(fixture.componentInstance.langSignal()).toBe(FD_LANGUAGE_CHINESE_SIMPLIFIED);
    });

    it('with a cloned Chinese Simplified object → zh alias still registers (matched by locale, not identity)', () => {
        // A patched/cloned FdLanguage has the same `locale` but a different object
        // identity than the FD_LANGUAGE_CHINESE_SIMPLIFIED constant. Alias
        // registration must key off the locale string, not `===`.
        const clonedZhHans: FdLanguage = { ...FD_LANGUAGE_CHINESE_SIMPLIFIED };

        @Component({ selector: 'fd-test-pft-zh-clone', template: '' })
        class TestPftZhCloneComponent {
            langSignal = inject(FD_LANGUAGE_SIGNAL);
        }

        TestBed.configureTestingModule({
            imports: [TestPftZhCloneComponent],
            providers: [
                // LOCALE_ID 'zh' only resolves via the bare 'zh' alias, which the
                // Chinese-Simplified branch registers. If aliasing were identity-based
                // this would fall back to English.
                { provide: LOCALE_ID, useValue: 'zh' },
                provideFundamentalTranslations(clonedZhHans)
            ]
        });

        const fixture = TestBed.createComponent(TestPftZhCloneComponent);
        expect(fixture.componentInstance.langSignal()).toBe(clonedZhHans);
    });
});

describe('FD_LANGUAGE_SIGNAL resolution ordering (init-order hazard)', () => {
    afterEach(() => {
        resetRegistry();
    });

    // Pins the Medium-severity ordering contract: FD_LANGUAGE_SIGNAL resolves the
    // detected language ONCE, on first read. A language registered AFTER that first
    // read does not retroactively change the already-resolved signal. This is why
    // provideFundamentalTranslations(...) must run before anything reads the signal
    // during bootstrap. If this test starts failing because a late registration is
    // picked up, the signal became lazily re-resolving — update the docs accordingly.
    it('language registered AFTER the signal is first read → signal stays on English fallback', () => {
        @Component({ selector: 'fd-test-order-hazard', template: '' })
        class TestOrderHazardComponent {
            langSignal = inject(FD_LANGUAGE_SIGNAL);
        }

        TestBed.configureTestingModule({
            imports: [TestOrderHazardComponent],
            // LOCALE_ID='de' but NO language provider — mirrors a consumer that reads
            // the signal before provideFundamentalTranslations() has registered German.
            providers: [{ provide: LOCALE_ID, useValue: 'de' }]
        });

        const fixture = TestBed.createComponent(TestOrderHazardComponent);
        // First read resolves against the English-only registry.
        expect(fixture.componentInstance.langSignal()).toBe(FD_LANGUAGE_ENGLISH);

        // A late registration does NOT retroactively update the resolved signal.
        registerLanguage(FD_LANGUAGE_GERMAN);
        expect(fixture.componentInstance.langSignal()).toBe(FD_LANGUAGE_ENGLISH);
    });
});

describe('provideAllFundamentalLanguages', () => {
    afterEach(() => {
        resetRegistry();
    });

    it('with LOCALE_ID="de" → FD_LANGUAGE_SIGNAL resolves to German (restores eager behavior)', () => {
        @Component({ selector: 'fd-test-pall-de', template: '' })
        class TestPallDeComponent {
            langSignal = inject(FD_LANGUAGE_SIGNAL);
        }

        TestBed.configureTestingModule({
            imports: [TestPallDeComponent],
            providers: [{ provide: LOCALE_ID, useValue: 'de' }, provideAllFundamentalLanguages()]
        });

        const fixture = TestBed.createComponent(TestPallDeComponent);
        expect(fixture.componentInstance.langSignal()).toBe(FD_LANGUAGE_GERMAN);
    });

    it('with LOCALE_ID="fr" → FD_LANGUAGE_SIGNAL resolves to French', () => {
        @Component({ selector: 'fd-test-pall-fr', template: '' })
        class TestPallFrComponent {
            langSignal = inject(FD_LANGUAGE_SIGNAL);
        }

        TestBed.configureTestingModule({
            imports: [TestPallFrComponent],
            providers: [{ provide: LOCALE_ID, useValue: 'fr' }, provideAllFundamentalLanguages()]
        });

        const fixture = TestBed.createComponent(TestPallFrComponent);
        expect(fixture.componentInstance.langSignal()).toBe(FD_LANGUAGE_FRENCH);
    });
});
