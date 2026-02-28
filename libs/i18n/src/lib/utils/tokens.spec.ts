import { Component, computed, effect, inject, LOCALE_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { toObservable } from '@angular/core/rxjs-interop';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { FD_LANGUAGE_ENGLISH } from '../languages/english';
import { FdLanguage } from '../models';
import { FD_LANGUAGE, FD_LANGUAGE_SIGNAL, FD_LOCALE, FD_LOCALE_SIGNAL } from './tokens';

describe('Injection Tokens', () => {
    describe('FD_LANGUAGE_SIGNAL (Primary)', () => {
        it('should be defined as InjectionToken', () => {
            expect(FD_LANGUAGE_SIGNAL).toBeDefined();
            expect(FD_LANGUAGE_SIGNAL.toString()).toContain('Language signal');
        });

        it('should provide default factory with English language signal', () => {
            @Component({
                selector: 'fd-test',
                template: '',
                standalone: true
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
                template: '',
                standalone: true
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
                template: '',
                standalone: true
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
                template: '',
                standalone: true
            })
            class Test1Component {
                langSignal = inject(FD_LANGUAGE_SIGNAL);
            }

            @Component({
                selector: 'fd-test2',
                template: '',
                standalone: true
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
                template: '',
                standalone: true
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
                template: '',
                standalone: true
            })
            class TestComponent {
                localeSignal = inject(FD_LOCALE_SIGNAL);
            }

            TestBed.configureTestingModule({
                imports: [TestComponent],
                providers: [{ provide: LOCALE_ID, useValue: 'de-DE' }]
            });

            const fixture = TestBed.createComponent(TestComponent);
            const localeSignal = fixture.componentInstance.localeSignal;

            expect(localeSignal()).toBe('de-DE');
        });

        it('should be writable signal', () => {
            @Component({
                selector: 'fd-test',
                template: '',
                standalone: true
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
                template: '',
                standalone: true
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

            expect(fixture.componentInstance.upperLocale()).toBe('EN-US');
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
                template: '',
                standalone: true
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
                template: '',
                standalone: true
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
                template: '',
                standalone: true
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
                template: '',
                standalone: true
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
                standalone: true,
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
                standalone: true,
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
                template: '',
                standalone: true
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
            expect(locale).toBe('en-US');
        });

        it('should be injectable in components', () => {
            @Component({
                selector: 'fd-test',
                template: '',
                standalone: true
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
                template: '',
                standalone: true
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
                    }
                ]
            });

            const fixture = TestBed.createComponent(TestComponent);
            const locale$ = fixture.componentInstance.locale$;

            const locale = await firstValueFrom(locale$);
            expect(locale).toBe('de-DE');
        });

        it('should be overridable with custom provider', async () => {
            const customLocale$ = new BehaviorSubject('fr-FR');

            @Component({
                selector: 'fd-test',
                template: '',
                standalone: true
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
                template: '',
                standalone: true
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

        it('should work independently from FD_LANGUAGE', async () => {
            @Component({
                selector: 'fd-test',
                template: '',
                standalone: true
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
                    }
                ]
            });

            const fixture = TestBed.createComponent(TestComponent);

            const language = await firstValueFrom(fixture.componentInstance.lang$);
            const locale = await firstValueFrom(fixture.componentInstance.locale$);

            expect(language).toBe(FD_LANGUAGE_ENGLISH);
            expect(locale).toBe('ja-JP');
        });
    });

    describe('Token integration', () => {
        it('should both tokens work together in same component', async () => {
            @Component({
                selector: 'fd-test',
                template: '',
                standalone: true
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
                    }
                ]
            });

            const fixture = TestBed.createComponent(TestComponent);

            const language = await firstValueFrom(fixture.componentInstance.lang$);
            const locale = await firstValueFrom(fixture.componentInstance.locale$);

            expect(language.platformApprovalFlow.defaultWatchersLabel).toBe('Watchers');
            expect(locale).toBe('zh-CN');
        });

        it('should support providedIn root behavior', () => {
            // Both tokens should be providedIn: 'root' via factory
            // This means they should be available without explicit providers

            @Component({
                selector: 'fd-test1',
                template: '',
                standalone: true
            })
            class Test1Component {
                lang$ = inject(FD_LANGUAGE);
            }

            @Component({
                selector: 'fd-test2',
                template: '',
                standalone: true
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
});
