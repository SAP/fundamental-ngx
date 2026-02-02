import { computed, effect, Injector, runInInjectionContext } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RTL_LANGUAGE, RtlService } from './rtl.service';

describe('RtlService', () => {
    let service: RtlService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [RtlService]
        });
        service = TestBed.inject(RtlService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('signal operations', () => {
        it('should allow setting RTL value via set()', () => {
            service.rtl.set(true);
            expect(service.rtl()).toBe(true);

            service.rtl.set(false);
            expect(service.rtl()).toBe(false);
        });

        it('should allow updating RTL value via update()', () => {
            service.rtl.set(false);
            service.rtl.update((current) => !current);
            expect(service.rtl()).toBe(true);

            service.rtl.update((current) => !current);
            expect(service.rtl()).toBe(false);
        });

        it('should work with computed signals', () => {
            const injector = TestBed.inject(Injector);

            runInInjectionContext(injector, () => {
                const direction = computed(() => (service.rtl() ? 'rtl' : 'ltr'));

                service.rtl.set(false);
                expect(direction()).toBe('ltr');

                service.rtl.set(true);
                expect(direction()).toBe('rtl');
            });
        });

        it('should trigger effects when value changes', () => {
            const injector = TestBed.inject(Injector);
            const values: boolean[] = [];

            runInInjectionContext(injector, () => {
                effect(() => {
                    values.push(service.rtl());
                });

                // Initial value captured
                TestBed.tick();
                expect(values.length).toBe(1);

                // Change value
                service.rtl.set(!service.rtl());
                TestBed.tick();
                expect(values.length).toBe(2);
            });
        });
    });

    describe('deprecated rtlSignal getter', () => {
        it('should return the same signal as rtl', () => {
            expect(service.rtlSignal).toBe(service.rtl);
        });
    });

    describe('RTL_LANGUAGE injection token', () => {
        it('should use custom RTL languages when token is provided', () => {
            // Mock navigator.language to return a custom RTL language
            const originalLanguage = navigator.language;
            Object.defineProperty(navigator, 'language', {
                value: 'custom-rtl',
                configurable: true
            });

            TestBed.resetTestingModule();
            TestBed.configureTestingModule({
                providers: [RtlService, { provide: RTL_LANGUAGE, useValue: ['custom-rtl'] }]
            });

            const customService = TestBed.inject(RtlService);
            expect(customService.rtl()).toBe(true);

            // Restore original language
            Object.defineProperty(navigator, 'language', {
                value: originalLanguage,
                configurable: true
            });
        });

        it('should detect Arabic language as RTL', () => {
            const originalLanguage = navigator.language;
            Object.defineProperty(navigator, 'language', {
                value: 'ar-SA',
                configurable: true
            });

            TestBed.resetTestingModule();
            TestBed.configureTestingModule({
                providers: [RtlService]
            });

            const arabicService = TestBed.inject(RtlService);
            expect(arabicService.rtl()).toBe(true);

            Object.defineProperty(navigator, 'language', {
                value: originalLanguage,
                configurable: true
            });
        });

        it('should detect English language as LTR', () => {
            const originalLanguage = navigator.language;
            Object.defineProperty(navigator, 'language', {
                value: 'en-US',
                configurable: true
            });

            TestBed.resetTestingModule();
            TestBed.configureTestingModule({
                providers: [RtlService]
            });

            const englishService = TestBed.inject(RtlService);
            expect(englishService.rtl()).toBe(false);

            Object.defineProperty(navigator, 'language', {
                value: originalLanguage,
                configurable: true
            });
        });
    });

    describe('integration patterns', () => {
        it('should support arrow key swapping pattern', () => {
            const LEFT_ARROW = 37;
            const RIGHT_ARROW = 39;

            const getExpandKey = (): number => (service.rtl() ? LEFT_ARROW : RIGHT_ARROW);
            const getCollapseKey = (): number => (service.rtl() ? RIGHT_ARROW : LEFT_ARROW);

            service.rtl.set(false);
            expect(getExpandKey()).toBe(RIGHT_ARROW);
            expect(getCollapseKey()).toBe(LEFT_ARROW);

            service.rtl.set(true);
            expect(getExpandKey()).toBe(LEFT_ARROW);
            expect(getCollapseKey()).toBe(RIGHT_ARROW);
        });
    });
});
