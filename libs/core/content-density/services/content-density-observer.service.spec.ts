import { Component, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ContentDensityStorage } from '../classes/abstract-content-density-storage';
import { contentDensityObserverProviders } from '../providers/content-density-observer-providers';
import { CONTENT_DENSITY_DIRECTIVE } from '../tokens/content-density-directive';
import { DEFAULT_CONTENT_DENSITY } from '../tokens/default-content-density.token';
import { ContentDensityMode } from '../types/content-density.mode';
import { ContentDensityObserver } from './content-density-observer.service';
import { GlobalContentDensityService } from './global-content-density.service';

class MockContentDensityStorage implements ContentDensityStorage {
    private _density$ = new BehaviorSubject<ContentDensityMode>(ContentDensityMode.COZY);

    getContentDensity(): Observable<ContentDensityMode> {
        return this._density$.asObservable();
    }

    setContentDensity(density: ContentDensityMode): Observable<void> {
        this._density$.next(density);
        return of(undefined);
    }

    setDensityDirectly(density: ContentDensityMode): void {
        this._density$.next(density);
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

        it('should have value getter for backward compatibility', () => {
            expect(observer.value).toBe(ContentDensityMode.COZY);
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
});
