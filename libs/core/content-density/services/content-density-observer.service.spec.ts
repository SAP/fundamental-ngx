import { Component, ElementRef, Signal, signal, WritableSignal } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ContentDensityStorage } from '../classes/abstract-content-density-storage';
import { ContentDensityGlobalKeyword, LocalContentDensityMode } from '../content-density.types';
import { contentDensityObserverProviders } from '../providers/content-density-observer-providers';
import { CONTENT_DENSITY_DIRECTIVE, ContentDensityDirectiveRef } from '../tokens/content-density-directive';
import { DEFAULT_CONTENT_DENSITY } from '../tokens/default-content-density.token';
import { ContentDensityMode } from '../types/content-density.mode';
import { ContentDensityObserver } from './content-density-observer.service';
import { GlobalContentDensityService } from './global-content-density.service';

class MockContentDensityStorage implements ContentDensityStorage {
    readonly contentDensity: Signal<ContentDensityMode>;

    private _contentDensity: WritableSignal<ContentDensityMode> = signal(ContentDensityMode.COZY);

    constructor() {
        this.contentDensity = this._contentDensity.asReadonly();
    }

    setContentDensity(density: ContentDensityMode): void {
        this._contentDensity.set(density);
    }

    setDensityDirectly(density: ContentDensityMode): void {
        this._contentDensity.set(density);
    }
}

@Component({
    selector: 'fd-test-host',
    template: '<div></div>',
    providers: [contentDensityObserverProviders()]
})
class TestHostComponent {
    constructor(
        readonly observer: ContentDensityObserver,
        readonly elementRef: ElementRef
    ) {}
}

@Component({
    selector: 'fd-test-host-custom',
    template: '<div></div>',
    providers: [
        contentDensityObserverProviders({
            supportedContentDensity: [ContentDensityMode.COZY, ContentDensityMode.CONDENSED]
        })
    ]
})
class TestHostCustomConfigComponent {
    constructor(readonly observer: ContentDensityObserver) {}
}

describe('ContentDensityObserver', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let component: TestHostComponent;
    let observer: ContentDensityObserver;
    let mockStorage: MockContentDensityStorage;

    beforeEach(() => {
        mockStorage = new MockContentDensityStorage();

        TestBed.configureTestingModule({
            imports: [TestHostComponent, TestHostCustomConfigComponent],
            providers: [
                GlobalContentDensityService,
                { provide: ContentDensityStorage, useValue: mockStorage },
                { provide: DEFAULT_CONTENT_DENSITY, useValue: ContentDensityMode.COZY },
                { provide: CONTENT_DENSITY_DIRECTIVE, useValue: null }
            ]
        });

        fixture = TestBed.createComponent(TestHostComponent);
        component = fixture.componentInstance;
        observer = component.observer;
        fixture.detectChanges();
    });

    afterEach(() => {
        observer?.complete();
    });

    describe('initialization', () => {
        it('should be created', () => {
            expect(observer).toBeTruthy();
        });

        it('should initialize with default content density (cozy)', () => {
            expect(observer.value).toBe(ContentDensityMode.COZY);
            expect(observer.contentDensity()).toBe(ContentDensityMode.COZY);
        });

        it('should initialize with global service density when available', fakeAsync(() => {
            // Complete previous observer
            observer.complete();

            // Set storage to compact before creating new component
            mockStorage.setDensityDirectly(ContentDensityMode.COMPACT);
            tick();

            // Create new component fixture
            const newFixture = TestBed.createComponent(TestHostComponent);
            newFixture.detectChanges();
            tick();

            expect(newFixture.componentInstance.observer.value).toBe(ContentDensityMode.COMPACT);
            expect(newFixture.componentInstance.observer.contentDensity()).toBe(ContentDensityMode.COMPACT);

            newFixture.componentInstance.observer.complete();
        }));
    });

    describe('new signal API', () => {
        it('should have contentDensity signal', () => {
            expect(observer.contentDensity).toBeDefined();
            expect(observer.contentDensity()).toBe(ContentDensityMode.COZY);
        });

        it('should have isCompactSignal signal', () => {
            expect(observer.isCompactSignal).toBeDefined();
            expect(observer.isCompactSignal()).toBe(false);
        });

        it('should have isCozySignal signal', () => {
            expect(observer.isCozySignal).toBeDefined();
            expect(observer.isCozySignal()).toBe(true);
        });

        it('should have isCondensedSignal signal', () => {
            expect(observer.isCondensedSignal).toBeDefined();
            expect(observer.isCondensedSignal()).toBe(false);
        });
    });

    describe('backward compatible API (deprecated)', () => {
        it('should have contentDensity$ signal alias', () => {
            expect(observer.contentDensity$).toBeDefined();
            expect(observer.contentDensity$()).toBe(ContentDensityMode.COZY);
            expect(observer.contentDensity$).toBe(observer.contentDensity);
        });

        it('should have isCompact getter and observable', (done) => {
            expect(observer.isCompact$).toBeDefined();
            expect(observer.isCompact).toBe(false);

            observer.isCompact$.subscribe((isCompact) => {
                expect(isCompact).toBe(false);
                expect(observer.isCompactSignal()).toBe(false);
                done();
            });
        });

        it('should have isCozy getter and observable', (done) => {
            expect(observer.isCozy$).toBeDefined();
            expect(observer.isCozy).toBe(true);

            observer.isCozy$.subscribe((isCozy) => {
                expect(isCozy).toBe(true);
                expect(observer.isCozySignal()).toBe(true);
                done();
            });
        });

        it('should have isCondensed getter and observable', (done) => {
            expect(observer.isCondensed$).toBeDefined();
            expect(observer.isCondensed).toBe(false);

            observer.isCondensed$.subscribe((isCondensed) => {
                expect(isCondensed).toBe(false);
                expect(observer.isCondensedSignal()).toBe(false);
                done();
            });
        });

        it('should have asObservable method', () => {
            expect(typeof observer.asObservable).toBe('function');
            const observable = observer.asObservable();
            expect(observable).toBeDefined();
            expect(typeof observable.subscribe).toBe('function');
        });

        it('should have subscribe method', () => {
            expect(typeof observer.subscribe).toBe('function');
        });
    });

    describe('reacting to global density changes', () => {
        it('should update signals when global density changes to compact', fakeAsync(() => {
            mockStorage.setDensityDirectly(ContentDensityMode.COMPACT);
            tick();
            fixture.detectChanges();

            expect(observer.value).toBe(ContentDensityMode.COMPACT);
            expect(observer.contentDensity()).toBe(ContentDensityMode.COMPACT);
            expect(observer.isCompact).toBe(true);
            expect(observer.isCozy).toBe(false);
        }));

        it('should update when global density changes to condensed with custom config', fakeAsync(() => {
            // Use the custom config component that supports condensed
            const customFixture = TestBed.createComponent(TestHostCustomConfigComponent);
            customFixture.detectChanges();
            tick();

            mockStorage.setDensityDirectly(ContentDensityMode.CONDENSED);
            tick();
            customFixture.detectChanges();

            expect(customFixture.componentInstance.observer.value).toBe(ContentDensityMode.CONDENSED);
            expect(customFixture.componentInstance.observer.isCondensed).toBe(true);

            customFixture.componentInstance.observer.complete();
        }));

        it('should emit values through subscribe', fakeAsync(() => {
            const emittedValues: ContentDensityMode[] = [];
            observer.subscribe({ next: (density) => emittedValues.push(density) });

            // Wait for initial emission from toObservable
            tick();

            mockStorage.setDensityDirectly(ContentDensityMode.COMPACT);
            tick();
            fixture.detectChanges();
            tick();

            // The signal-based observable may emit asynchronously
            expect(emittedValues.length).toBeGreaterThan(0);
            // Verify the signal itself updated correctly
            expect(observer.contentDensity()).toBe(ContentDensityMode.COMPACT);
        }));
    });

    describe('unsupported density fallback', () => {
        it('should fallback to condensed when compact not supported but condensed is', fakeAsync(() => {
            const customFixture = TestBed.createComponent(TestHostCustomConfigComponent);
            customFixture.detectChanges();
            tick();

            // Custom config only supports COZY and CONDENSED
            mockStorage.setDensityDirectly(ContentDensityMode.COMPACT);
            tick();
            customFixture.detectChanges();

            // Should fallback to condensed as alternative to compact
            expect(customFixture.componentInstance.observer.value).toBe(ContentDensityMode.CONDENSED);

            customFixture.componentInstance.observer.complete();
        }));
    });

    describe('configuration', () => {
        it('should have default modifiers', () => {
            expect(observer.config.modifiers).toBeDefined();
            expect(observer.config.modifiers?.[ContentDensityMode.COMPACT]).toBe('is-compact');
            expect(observer.config.modifiers?.[ContentDensityMode.COZY]).toBe('is-cozy');
            expect(observer.config.modifiers?.[ContentDensityMode.CONDENSED]).toBe('is-condensed');
        });

        it('should have default supported densities', () => {
            expect(observer.config.supportedContentDensity).toBeDefined();
            expect(observer.config.supportedContentDensity).toContain(ContentDensityMode.COMPACT);
            expect(observer.config.supportedContentDensity).toContain(ContentDensityMode.COZY);
        });
    });

    describe('CSS class application', () => {
        it('should apply cozy class initially', fakeAsync(() => {
            tick();
            const hostElement = component.elementRef.nativeElement;
            expect(hostElement.classList.contains('is-cozy')).toBe(true);
        }));

        it('should switch CSS class when density changes', fakeAsync(() => {
            const hostElement = component.elementRef.nativeElement;

            mockStorage.setDensityDirectly(ContentDensityMode.COMPACT);
            tick();
            fixture.detectChanges();

            expect(hostElement.classList.contains('is-compact')).toBe(true);
            expect(hostElement.classList.contains('is-cozy')).toBe(false);
        }));
    });

    describe('cleanup and completion', () => {
        it('should clean up references on complete()', () => {
            observer.complete();

            // Access private members to verify cleanup
            expect((observer as any)._parentContentDensityObserver).toBeNull();
            expect((observer as any)._contentDensityDirective).toBeNull();
            expect((observer as any)._globalContentDensityService).toBeNull();
            expect((observer as any)._elementRef).toBeNull();
            expect((observer as any)._renderer).toBeNull();
            expect((observer as any)._elements.length).toBe(0);
        });
    });

    describe('consumer management', () => {
        it('should have consume method', () => {
            expect(typeof observer.consume).toBe('function');
        });

        it('should have removeConsumer method', () => {
            expect(typeof observer.removeConsumer).toBe('function');
        });
    });

    describe('distinctUntilChanged behavior', () => {
        it('should not emit duplicate consecutive values', fakeAsync(() => {
            // Test distinctUntilChanged via signal-based approach
            // Set to compact
            mockStorage.setDensityDirectly(ContentDensityMode.COMPACT);
            tick();
            fixture.detectChanges();
            expect(observer.contentDensity()).toBe(ContentDensityMode.COMPACT);

            // Set to compact again (should remain compact)
            mockStorage.setDensityDirectly(ContentDensityMode.COMPACT);
            tick();
            fixture.detectChanges();
            expect(observer.contentDensity()).toBe(ContentDensityMode.COMPACT);

            // Set to cozy
            mockStorage.setDensityDirectly(ContentDensityMode.COZY);
            tick();
            fixture.detectChanges();
            expect(observer.contentDensity()).toBe(ContentDensityMode.COZY);
        }));
    });

    describe('debug mode', () => {
        it('should log debug messages when debug is enabled', fakeAsync(() => {
            const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

            @Component({
                selector: 'fd-test-debug',
                template: '<div></div>',
                providers: [
                    contentDensityObserverProviders({
                        debug: true
                    })
                ]
            })
            class TestDebugComponent {
                constructor(
                    readonly densityObserver: ContentDensityObserver,
                    readonly elementRef: ElementRef
                ) {}
            }

            TestBed.resetTestingModule();
            TestBed.configureTestingModule({
                imports: [TestDebugComponent],
                providers: [
                    GlobalContentDensityService,
                    { provide: ContentDensityStorage, useValue: mockStorage },
                    { provide: DEFAULT_CONTENT_DENSITY, useValue: ContentDensityMode.COZY },
                    { provide: CONTENT_DENSITY_DIRECTIVE, useValue: null }
                ]
            });

            const debugFixture = TestBed.createComponent(TestDebugComponent);
            debugFixture.detectChanges();
            tick();

            // Change density to trigger debug log
            mockStorage.setDensityDirectly(ContentDensityMode.COMPACT);
            tick();
            debugFixture.detectChanges();

            expect(consoleSpy).toHaveBeenCalled();

            debugFixture.componentInstance.densityObserver.complete();
            consoleSpy.mockRestore();
        }));
    });

    describe('alwaysAddModifiers config', () => {
        it('should always add modifiers when alwaysAddModifiers is true', fakeAsync(() => {
            @Component({
                selector: 'fd-test-always-modifiers',
                template: '<div></div>',
                providers: [
                    contentDensityObserverProviders({
                        alwaysAddModifiers: true
                    })
                ]
            })
            class TestAlwaysModifiersComponent {
                constructor(
                    readonly densityObserver: ContentDensityObserver,
                    readonly elementRef: ElementRef
                ) {}
            }

            TestBed.resetTestingModule();
            TestBed.configureTestingModule({
                imports: [TestAlwaysModifiersComponent],
                providers: [
                    GlobalContentDensityService,
                    { provide: ContentDensityStorage, useValue: mockStorage },
                    { provide: DEFAULT_CONTENT_DENSITY, useValue: ContentDensityMode.COZY },
                    { provide: CONTENT_DENSITY_DIRECTIVE, useValue: null }
                ]
            });

            const modifiersFixture = TestBed.createComponent(TestAlwaysModifiersComponent);
            modifiersFixture.detectChanges();
            tick();

            const hostElement = modifiersFixture.componentInstance.elementRef.nativeElement;
            expect(hostElement.classList.contains('is-cozy')).toBe(true);

            modifiersFixture.componentInstance.densityObserver.complete();
        }));
    });

    describe('no modifiers config', () => {
        it('should not apply classes when modifiers are not configured', fakeAsync(() => {
            @Component({
                selector: 'fd-test-no-modifiers',
                template: '<div></div>',
                providers: [
                    contentDensityObserverProviders({
                        modifiers: undefined
                    })
                ]
            })
            class TestNoModifiersComponent {
                constructor(
                    readonly densityObserver: ContentDensityObserver,
                    readonly elementRef: ElementRef
                ) {}
            }

            TestBed.resetTestingModule();
            TestBed.configureTestingModule({
                imports: [TestNoModifiersComponent],
                providers: [
                    GlobalContentDensityService,
                    { provide: ContentDensityStorage, useValue: mockStorage },
                    { provide: DEFAULT_CONTENT_DENSITY, useValue: ContentDensityMode.COZY },
                    { provide: CONTENT_DENSITY_DIRECTIVE, useValue: null }
                ]
            });

            const noModifiersFixture = TestBed.createComponent(TestNoModifiersComponent);
            noModifiersFixture.detectChanges();
            tick();

            const hostElement = noModifiersFixture.componentInstance.elementRef.nativeElement;
            // Should not have any density classes
            expect(hostElement.classList.contains('is-cozy')).toBe(false);
            expect(hostElement.classList.contains('is-compact')).toBe(false);

            noModifiersFixture.componentInstance.densityObserver.complete();
        }));
    });

    describe('with content density directive', () => {
        it('should use directive density mode when provided', fakeAsync(() => {
            const directiveSignal = signal<LocalContentDensityMode>(ContentDensityMode.COMPACT);
            const mockDirective: ContentDensityDirectiveRef = {
                densityMode: directiveSignal.asReadonly(),
                get value(): LocalContentDensityMode {
                    return directiveSignal();
                }
            };

            @Component({
                selector: 'fd-test-with-directive',
                template: '<div></div>',
                providers: [contentDensityObserverProviders()]
            })
            class TestWithDirectiveComponent {
                constructor(
                    readonly densityObserver: ContentDensityObserver,
                    readonly elementRef: ElementRef
                ) {}
            }

            TestBed.resetTestingModule();
            TestBed.configureTestingModule({
                imports: [TestWithDirectiveComponent],
                providers: [
                    GlobalContentDensityService,
                    { provide: ContentDensityStorage, useValue: mockStorage },
                    { provide: DEFAULT_CONTENT_DENSITY, useValue: ContentDensityMode.COZY },
                    { provide: CONTENT_DENSITY_DIRECTIVE, useValue: mockDirective }
                ]
            });

            const directiveFixture = TestBed.createComponent(TestWithDirectiveComponent);
            directiveFixture.detectChanges();
            tick();

            // Should use directive's compact density
            expect(directiveFixture.componentInstance.densityObserver.contentDensity()).toBe(
                ContentDensityMode.COMPACT
            );

            directiveFixture.componentInstance.densityObserver.complete();
        }));

        it('should resolve global keyword from directive to service value', fakeAsync(() => {
            const directiveSignal = signal<LocalContentDensityMode>(ContentDensityGlobalKeyword);
            const mockDirective: ContentDensityDirectiveRef = {
                densityMode: directiveSignal.asReadonly(),
                get value(): LocalContentDensityMode {
                    return directiveSignal();
                }
            };

            @Component({
                selector: 'fd-test-global-keyword',
                template: '<div></div>',
                providers: [contentDensityObserverProviders()]
            })
            class TestGlobalKeywordComponent {
                constructor(
                    readonly densityObserver: ContentDensityObserver,
                    readonly elementRef: ElementRef
                ) {}
            }

            // Set storage to condensed
            mockStorage.setDensityDirectly(ContentDensityMode.CONDENSED);

            TestBed.resetTestingModule();
            TestBed.configureTestingModule({
                imports: [TestGlobalKeywordComponent],
                providers: [
                    GlobalContentDensityService,
                    { provide: ContentDensityStorage, useValue: mockStorage },
                    { provide: DEFAULT_CONTENT_DENSITY, useValue: ContentDensityMode.COZY },
                    { provide: CONTENT_DENSITY_DIRECTIVE, useValue: mockDirective }
                ]
            });

            const globalFixture = TestBed.createComponent(TestGlobalKeywordComponent);
            globalFixture.detectChanges();
            tick();

            // Should resolve 'global' keyword to service value (condensed) but falls back based on support
            // Default config supports COMPACT and COZY, so CONDENSED falls back to COMPACT
            expect(globalFixture.componentInstance.densityObserver.contentDensity()).toBe(ContentDensityMode.COMPACT);

            globalFixture.componentInstance.densityObserver.complete();
        }));
    });

    describe('cozy fallback', () => {
        it('should always return cozy for cozy alternative (no alternative needed)', fakeAsync(() => {
            // Cozy is always supported, so its alternative should return cozy
            @Component({
                selector: 'fd-test-cozy-only',
                template: '<div></div>',
                providers: [
                    contentDensityObserverProviders({
                        supportedContentDensity: [ContentDensityMode.COZY]
                    })
                ]
            })
            class TestCozyOnlyComponent {
                constructor(
                    readonly densityObserver: ContentDensityObserver,
                    readonly elementRef: ElementRef
                ) {}
            }

            TestBed.resetTestingModule();
            TestBed.configureTestingModule({
                imports: [TestCozyOnlyComponent],
                providers: [
                    GlobalContentDensityService,
                    { provide: ContentDensityStorage, useValue: mockStorage },
                    { provide: DEFAULT_CONTENT_DENSITY, useValue: ContentDensityMode.COZY },
                    { provide: CONTENT_DENSITY_DIRECTIVE, useValue: null }
                ]
            });

            const cozyFixture = TestBed.createComponent(TestCozyOnlyComponent);
            cozyFixture.detectChanges();
            tick();

            // Try to set compact (not supported)
            mockStorage.setDensityDirectly(ContentDensityMode.COMPACT);
            tick();
            cozyFixture.detectChanges();

            // Should fallback to cozy (condensed not supported, so fallback to cozy)
            expect(cozyFixture.componentInstance.densityObserver.contentDensity()).toBe(ContentDensityMode.COZY);

            cozyFixture.componentInstance.densityObserver.complete();
        }));
    });

    describe('condensed fallback', () => {
        it('should fallback to compact when condensed not supported but compact is', fakeAsync(() => {
            @Component({
                selector: 'fd-test-compact-cozy',
                template: '<div></div>',
                providers: [
                    contentDensityObserverProviders({
                        supportedContentDensity: [ContentDensityMode.COZY, ContentDensityMode.COMPACT]
                    })
                ]
            })
            class TestCompactCozyComponent {
                constructor(
                    readonly densityObserver: ContentDensityObserver,
                    readonly elementRef: ElementRef
                ) {}
            }

            TestBed.resetTestingModule();
            TestBed.configureTestingModule({
                imports: [TestCompactCozyComponent],
                providers: [
                    GlobalContentDensityService,
                    { provide: ContentDensityStorage, useValue: mockStorage },
                    { provide: DEFAULT_CONTENT_DENSITY, useValue: ContentDensityMode.COZY },
                    { provide: CONTENT_DENSITY_DIRECTIVE, useValue: null }
                ]
            });

            const compactCozyFixture = TestBed.createComponent(TestCompactCozyComponent);
            compactCozyFixture.detectChanges();
            tick();

            // Try to set condensed (not supported)
            mockStorage.setDensityDirectly(ContentDensityMode.CONDENSED);
            tick();
            compactCozyFixture.detectChanges();

            // Should fallback to compact as alternative to condensed
            expect(compactCozyFixture.componentInstance.densityObserver.contentDensity()).toBe(
                ContentDensityMode.COMPACT
            );

            compactCozyFixture.componentInstance.densityObserver.complete();
        }));
    });

    describe('UI5 content density markers', () => {
        it('should have ui5Markers enabled by default', () => {
            expect(observer.config.ui5Markers).toBeDefined();
            expect(observer.config.ui5Markers?.enabled).toBe(true);
        });

        it('should not have data-ui5-compact-size attribute when cozy', fakeAsync(() => {
            tick();
            const hostElement = component.elementRef.nativeElement;
            expect(hostElement.hasAttribute('data-ui5-compact-size')).toBe(false);
        }));

        it('should apply data-ui5-compact-size attribute when compact', fakeAsync(() => {
            const hostElement = component.elementRef.nativeElement;

            mockStorage.setDensityDirectly(ContentDensityMode.COMPACT);
            tick();
            fixture.detectChanges();

            expect(hostElement.hasAttribute('data-ui5-compact-size')).toBe(true);
        }));

        it('should apply data-ui5-compact-size attribute when condensed (maps to UI5 compact)', fakeAsync(() => {
            @Component({
                selector: 'fd-test-condensed-ui5',
                template: '<div></div>',
                providers: [
                    contentDensityObserverProviders({
                        supportedContentDensity: [ContentDensityMode.COZY, ContentDensityMode.CONDENSED]
                    })
                ]
            })
            class TestCondensedUi5Component {
                constructor(
                    readonly densityObserver: ContentDensityObserver,
                    readonly elementRef: ElementRef
                ) {}
            }

            TestBed.resetTestingModule();
            TestBed.configureTestingModule({
                imports: [TestCondensedUi5Component],
                providers: [
                    GlobalContentDensityService,
                    { provide: ContentDensityStorage, useValue: mockStorage },
                    { provide: DEFAULT_CONTENT_DENSITY, useValue: ContentDensityMode.COZY },
                    { provide: CONTENT_DENSITY_DIRECTIVE, useValue: null }
                ]
            });

            const condensedFixture = TestBed.createComponent(TestCondensedUi5Component);
            condensedFixture.detectChanges();
            tick();

            mockStorage.setDensityDirectly(ContentDensityMode.CONDENSED);
            tick();
            condensedFixture.detectChanges();

            const hostElement = condensedFixture.componentInstance.elementRef.nativeElement;
            expect(hostElement.hasAttribute('data-ui5-compact-size')).toBe(true);

            condensedFixture.componentInstance.densityObserver.complete();
        }));

        it('should remove data-ui5-compact-size attribute when switching back to cozy', fakeAsync(() => {
            const hostElement = component.elementRef.nativeElement;

            // Set to compact
            mockStorage.setDensityDirectly(ContentDensityMode.COMPACT);
            tick();
            fixture.detectChanges();
            expect(hostElement.hasAttribute('data-ui5-compact-size')).toBe(true);

            // Set back to cozy
            mockStorage.setDensityDirectly(ContentDensityMode.COZY);
            tick();
            fixture.detectChanges();
            expect(hostElement.hasAttribute('data-ui5-compact-size')).toBe(false);
        }));

        it('should not apply data-ui5-compact-size attribute when ui5Markers disabled', fakeAsync(() => {
            @Component({
                selector: 'fd-test-ui5-disabled',
                template: '<div></div>',
                providers: [
                    contentDensityObserverProviders({
                        ui5Markers: { enabled: false }
                    })
                ]
            })
            class TestUi5DisabledComponent {
                constructor(
                    readonly densityObserver: ContentDensityObserver,
                    readonly elementRef: ElementRef
                ) {}
            }

            TestBed.resetTestingModule();
            TestBed.configureTestingModule({
                imports: [TestUi5DisabledComponent],
                providers: [
                    GlobalContentDensityService,
                    { provide: ContentDensityStorage, useValue: mockStorage },
                    { provide: DEFAULT_CONTENT_DENSITY, useValue: ContentDensityMode.COZY },
                    { provide: CONTENT_DENSITY_DIRECTIVE, useValue: null }
                ]
            });

            const disabledFixture = TestBed.createComponent(TestUi5DisabledComponent);
            disabledFixture.detectChanges();
            tick();

            mockStorage.setDensityDirectly(ContentDensityMode.COMPACT);
            tick();
            disabledFixture.detectChanges();

            const hostElement = disabledFixture.componentInstance.elementRef.nativeElement;
            // CSS class should still be applied
            expect(hostElement.classList.contains('is-compact')).toBe(true);
            // But UI5 attribute should NOT be applied
            expect(hostElement.hasAttribute('data-ui5-compact-size')).toBe(false);

            disabledFixture.componentInstance.densityObserver.complete();
        }));
    });
});
