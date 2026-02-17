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
    let globalService: GlobalContentDensityService;

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
        globalService = TestBed.inject(GlobalContentDensityService);
        fixture.detectChanges();
    });

    afterEach(() => {
        observer?.complete();
        globalService?.ngOnDestroy();
    });

    describe('initialization', () => {
        it('should be created', () => {
            expect(observer).toBeTruthy();
        });

        it('should initialize with default content density (cozy)', () => {
            expect(observer.value).toBe(ContentDensityMode.COZY);
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

            newFixture.componentInstance.observer.complete();
        }));
    });

    describe('density state signals and observables', () => {
        it('should have contentDensity$ signal', () => {
            expect(observer.contentDensity$).toBeDefined();
            expect(observer.contentDensity$()).toBe(ContentDensityMode.COZY);
        });

        it('should have isCompact observable and signal', (done) => {
            expect(observer.isCompact$).toBeDefined();
            expect(observer.isCompactSignal).toBeDefined();

            observer.isCompact$.subscribe((isCompact) => {
                expect(isCompact).toBe(false);
                expect(observer.isCompactSignal()).toBe(false);
                done();
            });
        });

        it('should have isCozy observable and signal', (done) => {
            expect(observer.isCozy$).toBeDefined();
            expect(observer.isCozySignal).toBeDefined();

            observer.isCozy$.subscribe((isCozy) => {
                expect(isCozy).toBe(true);
                expect(observer.isCozySignal()).toBe(true);
                done();
            });
        });

        it('should have isCondensed observable and signal', (done) => {
            expect(observer.isCondensed$).toBeDefined();
            expect(observer.isCondensedSignal).toBeDefined();

            observer.isCondensed$.subscribe((isCondensed) => {
                expect(isCondensed).toBe(false);
                expect(observer.isCondensedSignal()).toBe(false);
                done();
            });
        });

        it('should have synchronous getters for density states', () => {
            expect(observer.isCompact).toBe(false);
            expect(observer.isCozy).toBe(true);
            expect(observer.isCondensed).toBe(false);
        });
    });

    describe('reacting to global density changes', () => {
        it('should update when global density changes to compact', fakeAsync(() => {
            mockStorage.setDensityDirectly(ContentDensityMode.COMPACT);
            tick();

            expect(observer.value).toBe(ContentDensityMode.COMPACT);
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

            expect(customFixture.componentInstance.observer.value).toBe(ContentDensityMode.CONDENSED);
            expect(customFixture.componentInstance.observer.isCondensed).toBe(true);

            customFixture.componentInstance.observer.complete();
        }));

        it('should emit values through the BehaviorSubject', fakeAsync(() => {
            const emittedValues: ContentDensityMode[] = [];
            observer.subscribe((density) => emittedValues.push(density));

            mockStorage.setDensityDirectly(ContentDensityMode.COMPACT);
            tick();

            expect(emittedValues).toContain(ContentDensityMode.COMPACT);
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

            expect(hostElement.classList.contains('is-compact')).toBe(true);
            expect(hostElement.classList.contains('is-cozy')).toBe(false);
        }));
    });

    describe('cleanup and completion', () => {
        it('should complete all internal subjects on complete()', () => {
            let mainCompleted = false;
            let isCompactCompleted = false;

            observer.subscribe({
                complete: () => (mainCompleted = true)
            });
            observer.isCompact$.subscribe({
                complete: () => (isCompactCompleted = true)
            });

            observer.complete();

            expect(mainCompleted).toBe(true);
            expect(isCompactCompleted).toBe(true);
        });

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
            const emittedValues: ContentDensityMode[] = [];
            observer.subscribe((density) => emittedValues.push(density));

            // Set to compact
            mockStorage.setDensityDirectly(ContentDensityMode.COMPACT);
            tick();

            // Set to compact again (should not emit)
            mockStorage.setDensityDirectly(ContentDensityMode.COMPACT);
            tick();

            // Set to cozy
            mockStorage.setDensityDirectly(ContentDensityMode.COZY);
            tick();

            // Should have: initial cozy, compact, cozy (not duplicate compact)
            const compactCount = emittedValues.filter((v) => v === ContentDensityMode.COMPACT).length;
            expect(compactCount).toBe(1);
        }));
    });
});
