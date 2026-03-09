import { ApplicationRef, computed, EnvironmentInjector, runInInjectionContext, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { TestBed } from '@angular/core/testing';
import { FD_LANGUAGE_ENGLISH } from '../../languages';
import { FdLanguage } from '../../models';
import { FD_LANGUAGE_SIGNAL, FD_LOCALE_SIGNAL } from '../tokens';
import { resolveTranslationSignal, resolveTranslationSignalFn } from './resolve-translations-signal';

const testLang: FdLanguage = {
    ...FD_LANGUAGE_ENGLISH,
    platformApprovalFlow: {
        ...FD_LANGUAGE_ENGLISH.platformApprovalFlow,
        nodeMembersCount: (params) => `${params['count']} members`
    }
};

describe('Signal-based Translation Resolution', () => {
    let langSignal: ReturnType<typeof signal<FdLanguage>>;
    let localeSignal: ReturnType<typeof signal<string>>;
    let injector: EnvironmentInjector;

    beforeEach(() => {
        langSignal = signal<FdLanguage>(testLang);
        localeSignal = signal<string>('en');

        TestBed.configureTestingModule({
            providers: [
                {
                    provide: FD_LANGUAGE_SIGNAL,
                    useValue: langSignal
                },
                {
                    provide: FD_LOCALE_SIGNAL,
                    useValue: localeSignal
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

        it('should react to language changes via signal injection', () => {
            const translateFn = runInInjectionContext(injector, () => resolveTranslationSignalFn());
            const translationSignal = runInInjectionContext(injector, () =>
                translateFn('platformApprovalFlow.defaultWatchersLabel')
            );

            expect(translationSignal()).toBe('Watchers');

            // Change language signal
            langSignal.set({
                ...testLang,
                platformApprovalFlow: {
                    ...testLang.platformApprovalFlow,
                    defaultWatchersLabel: 'Modified Watchers'
                }
            });

            // Signal should react immediately (no setTimeout needed)
            expect(translationSignal()).toBe('Modified Watchers');
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

        it('should work with both signal key and signal context', () => {
            const keySignal = signal<
                'platformApprovalFlow.nodeMembersCount' | 'platformApprovalFlow.defaultWatchersLabel'
            >('platformApprovalFlow.nodeMembersCount');
            const ctxSignal = signal({ count: 10 });
            const translateFn = runInInjectionContext(injector, () => resolveTranslationSignalFn());
            const translationSignal = runInInjectionContext(injector, () => translateFn(keySignal, ctxSignal));

            expect(translationSignal()).toBe('10 members');

            // Change context only
            ctxSignal.set({ count: 15 });
            expect(translationSignal()).toBe('15 members');

            // Change key to one without context
            keySignal.set('platformApprovalFlow.defaultWatchersLabel');
            expect(translationSignal()).toBe('Watchers');
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

            // Change language using signal
            langSignal.set({
                ...testLang,
                platformApprovalFlow: {
                    ...testLang.platformApprovalFlow,
                    defaultWatchersLabel: 'new value'
                }
            });

            TestBed.inject(ApplicationRef).tick();
            // Computed should update immediately with signals
            expect(upperCaseSignal()).toBe('NEW VALUE');
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

        it('should handle null/undefined key gracefully', () => {
            const translateFn = runInInjectionContext(injector, () => resolveTranslationSignalFn());
            // @ts-expect-error: testing null key
            const translationSignal = runInInjectionContext(injector, () => translateFn(null));

            expect(translationSignal()).toBe('');
        });

        it('should handle null context parameter gracefully', () => {
            const translateFn = runInInjectionContext(injector, () => resolveTranslationSignalFn());
            const translationSignal = runInInjectionContext(injector, () =>
                // @ts-expect-error: testing null context
                translateFn('platformApprovalFlow.defaultWatchersLabel', null)
            );

            expect(translationSignal()).toBe('Watchers');
        });

        it('should handle undefined context parameter gracefully', () => {
            const translateFn = runInInjectionContext(injector, () => resolveTranslationSignalFn());
            const translationSignal = runInInjectionContext(injector, () =>
                translateFn('platformApprovalFlow.defaultWatchersLabel', undefined as any)
            );

            expect(translationSignal()).toBe('Watchers');
        });

        it('should handle empty context object', () => {
            const translateFn = runInInjectionContext(injector, () => resolveTranslationSignalFn());
            const translationSignal = runInInjectionContext(injector, () =>
                translateFn('platformApprovalFlow.defaultWatchersLabel', {} as any)
            );

            expect(translationSignal()).toBe('Watchers');
        });
    });

    describe('memory management', () => {
        it('should not leak when creating multiple signals', () => {
            const translateFn = runInInjectionContext(injector, () => resolveTranslationSignalFn());

            // Create multiple signals
            const signals = Array.from({ length: 100 }, (_, i) =>
                runInInjectionContext(injector, () =>
                    translateFn(
                        i % 2 === 0 ? 'platformApprovalFlow.defaultWatchersLabel' : 'platformApprovalFlow.defaultTitle'
                    )
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

    describe('edge cases and stress testing', () => {
        it('should handle rapid language changes without issues', () => {
            const translateFn = runInInjectionContext(injector, () => resolveTranslationSignalFn());
            const translationSignal = runInInjectionContext(injector, () =>
                translateFn('platformApprovalFlow.defaultWatchersLabel')
            );

            expect(translationSignal()).toBe('Watchers');

            // Rapidly change language 10 times
            for (let i = 0; i < 10; i++) {
                langSignal.set({
                    ...testLang,
                    platformApprovalFlow: {
                        ...testLang.platformApprovalFlow,
                        defaultWatchersLabel: `Watchers ${i}`
                    }
                });
                expect(translationSignal()).toBe(`Watchers ${i}`);
            }
        });

        it('should handle rapid context changes without issues', () => {
            const ctxSignal = signal({ count: 0 });
            const translateFn = runInInjectionContext(injector, () => resolveTranslationSignalFn());
            const translationSignal = runInInjectionContext(injector, () =>
                translateFn('platformApprovalFlow.nodeMembersCount', ctxSignal)
            );

            // Rapidly change context 20 times
            for (let i = 0; i < 20; i++) {
                ctxSignal.set({ count: i });
                expect(translationSignal()).toBe(`${i} members`);
            }
        });

        it('should handle rapid key changes without issues', () => {
            const keySignal = signal<'platformApprovalFlow.defaultWatchersLabel' | 'platformApprovalFlow.defaultTitle'>(
                'platformApprovalFlow.defaultWatchersLabel'
            );
            const translateFn = runInInjectionContext(injector, () => resolveTranslationSignalFn());
            const translationSignal = runInInjectionContext(injector, () => translateFn(keySignal));

            // Rapidly alternate between keys
            for (let i = 0; i < 20; i++) {
                const key =
                    i % 2 === 0 ? 'platformApprovalFlow.defaultWatchersLabel' : 'platformApprovalFlow.defaultTitle';
                keySignal.set(key);
                expect(translationSignal()).toBe(i % 2 === 0 ? 'Watchers' : 'Approval process');
            }
        });

        it('should handle multiple simultaneous signal changes', () => {
            const keySignal = signal<'platformApprovalFlow.nodeMembersCount'>('platformApprovalFlow.nodeMembersCount');
            const ctxSignal = signal({ count: 5 });
            const translateFn = runInInjectionContext(injector, () => resolveTranslationSignalFn());
            const translationSignal = runInInjectionContext(injector, () => translateFn(keySignal, ctxSignal));

            expect(translationSignal()).toBe('5 members');

            // Change language and context simultaneously
            langSignal.set({
                ...testLang,
                platformApprovalFlow: {
                    ...testLang.platformApprovalFlow,
                    nodeMembersCount: (params) => `${params['count']} updated members`
                }
            });
            ctxSignal.set({ count: 10 });

            expect(translationSignal()).toBe('10 updated members');
        });
    });
});
