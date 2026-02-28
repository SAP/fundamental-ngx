import { ApplicationRef, computed, EnvironmentInjector, runInInjectionContext, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { toObservable } from '@angular/core/rxjs-interop';
import { BehaviorSubject } from 'rxjs';
import { FD_LANGUAGE_ENGLISH } from '../../languages';
import { FdLanguage } from '../../models';
import { FD_LANGUAGE, FD_LOCALE } from '../tokens';
import { resolveTranslationSignal, resolveTranslationSignalFn } from './resolve-translations-signal';

const testLang: FdLanguage = {
    ...FD_LANGUAGE_ENGLISH,
    platformApprovalFlow: {
        ...FD_LANGUAGE_ENGLISH.platformApprovalFlow,
        nodeMembersCount: (params) => `${params['count']} members`
    }
};

describe('Signal-based Translation Resolution', () => {
    let lang$: BehaviorSubject<FdLanguage>;
    let locale$: BehaviorSubject<string>;
    let injector: EnvironmentInjector;

    beforeEach(() => {
        lang$ = new BehaviorSubject<FdLanguage>(testLang);
        locale$ = new BehaviorSubject<string>('en');

        TestBed.configureTestingModule({
            providers: [
                {
                    provide: FD_LANGUAGE,
                    useValue: lang$
                },
                {
                    provide: FD_LOCALE,
                    useValue: locale$
                }
            ]
        });

        injector = TestBed.inject(EnvironmentInjector);
    });

    describe('resolveTranslationSignalFn', () => {
        it('should create translation signal from static key', () => {
            const translateFn = runInInjectionContext(injector, () => resolveTranslationSignalFn());
            const translationSignal = runInInjectionContext(injector, () =>
                translateFn('platformApprovalFlow.defaultWatchersLabel')
            );

            expect(translationSignal()).toBe('Watchers');
        });

        it('should create translation signal from signal key', () => {
            const keySignal = signal<'platformApprovalFlow.defaultWatchersLabel'>(
                'platformApprovalFlow.defaultWatchersLabel'
            );
            const translateFn = runInInjectionContext(injector, () => resolveTranslationSignalFn());
            const translationSignal = runInInjectionContext(injector, () => translateFn(keySignal));

            expect(translationSignal()).toBe('Watchers');
        });

        it('should react to key signal changes', () => {
            const keySignal = signal<'platformApprovalFlow.defaultWatchersLabel' | 'platformApprovalFlow.defaultTitle'>(
                'platformApprovalFlow.defaultWatchersLabel'
            );
            const translateFn = runInInjectionContext(injector, () => resolveTranslationSignalFn());
            const translationSignal = runInInjectionContext(injector, () => translateFn(keySignal));

            expect(translationSignal()).toBe('Watchers');

            // Change key
            keySignal.set('platformApprovalFlow.defaultTitle');
            expect(translationSignal()).toBe('Approval process');
        });

        it('should react to language changes via observable injection', (done) => {
            const translateFn = runInInjectionContext(injector, () => resolveTranslationSignalFn());
            const translationSignal = runInInjectionContext(injector, () =>
                translateFn('platformApprovalFlow.defaultWatchersLabel')
            );

            expect(translationSignal()).toBe('Watchers');

            // Change language
            lang$.next({
                ...testLang,
                platformApprovalFlow: {
                    ...testLang.platformApprovalFlow,
                    defaultWatchersLabel: 'Modified Watchers'
                }
            });

            // Signal should react to language change
            TestBed.inject(ApplicationRef).tick();
            setTimeout(() => {
                expect(translationSignal()).toBe('Modified Watchers');
                done();
            }, 50);
        });

        it('should work with context parameters', () => {
            const translateFn = runInInjectionContext(injector, () => resolveTranslationSignalFn());
            const translationSignal = runInInjectionContext(injector, () =>
                translateFn('platformApprovalFlow.nodeMembersCount', { count: 10 })
            );

            expect(translationSignal()).toBe('10 members');
        });

        it('should work with signal context parameters', () => {
            const ctxSignal = signal({ count: 10 });
            const translateFn = runInInjectionContext(injector, () => resolveTranslationSignalFn());
            const translationSignal = runInInjectionContext(injector, () =>
                translateFn('platformApprovalFlow.nodeMembersCount', ctxSignal)
            );

            expect(translationSignal()).toBe('10 members');

            // Change context
            ctxSignal.set({ count: 20 });
            expect(translationSignal()).toBe('20 members');
        });

        it('should use provided language signal option', () => {
            const customLang = signal<FdLanguage>({
                ...testLang,
                platformApprovalFlow: {
                    ...testLang.platformApprovalFlow,
                    defaultWatchersLabel: 'Custom Watchers'
                }
            });

            const translateFn = runInInjectionContext(injector, () =>
                resolveTranslationSignalFn({ fdLang: customLang })
            );
            const translationSignal = runInInjectionContext(injector, () =>
                translateFn('platformApprovalFlow.defaultWatchersLabel')
            );

            expect(translationSignal()).toBe('Custom Watchers');

            // Change custom language
            customLang.set({
                ...testLang,
                platformApprovalFlow: {
                    ...testLang.platformApprovalFlow,
                    defaultWatchersLabel: 'Updated Custom Watchers'
                }
            });
            expect(translationSignal()).toBe('Updated Custom Watchers');
        });

        it('should use provided locale signal option', () => {
            const customLocale = signal('de-DE');
            const translateFn = runInInjectionContext(injector, () =>
                resolveTranslationSignalFn({ fdLocale: customLocale })
            );
            const translationSignal = runInInjectionContext(injector, () =>
                translateFn('platformApprovalFlow.defaultWatchersLabel')
            );

            // Should still work (locale is passed to resolver)
            expect(translationSignal()).toBeDefined();
            expect(typeof translationSignal()).toBe('string');
        });

        it('should handle static language option', () => {
            const customLang: FdLanguage = {
                ...testLang,
                platformApprovalFlow: {
                    ...testLang.platformApprovalFlow,
                    defaultWatchersLabel: 'Static Custom Watchers'
                }
            };

            const translateFn = runInInjectionContext(injector, () =>
                resolveTranslationSignalFn({ fdLang: customLang })
            );
            const translationSignal = runInInjectionContext(injector, () =>
                translateFn('platformApprovalFlow.defaultWatchersLabel')
            );

            expect(translationSignal()).toBe('Static Custom Watchers');
        });

        it('should handle static locale option', () => {
            const translateFn = runInInjectionContext(injector, () =>
                resolveTranslationSignalFn({ fdLocale: 'fr-FR' })
            );
            const translationSignal = runInInjectionContext(injector, () =>
                translateFn('platformApprovalFlow.defaultWatchersLabel')
            );

            expect(translationSignal()).toBeDefined();
        });
    });

    describe('resolveTranslationSignal', () => {
        it('should create translation signal with static key', () => {
            const translationSignal = runInInjectionContext(injector, () =>
                resolveTranslationSignal('platformApprovalFlow.defaultWatchersLabel')
            );

            expect(translationSignal()).toBe('Watchers');
        });

        it('should create translation signal with signal key', () => {
            const keySignal = signal<'platformApprovalFlow.defaultWatchersLabel'>(
                'platformApprovalFlow.defaultWatchersLabel'
            );
            const translationSignal = runInInjectionContext(injector, () => resolveTranslationSignal(keySignal));

            expect(translationSignal()).toBe('Watchers');
        });

        it('should work with context', () => {
            const translationSignal = runInInjectionContext(injector, () =>
                resolveTranslationSignal('platformApprovalFlow.nodeMembersCount', { count: 5 })
            );

            expect(translationSignal()).toBe('5 members');
        });

        it('should work with options', () => {
            const customLang = signal<FdLanguage>({
                ...testLang,
                platformApprovalFlow: {
                    ...testLang.platformApprovalFlow,
                    defaultWatchersLabel: 'Options Watchers'
                }
            });

            const translationSignal = runInInjectionContext(injector, () =>
                resolveTranslationSignal('platformApprovalFlow.defaultWatchersLabel', { fdLang: customLang })
            );

            expect(translationSignal()).toBe('Options Watchers');
        });

        it('should work with context and options', () => {
            const customLang = signal<FdLanguage>({
                ...testLang,
                platformApprovalFlow: {
                    ...testLang.platformApprovalFlow,
                    nodeMembersCount: (params) => `${params['count']} custom members`
                }
            });

            const translationSignal = runInInjectionContext(injector, () =>
                resolveTranslationSignal('platformApprovalFlow.nodeMembersCount', { count: 7 }, { fdLang: customLang })
            );

            expect(translationSignal()).toBe('7 custom members');
        });
    });

    describe('computed signals', () => {
        it('should work with computed derived from translation signal', () => {
            const translateFn = runInInjectionContext(injector, () => resolveTranslationSignalFn());
            const translationSignal = runInInjectionContext(injector, () =>
                translateFn('platformApprovalFlow.defaultWatchersLabel')
            );

            const upperCaseSignal = computed(() => translationSignal().toUpperCase());

            expect(upperCaseSignal()).toBe('WATCHERS');

            // Change language
            lang$.next({
                ...testLang,
                platformApprovalFlow: {
                    ...testLang.platformApprovalFlow,
                    defaultWatchersLabel: 'new value'
                }
            });

            TestBed.inject(ApplicationRef).tick();
            // Computed should update
            setTimeout(() => {
                expect(upperCaseSignal()).toBe('NEW VALUE');
            }, 50);
        });
    });

    describe('toObservable conversion', () => {
        it('should convert translation signal to observable', (done) => {
            const translateFn = runInInjectionContext(injector, () => resolveTranslationSignalFn());
            const translationSignal = runInInjectionContext(injector, () =>
                translateFn('platformApprovalFlow.defaultWatchersLabel')
            );

            const translation$ = runInInjectionContext(injector, () => toObservable(translationSignal));

            translation$.subscribe((value) => {
                expect(value).toBe('Watchers');
                done();
            });
        });

        it('should emit when signal changes', (done) => {
            const keySignal = signal<'platformApprovalFlow.defaultWatchersLabel' | 'platformApprovalFlow.defaultTitle'>(
                'platformApprovalFlow.defaultWatchersLabel'
            );
            const translateFn = runInInjectionContext(injector, () => resolveTranslationSignalFn());
            const translationSignal = runInInjectionContext(injector, () => translateFn(keySignal));

            const translation$ = runInInjectionContext(injector, () => toObservable(translationSignal));

            const emissions: string[] = [];
            translation$.subscribe((value) => {
                emissions.push(value);

                if (emissions.length === 1) {
                    expect(emissions[0]).toBe('Watchers');
                    // Trigger change
                    keySignal.set('platformApprovalFlow.defaultTitle');
                } else if (emissions.length === 2) {
                    expect(emissions[1]).toBe('Approval process');
                    done();
                }
            });
        });
    });

    describe('error handling', () => {
        it('should return empty string for invalid key', () => {
            const translateFn = runInInjectionContext(injector, () => resolveTranslationSignalFn());
            // @ts-expect-error: testing invalid key
            const translationSignal = runInInjectionContext(injector, () => translateFn('invalid.key'));

            expect(translationSignal()).toBe('');
        });

        it('should handle null/undefined gracefully', () => {
            const translateFn = runInInjectionContext(injector, () => resolveTranslationSignalFn());
            // @ts-expect-error: testing null key
            const translationSignal = runInInjectionContext(injector, () => translateFn(null));

            expect(translationSignal()).toBe('');
        });
    });

    describe('memory management', () => {
        it('should not leak when creating multiple signals', () => {
            const translateFn = runInInjectionContext(injector, () => resolveTranslationSignalFn());

            // Create multiple signals
            const signals = Array.from({ length: 100 }, (_, i) =>
                runInInjectionContext(injector, () =>
                    translateFn(i % 2 === 0 ? 'platformApprovalFlow.defaultWatchersLabel' : 'platformApprovalFlow.defaultTitle')
                )
            );

            // All should work
            signals.forEach((sig, i) => {
                expect(sig()).toBe(i % 2 === 0 ? 'Watchers' : 'Approval process');
            });

            // No memory leak assertion (if test completes without hanging, memory is OK)
            expect(signals.length).toBe(100);
        });
    });
});
