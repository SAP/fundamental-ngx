import { Component, computed, inject, LOCALE_ID, signal, WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { FD_LANGUAGE_ENGLISH } from '../languages/english';
import { FD_LANGUAGE_FRENCH } from '../languages/french';
import { FD_LANGUAGE_GERMAN } from '../languages/german';
import { FdLanguage } from '../models';
import { FD_LANGUAGE, FD_LANGUAGE_AUTO_DETECT, FD_LANGUAGE_SIGNAL, FD_LOCALE, FD_LOCALE_SIGNAL } from './tokens';

describe('Injection Tokens', () => {
    describe('FD_LANGUAGE_SIGNAL (Primary)', () => {
        it('should be defined as InjectionToken', () => {
            expect(FD_LANGUAGE_SIGNAL).toBeDefined();
            expect(FD_LANGUAGE_SIGNAL.toString()).toContain('Language signal');
        });

        it('should provide default factory with English language signal', () => {
            @Component({
                selector: 'fd-test',
                template: ''
            })
            class TestComponent {
                langSignal = inject(FD_LANGUAGE_SIGNAL);
            }

            TestBed.configureTestingModule({
                imports: [TestComponent]
            });

            const fixture = TestBed.createComponent(TestComponent);
            const langSignal = fixture.componentInstance.langSignal;

            expect(langSignal()).toBe(FD_LANGUAGE_ENGLISH);
            expect(langSignal().platformApprovalFlow.defaultWatchersLabel).toBe('Watchers');
        });

        it('should be writable signal', () => {
            @Component({
                selector: 'fd-test',
                template: ''
            })
            class TestComponent {
                langSignal = inject(FD_LANGUAGE_SIGNAL);
            }

            TestBed.configureTestingModule({
                imports: [TestComponent]
            });

            const fixture = TestBed.createComponent(TestComponent);
            const langSignal = fixture.componentInstance.langSignal;

            const customLang: FdLanguage = {
                ...FD_LANGUAGE_ENGLISH,
                platformApprovalFlow: {
                    ...FD_LANGUAGE_ENGLISH.platformApprovalFlow,
                    defaultWatchersLabel: 'Custom Watchers'
                }
            };

            langSignal.set(customLang);
            expect(langSignal().platformApprovalFlow.defaultWatchersLabel).toBe('Custom Watchers');
        });

        it('should work with computed', () => {
            @Component({
                selector: 'fd-test',
                template: ''
            })
            class TestComponent {
                langSignal = inject(FD_LANGUAGE_SIGNAL);
                watchersLabel = computed(() => this.langSignal().platformApprovalFlow.defaultWatchersLabel);
            }

            TestBed.configureTestingModule({
                imports: [TestComponent]
            });

            const fixture = TestBed.createComponent(TestComponent);

            expect(fixture.componentInstance.watchersLabel()).toBe('Watchers');
        });

        it('should be injectable as singleton across components', () => {
            @Component({
                selector: 'fd-test1',
                template: ''
            })
            class Test1Component {
                langSignal = inject(FD_LANGUAGE_SIGNAL);
            }

            @Component({
                selector: 'fd-test2',
                template: ''
            })
            class Test2Component {
                langSignal = inject(FD_LANGUAGE_SIGNAL);
            }

            TestBed.configureTestingModule({
                imports: [Test1Component, Test2Component]
            });

            const fixture1 = TestBed.createComponent(Test1Component);
            const fixture2 = TestBed.createComponent(Test2Component);

            // Both should get same signal instance
            expect(fixture1.componentInstance.langSignal).toBe(fixture2.componentInstance.langSignal);
        });

        it('should react to signal changes', () => {
            @Component({
                selector: 'fd-test',
                template: ''
            })
            class TestComponent {
                langSignal = inject(FD_LANGUAGE_SIGNAL);
                label = computed(() => this.langSignal().platformApprovalFlow.defaultWatchersLabel);
            }

            TestBed.configureTestingModule({
                imports: [TestComponent]
            });

            const fixture = TestBed.createComponent(TestComponent);
            const component = fixture.componentInstance;

            expect(component.label()).toBe('Watchers');

            // Update signal
            component.langSignal.set({
                ...FD_LANGUAGE_ENGLISH,
                platformApprovalFlow: {
                    ...FD_LANGUAGE_ENGLISH.platformApprovalFlow,
                    defaultWatchersLabel: 'Updated'
                }
            });

            // Computed should automatically update
            expect(component.label()).toBe('Updated');
        });
    });

    describe('FD_LOCALE_SIGNAL (Primary)', () => {
        it('should be defined as InjectionToken', () => {
            expect(FD_LOCALE_SIGNAL).toBeDefined();
            expect(FD_LOCALE_SIGNAL.toString()).toContain('Locale signal');
        });

        it('should provide default factory with LOCALE_ID signal', () => {
            @Component({
                selector: 'fd-test',
                template: ''
            })
            class TestComponent {
                localeSignal = inject(FD_LOCALE_SIGNAL);
            }

            TestBed.configureTestingModule({
                imports: [TestComponent],
                providers: [
                    { provide: LOCALE_ID, useValue: 'de-DE' },
                    { provide: FD_LANGUAGE_AUTO_DETECT, useValue: false }
                ]
            });

            const fixture = TestBed.createComponent(TestComponent);
            const localeSignal = fixture.componentInstance.localeSignal;

            expect(localeSignal()).toBe('en');
        });

        it('should be writable signal', () => {
            @Component({
                selector: 'fd-test',
                template: ''
            })
            class TestComponent {
                localeSignal = inject(FD_LOCALE_SIGNAL);
            }

            TestBed.configureTestingModule({
                imports: [TestComponent]
            });

            const fixture = TestBed.createComponent(TestComponent);
            const localeSignal = fixture.componentInstance.localeSignal;

            localeSignal.set('fr-FR');
            expect(localeSignal()).toBe('fr-FR');
        });

        it('should work with computed', () => {
            @Component({
                selector: 'fd-test',
                template: ''
            })
            class TestComponent {
                localeSignal = inject(FD_LOCALE_SIGNAL);
                upperLocale = computed(() => this.localeSignal().toUpperCase());
            }

            TestBed.configureTestingModule({
                imports: [TestComponent],
                providers: [{ provide: LOCALE_ID, useValue: 'en-us' }]
            });

            const fixture = TestBed.createComponent(TestComponent);

            expect(fixture.componentInstance.upperLocale()).toBe('EN');
        });

        it('should derive locale from language', () => {
            @Component({
                selector: 'fd-test',
                template: ''
            })
            class TestComponent {
                langSignal = inject(FD_LANGUAGE_SIGNAL);
                localeSignal = inject(FD_LOCALE_SIGNAL);
            }

            TestBed.configureTestingModule({
                imports: [TestComponent]
            });

            const fixture = TestBed.createComponent(TestComponent);
            fixture.componentInstance.langSignal.set(FD_LANGUAGE_GERMAN);

            expect(fixture.componentInstance.localeSignal()).toBe('de');
        });

        it('should update locale when language changes', () => {
            @Component({
                selector: 'fd-test',
                template: ''
            })
            class TestComponent {
                langSignal = inject(FD_LANGUAGE_SIGNAL);
                localeSignal = inject(FD_LOCALE_SIGNAL);
            }

            TestBed.configureTestingModule({
                imports: [TestComponent]
            });

            const fixture = TestBed.createComponent(TestComponent);
            fixture.componentInstance.langSignal.set(FD_LANGUAGE_GERMAN);
            expect(fixture.componentInstance.localeSignal()).toBe('de');

            fixture.componentInstance.langSignal.set(FD_LANGUAGE_FRENCH);
            expect(fixture.componentInstance.localeSignal()).toBe('fr');
        });

        it('should allow locale override via set', () => {
            @Component({
                selector: 'fd-test',
                template: ''
            })
            class TestComponent {
                langSignal = inject(FD_LANGUAGE_SIGNAL);
                localeSignal = inject(FD_LOCALE_SIGNAL);
            }

            TestBed.configureTestingModule({
                imports: [TestComponent]
            });

            const fixture = TestBed.createComponent(TestComponent);
            fixture.componentInstance.langSignal.set(FD_LANGUAGE_GERMAN);
            fixture.componentInstance.localeSignal.set('ja-JP');

            expect(fixture.componentInstance.localeSignal()).toBe('ja-JP');
        });

        it('should reset locale on language change after override', () => {
            @Component({
                selector: 'fd-test',
                template: ''
            })
            class TestComponent {
                langSignal = inject(FD_LANGUAGE_SIGNAL);
                localeSignal = inject(FD_LOCALE_SIGNAL);
            }

            TestBed.configureTestingModule({
                imports: [TestComponent]
            });

            const fixture = TestBed.createComponent(TestComponent);
            fixture.componentInstance.langSignal.set(FD_LANGUAGE_GERMAN);
            fixture.componentInstance.localeSignal.set('ja-JP');
            expect(fixture.componentInstance.localeSignal()).toBe('ja-JP');

            fixture.componentInstance.langSignal.set(FD_LANGUAGE_FRENCH);
            expect(fixture.componentInstance.localeSignal()).toBe('fr');
        });

        it('should fall back to LOCALE_ID when language has no locale field', () => {
            @Component({
                selector: 'fd-test',
                template: ''
            })
            class TestComponent {
                langSignal = inject(FD_LANGUAGE_SIGNAL);
                localeSignal = inject(FD_LOCALE_SIGNAL);
            }

            TestBed.configureTestingModule({
                imports: [TestComponent],
                providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }]
            });

            const fixture = TestBed.createComponent(TestComponent);
            // Set a language without locale field
            const langWithoutLocale: FdLanguage = { ...FD_LANGUAGE_ENGLISH, locale: undefined };
            fixture.componentInstance.langSignal.set(langWithoutLocale);

            expect(fixture.componentInstance.localeSignal()).toBe('pt-BR');
        });

        it('should not override custom FD_LOCALE_SIGNAL provider', () => {
            const customLocaleSignal: WritableSignal<string> = signal('custom-locale');

            @Component({
                selector: 'fd-test',
                template: ''
            })
            class TestComponent {
                localeSignal = inject(FD_LOCALE_SIGNAL);
            }

            TestBed.configureTestingModule({
                imports: [TestComponent],
                providers: [{ provide: FD_LOCALE_SIGNAL, useValue: customLocaleSignal }]
            });

            const fixture = TestBed.createComponent(TestComponent);
            expect(fixture.componentInstance.localeSignal()).toBe('custom-locale');
        });
    });

    describe('FD_LANGUAGE (Deprecated Observable)', () => {
        it('should be defined as InjectionToken', () => {
            expect(FD_LANGUAGE).toBeDefined();
            expect(FD_LANGUAGE.toString()).toContain('deprecated');
        });

        it('should provide default factory with English language', async () => {
            @Component({
                selector: 'fd-test',
                template: ''
            })
            class TestComponent {
                lang$ = inject(FD_LANGUAGE);
            }

            TestBed.configureTestingModule({
                imports: [TestComponent]
            });

            const fixture = TestBed.createComponent(TestComponent);
            const lang$ = fixture.componentInstance.lang$;

            expect(lang$).toBeInstanceOf(Observable);

            const language = await firstValueFrom(lang$);
            expect(language).toBe(FD_LANGUAGE_ENGLISH);
            expect(language.platformApprovalFlow.defaultWatchersLabel).toBe('Watchers');
        });

        it('should be injectable in components', () => {
            @Component({
                selector: 'fd-test',
                template: ''
            })
            class TestComponent {
                lang$ = inject(FD_LANGUAGE);
            }

            TestBed.configureTestingModule({
                imports: [TestComponent]
            });

            const fixture = TestBed.createComponent(TestComponent);

            expect(fixture.componentInstance.lang$).toBeDefined();
            expect(fixture.componentInstance.lang$).toBeInstanceOf(Observable);
        });

        it('should be overridable with custom provider', async () => {
            const customLang: FdLanguage = {
                ...FD_LANGUAGE_ENGLISH,
                platformApprovalFlow: {
                    ...FD_LANGUAGE_ENGLISH.platformApprovalFlow,
                    defaultWatchersLabel: 'Custom Language'
                }
            };
            const customLang$ = new BehaviorSubject(customLang);

            @Component({
                selector: 'fd-test',
                template: ''
            })
            class TestComponent {
                lang$ = inject(FD_LANGUAGE);
            }

            TestBed.configureTestingModule({
                imports: [TestComponent],
                providers: [
                    {
                        provide: FD_LANGUAGE,
                        useValue: customLang$
                    }
                ]
            });

            const fixture = TestBed.createComponent(TestComponent);
            const lang$ = fixture.componentInstance.lang$;

            const language = await firstValueFrom(lang$);
            expect(language.platformApprovalFlow.defaultWatchersLabel).toBe('Custom Language');
        });

        it('should provide observable that can emit multiple values', (done) => {
            const lang$ = new BehaviorSubject<FdLanguage>(FD_LANGUAGE_ENGLISH);

            @Component({
                selector: 'fd-test',
                template: ''
            })
            class TestComponent {
                lang$ = inject(FD_LANGUAGE);
            }

            TestBed.configureTestingModule({
                imports: [TestComponent],
                providers: [
                    {
                        provide: FD_LANGUAGE,
                        useValue: lang$
                    }
                ]
            });

            const fixture = TestBed.createComponent(TestComponent);
            const injectedLang$ = fixture.componentInstance.lang$;

            const emissions: string[] = [];
            injectedLang$.subscribe((lang) => {
                emissions.push(lang.platformApprovalFlow.defaultWatchersLabel);

                if (emissions.length === 1) {
                    expect(emissions[0]).toBe('Watchers');

                    // Emit new value
                    lang$.next({
                        ...FD_LANGUAGE_ENGLISH,
                        platformApprovalFlow: {
                            ...FD_LANGUAGE_ENGLISH.platformApprovalFlow,
                            defaultWatchersLabel: 'Updated'
                        }
                    });
                } else if (emissions.length === 2) {
                    expect(emissions[1]).toBe('Updated');
                    done();
                }
            });
        });

        it('should work with hierarchical injection', async () => {
            const parentLang$ = new BehaviorSubject<FdLanguage>(FD_LANGUAGE_ENGLISH);
            const childLang$ = new BehaviorSubject<FdLanguage>({
                ...FD_LANGUAGE_ENGLISH,
                platformApprovalFlow: {
                    ...FD_LANGUAGE_ENGLISH.platformApprovalFlow,
                    defaultWatchersLabel: 'Child Override'
                }
            });

            @Component({
                selector: 'fd-child',
                template: '',
                providers: [
                    {
                        provide: FD_LANGUAGE,
                        useValue: childLang$
                    }
                ]
            })
            class ChildComponent {
                lang$ = inject(FD_LANGUAGE);
            }

            @Component({
                selector: 'fd-parent',
                template: '<fd-child />',
                imports: [ChildComponent]
            })
            class ParentComponent {
                lang$ = inject(FD_LANGUAGE);
            }

            TestBed.configureTestingModule({
                imports: [ParentComponent],
                providers: [
                    {
                        provide: FD_LANGUAGE,
                        useValue: parentLang$
                    }
                ]
            });

            const fixture = TestBed.createComponent(ParentComponent);
            fixture.detectChanges();

            const parentLanguage = await firstValueFrom(fixture.componentInstance.lang$);
            expect(parentLanguage.platformApprovalFlow.defaultWatchersLabel).toBe('Watchers');

            const childDebugElement = fixture.debugElement.children[0];
            const injectedChildLang$ = childDebugElement.injector.get(FD_LANGUAGE);
            const childLanguage = await firstValueFrom(injectedChildLang$);
            expect(childLanguage.platformApprovalFlow.defaultWatchersLabel).toBe('Child Override');
        });
    });

    describe('FD_LOCALE', () => {
        it('should be defined as InjectionToken', () => {
            expect(FD_LOCALE).toBeDefined();
            expect(FD_LOCALE.toString()).toContain('deprecated');
        });

        it('should provide default factory with LOCALE_ID', async () => {
            @Component({
                selector: 'fd-test',
                template: ''
            })
            class TestComponent {
                locale$ = inject(FD_LOCALE);
            }

            TestBed.configureTestingModule({
                imports: [TestComponent],
                providers: [
                    {
                        provide: LOCALE_ID,
                        useValue: 'en-US'
                    }
                ]
            });

            const fixture = TestBed.createComponent(TestComponent);
            const locale$ = fixture.componentInstance.locale$;

            expect(locale$).toBeInstanceOf(Observable);

            const locale = await firstValueFrom(locale$);
            expect(locale).toBe('en');
        });

        it('should be injectable in components', () => {
            @Component({
                selector: 'fd-test',
                template: ''
            })
            class TestComponent {
                locale$ = inject(FD_LOCALE);
            }

            TestBed.configureTestingModule({
                imports: [TestComponent]
            });

            const fixture = TestBed.createComponent(TestComponent);

            expect(fixture.componentInstance.locale$).toBeDefined();
            expect(fixture.componentInstance.locale$).toBeInstanceOf(Observable);
        });

        it('should use custom LOCALE_ID when provided', async () => {
            @Component({
                selector: 'fd-test',
                template: ''
            })
            class TestComponent {
                locale$ = inject(FD_LOCALE);
            }

            TestBed.configureTestingModule({
                imports: [TestComponent],
                providers: [
                    {
                        provide: LOCALE_ID,
                        useValue: 'de-DE'
                    },
                    { provide: FD_LANGUAGE_AUTO_DETECT, useValue: false }
                ]
            });

            const fixture = TestBed.createComponent(TestComponent);
            const locale$ = fixture.componentInstance.locale$;

            const locale = await firstValueFrom(locale$);
            expect(locale).toBe('en');
        });

        it('should be overridable with custom provider', async () => {
            const customLocale$ = new BehaviorSubject('fr-FR');

            @Component({
                selector: 'fd-test',
                template: ''
            })
            class TestComponent {
                locale$ = inject(FD_LOCALE);
            }

            TestBed.configureTestingModule({
                imports: [TestComponent],
                providers: [
                    {
                        provide: FD_LOCALE,
                        useValue: customLocale$
                    }
                ]
            });

            const fixture = TestBed.createComponent(TestComponent);
            const locale$ = fixture.componentInstance.locale$;

            const locale = await firstValueFrom(locale$);
            expect(locale).toBe('fr-FR');
        });

        it('should provide observable that can emit multiple values', (done) => {
            const locale$ = new BehaviorSubject('en-US');

            @Component({
                selector: 'fd-test',
                template: ''
            })
            class TestComponent {
                locale$ = inject(FD_LOCALE);
            }

            TestBed.configureTestingModule({
                imports: [TestComponent],
                providers: [
                    {
                        provide: FD_LOCALE,
                        useValue: locale$
                    }
                ]
            });

            const fixture = TestBed.createComponent(TestComponent);
            const injectedLocale$ = fixture.componentInstance.locale$;

            const emissions: string[] = [];
            injectedLocale$.subscribe((locale) => {
                emissions.push(locale);

                if (emissions.length === 1) {
                    expect(emissions[0]).toBe('en-US');

                    // Emit new value
                    locale$.next('es-ES');
                } else if (emissions.length === 2) {
                    expect(emissions[1]).toBe('es-ES');
                    done();
                }
            });
        });

        it('should derive locale from FD_LANGUAGE', async () => {
            @Component({
                selector: 'fd-test',
                template: ''
            })
            class TestComponent {
                lang$ = inject(FD_LANGUAGE);
                locale$ = inject(FD_LOCALE);
            }

            TestBed.configureTestingModule({
                imports: [TestComponent],
                providers: [
                    {
                        provide: LOCALE_ID,
                        useValue: 'ja-JP'
                    },
                    { provide: FD_LANGUAGE_AUTO_DETECT, useValue: false }
                ]
            });

            const fixture = TestBed.createComponent(TestComponent);

            const language = await firstValueFrom(fixture.componentInstance.lang$);
            const locale = await firstValueFrom(fixture.componentInstance.locale$);

            expect(language).toBe(FD_LANGUAGE_ENGLISH);
            expect(locale).toBe('en');
        });
    });

    describe('Token integration', () => {
        it('should both tokens work together in same component', async () => {
            @Component({
                selector: 'fd-test',
                template: ''
            })
            class TestComponent {
                lang$ = inject(FD_LANGUAGE);
                locale$ = inject(FD_LOCALE);
            }

            TestBed.configureTestingModule({
                imports: [TestComponent],
                providers: [
                    {
                        provide: LOCALE_ID,
                        useValue: 'zh-CN'
                    },
                    { provide: FD_LANGUAGE_AUTO_DETECT, useValue: false }
                ]
            });

            const fixture = TestBed.createComponent(TestComponent);

            const language = await firstValueFrom(fixture.componentInstance.lang$);
            const locale = await firstValueFrom(fixture.componentInstance.locale$);

            expect(language.platformApprovalFlow.defaultWatchersLabel).toBe('Watchers');
            expect(locale).toBe('en');
        });

        it('should support providedIn root behavior', () => {
            // Both tokens should be providedIn: 'root' via factory
            // This means they should be available without explicit providers

            @Component({
                selector: 'fd-test1',
                template: ''
            })
            class Test1Component {
                lang$ = inject(FD_LANGUAGE);
            }

            @Component({
                selector: 'fd-test2',
                template: ''
            })
            class Test2Component {
                lang$ = inject(FD_LANGUAGE);
            }

            TestBed.configureTestingModule({
                imports: [Test1Component, Test2Component]
            });

            const fixture1 = TestBed.createComponent(Test1Component);
            const fixture2 = TestBed.createComponent(Test2Component);

            // Both should get the same singleton instance
            expect(fixture1.componentInstance.lang$).toBe(fixture2.componentInstance.lang$);
        });
    });

    describe('FD_LANGUAGE_AUTO_DETECT', () => {
        it('should default to true', () => {
            @Component({
                selector: 'fd-test',
                template: ''
            })
            class TestComponent {
                autoDetect = inject(FD_LANGUAGE_AUTO_DETECT);
            }

            TestBed.configureTestingModule({
                imports: [TestComponent]
            });

            const fixture = TestBed.createComponent(TestComponent);
            expect(fixture.componentInstance.autoDetect).toBe(true);
        });

        it('should auto-detect German when LOCALE_ID is de-DE', () => {
            @Component({
                selector: 'fd-test',
                template: ''
            })
            class TestComponent {
                langSignal = inject(FD_LANGUAGE_SIGNAL);
            }

            TestBed.configureTestingModule({
                imports: [TestComponent],
                providers: [{ provide: LOCALE_ID, useValue: 'de-DE' }]
            });

            const fixture = TestBed.createComponent(TestComponent);
            expect(fixture.componentInstance.langSignal()).toBe(FD_LANGUAGE_GERMAN);
        });

        it('should fall back to English for unsupported locale', () => {
            @Component({
                selector: 'fd-test',
                template: ''
            })
            class TestComponent {
                langSignal = inject(FD_LANGUAGE_SIGNAL);
            }

            TestBed.configureTestingModule({
                imports: [TestComponent],
                providers: [{ provide: LOCALE_ID, useValue: 'sw-KE' }]
            });

            const fixture = TestBed.createComponent(TestComponent);
            expect(fixture.componentInstance.langSignal()).toBe(FD_LANGUAGE_ENGLISH);
        });

        it('should use English when auto-detect is disabled regardless of LOCALE_ID', () => {
            @Component({
                selector: 'fd-test',
                template: ''
            })
            class TestComponent {
                langSignal = inject(FD_LANGUAGE_SIGNAL);
            }

            TestBed.configureTestingModule({
                imports: [TestComponent],
                providers: [
                    { provide: LOCALE_ID, useValue: 'de-DE' },
                    { provide: FD_LANGUAGE_AUTO_DETECT, useValue: false }
                ]
            });

            const fixture = TestBed.createComponent(TestComponent);
            expect(fixture.componentInstance.langSignal()).toBe(FD_LANGUAGE_ENGLISH);
        });

        it('should remain writable after auto-detection', () => {
            @Component({
                selector: 'fd-test',
                template: ''
            })
            class TestComponent {
                langSignal = inject(FD_LANGUAGE_SIGNAL);
            }

            TestBed.configureTestingModule({
                imports: [TestComponent],
                providers: [{ provide: LOCALE_ID, useValue: 'de-DE' }]
            });

            const fixture = TestBed.createComponent(TestComponent);
            expect(fixture.componentInstance.langSignal()).toBe(FD_LANGUAGE_GERMAN);

            fixture.componentInstance.langSignal.set(FD_LANGUAGE_FRENCH);
            expect(fixture.componentInstance.langSignal()).toBe(FD_LANGUAGE_FRENCH);
        });

        it('should derive locale from auto-detected language end-to-end', () => {
            @Component({
                selector: 'fd-test',
                template: ''
            })
            class TestComponent {
                langSignal = inject(FD_LANGUAGE_SIGNAL);
                localeSignal = inject(FD_LOCALE_SIGNAL);
            }

            TestBed.configureTestingModule({
                imports: [TestComponent],
                providers: [{ provide: LOCALE_ID, useValue: 'de-DE' }]
            });

            const fixture = TestBed.createComponent(TestComponent);
            expect(fixture.componentInstance.langSignal()).toBe(FD_LANGUAGE_GERMAN);
            expect(fixture.componentInstance.localeSignal()).toBe('de');
        });
    });
});
