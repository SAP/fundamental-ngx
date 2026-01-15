import { TestBed } from '@angular/core/testing';
import { RTL_LANGUAGE, RtlService } from './rtl.service';

describe('RtlService', () => {
    let service: RtlService;
    let originalLanguage: string;

    beforeEach(() => {
        // Store original navigator.language to restore later
        originalLanguage = navigator.language;
    });

    afterEach(() => {
        // Restore original navigator.language
        Object.defineProperty(navigator, 'language', {
            value: originalLanguage,
            configurable: true
        });
    });

    describe('with default RTL languages', () => {
        it('should create service', () => {
            TestBed.configureTestingModule({
                providers: [RtlService]
            });
            service = TestBed.inject(RtlService);
            expect(service).toBeTruthy();
        });

        it('should detect Arabic as RTL', () => {
            Object.defineProperty(navigator, 'language', {
                value: 'ar-SA',
                configurable: true
            });

            TestBed.configureTestingModule({
                providers: [RtlService]
            });
            service = TestBed.inject(RtlService);

            expect(service.rtlSignal()).toBe(true);
            expect(service.rtl.value).toBe(true);
        });

        it('should detect Hebrew as RTL', () => {
            Object.defineProperty(navigator, 'language', {
                value: 'he-IL',
                configurable: true
            });

            TestBed.configureTestingModule({
                providers: [RtlService]
            });
            service = TestBed.inject(RtlService);

            expect(service.rtlSignal()).toBe(true);
            expect(service.rtl.value).toBe(true);
        });

        it('should detect Urdu as RTL', () => {
            Object.defineProperty(navigator, 'language', {
                value: 'ur-PK',
                configurable: true
            });

            TestBed.configureTestingModule({
                providers: [RtlService]
            });
            service = TestBed.inject(RtlService);

            expect(service.rtlSignal()).toBe(true);
            expect(service.rtl.value).toBe(true);
        });

        it('should detect Persian/Farsi as RTL', () => {
            Object.defineProperty(navigator, 'language', {
                value: 'fa-IR',
                configurable: true
            });

            TestBed.configureTestingModule({
                providers: [RtlService]
            });
            service = TestBed.inject(RtlService);

            expect(service.rtlSignal()).toBe(true);
            expect(service.rtl.value).toBe(true);
        });

        it('should detect Central Kurdish (Sorani) as RTL', () => {
            Object.defineProperty(navigator, 'language', {
                value: 'ckb-IQ',
                configurable: true
            });

            TestBed.configureTestingModule({
                providers: [RtlService]
            });
            service = TestBed.inject(RtlService);

            expect(service.rtlSignal()).toBe(true);
            expect(service.rtl.value).toBe(true);
        });

        it('should detect English as LTR', () => {
            Object.defineProperty(navigator, 'language', {
                value: 'en-US',
                configurable: true
            });

            TestBed.configureTestingModule({
                providers: [RtlService]
            });
            service = TestBed.inject(RtlService);

            expect(service.rtlSignal()).toBe(false);
            expect(service.rtl.value).toBe(false);
        });

        it('should detect German as LTR', () => {
            Object.defineProperty(navigator, 'language', {
                value: 'de-DE',
                configurable: true
            });

            TestBed.configureTestingModule({
                providers: [RtlService]
            });
            service = TestBed.inject(RtlService);

            expect(service.rtlSignal()).toBe(false);
            expect(service.rtl.value).toBe(false);
        });

        it('should detect French as LTR', () => {
            Object.defineProperty(navigator, 'language', {
                value: 'fr-FR',
                configurable: true
            });

            TestBed.configureTestingModule({
                providers: [RtlService]
            });
            service = TestBed.inject(RtlService);

            expect(service.rtlSignal()).toBe(false);
            expect(service.rtl.value).toBe(false);
        });
    });

    describe('with custom RTL languages via injection token', () => {
        it('should use custom RTL language list', () => {
            Object.defineProperty(navigator, 'language', {
                value: 'ar-SA',
                configurable: true
            });

            TestBed.configureTestingModule({
                providers: [
                    RtlService,
                    {
                        provide: RTL_LANGUAGE,
                        useValue: ['ar', 'he']
                    }
                ]
            });
            service = TestBed.inject(RtlService);

            expect(service.rtlSignal()).toBe(true);
            expect(service.rtl.value).toBe(true);
        });

        it('should treat language as LTR if not in custom list', () => {
            Object.defineProperty(navigator, 'language', {
                value: 'fa-IR',
                configurable: true
            });

            TestBed.configureTestingModule({
                providers: [
                    RtlService,
                    {
                        provide: RTL_LANGUAGE,
                        useValue: ['ar', 'he'] // Persian not included
                    }
                ]
            });
            service = TestBed.inject(RtlService);

            expect(service.rtlSignal()).toBe(false);
            expect(service.rtl.value).toBe(false);
        });

        it('should allow overriding with empty RTL language list', () => {
            Object.defineProperty(navigator, 'language', {
                value: 'ar-SA',
                configurable: true
            });

            TestBed.configureTestingModule({
                providers: [
                    RtlService,
                    {
                        provide: RTL_LANGUAGE,
                        useValue: []
                    }
                ]
            });
            service = TestBed.inject(RtlService);

            expect(service.rtlSignal()).toBe(false);
            expect(service.rtl.value).toBe(false);
        });
    });

    describe('signal and BehaviorSubject synchronization', () => {
        it('should initialize both rtlSignal and rtl with same value (RTL)', () => {
            Object.defineProperty(navigator, 'language', {
                value: 'ar-SA',
                configurable: true
            });

            TestBed.configureTestingModule({
                providers: [RtlService]
            });
            service = TestBed.inject(RtlService);

            const signalValue = service.rtlSignal();
            const behaviorSubjectValue = service.rtl.value;

            expect(signalValue).toBe(behaviorSubjectValue);
            expect(signalValue).toBe(true);
        });

        it('should initialize both rtlSignal and rtl with same value (LTR)', () => {
            Object.defineProperty(navigator, 'language', {
                value: 'en-US',
                configurable: true
            });

            TestBed.configureTestingModule({
                providers: [RtlService]
            });
            service = TestBed.inject(RtlService);

            const signalValue = service.rtlSignal();
            const behaviorSubjectValue = service.rtl.value;

            expect(signalValue).toBe(behaviorSubjectValue);
            expect(signalValue).toBe(false);
        });

        it('should allow updating rtlSignal independently', () => {
            Object.defineProperty(navigator, 'language', {
                value: 'en-US',
                configurable: true
            });

            TestBed.configureTestingModule({
                providers: [RtlService]
            });
            service = TestBed.inject(RtlService);

            expect(service.rtlSignal()).toBe(false);

            // Update signal
            service.rtlSignal.set(true);

            expect(service.rtlSignal()).toBe(true);
            // BehaviorSubject remains unchanged (independent)
            expect(service.rtl.value).toBe(false);
        });

        it('should allow updating rtl BehaviorSubject independently', () => {
            Object.defineProperty(navigator, 'language', {
                value: 'en-US',
                configurable: true
            });

            TestBed.configureTestingModule({
                providers: [RtlService]
            });
            service = TestBed.inject(RtlService);

            expect(service.rtl.value).toBe(false);

            // Update BehaviorSubject
            service.rtl.next(true);

            expect(service.rtl.value).toBe(true);
            // Signal remains unchanged (independent)
            expect(service.rtlSignal()).toBe(false);
        });
    });

    describe('edge cases', () => {
        it('should handle partial language code matches', () => {
            Object.defineProperty(navigator, 'language', {
                value: 'ar',
                configurable: true
            });

            TestBed.configureTestingModule({
                providers: [RtlService]
            });
            service = TestBed.inject(RtlService);

            expect(service.rtlSignal()).toBe(true);
        });

        it('should be case-sensitive for language codes', () => {
            Object.defineProperty(navigator, 'language', {
                value: 'AR-SA',
                configurable: true
            });

            TestBed.configureTestingModule({
                providers: [RtlService]
            });
            service = TestBed.inject(RtlService);

            // 'AR' (uppercase) should not match 'ar' (lowercase)
            expect(service.rtlSignal()).toBe(false);
        });

        it('should handle undefined navigator.language', () => {
            Object.defineProperty(navigator, 'language', {
                value: undefined,
                configurable: true
            });

            TestBed.configureTestingModule({
                providers: [RtlService]
            });
            service = TestBed.inject(RtlService);

            // Should default to LTR when language is undefined
            expect(service.rtlSignal()).toBe(false);
        });
    });

    describe('all supported RTL languages', () => {
        const rtlLanguages = [
            { code: 'ar', name: 'Arabic' },
            { code: 'arc', name: 'Aramaic' },
            { code: 'ckb', name: 'Central Kurdish (Sorani)' },
            { code: 'dv', name: 'Dhivehi' },
            { code: 'fa', name: 'Persian/Farsi' },
            { code: 'ha', name: 'Hausa' },
            { code: 'he', name: 'Hebrew' },
            { code: 'khw', name: 'Khowar' },
            { code: 'ks', name: 'Kashmiri' },
            { code: 'ku', name: 'Kurdish' },
            { code: 'pnb', name: 'Western Punjabi' },
            { code: 'ps', name: 'Pashto' },
            { code: 'sd', name: 'Sindhi' },
            { code: 'ug', name: 'Uyghur' },
            { code: 'ur', name: 'Urdu' },
            { code: 'yi', name: 'Yiddish' }
        ];

        rtlLanguages.forEach(({ code, name }) => {
            it(`should detect ${name} (${code}) as RTL`, () => {
                Object.defineProperty(navigator, 'language', {
                    value: code,
                    configurable: true
                });

                TestBed.configureTestingModule({
                    providers: [RtlService]
                });
                service = TestBed.inject(RtlService);

                expect(service.rtlSignal()).toBe(true);
                expect(service.rtl.value).toBe(true);
            });
        });
    });
});
