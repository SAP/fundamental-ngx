import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ContentDensityStorage } from '../classes/abstract-content-density-storage';
import { ContentDensityMode } from '../types/content-density.mode';
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

    // Helper for tests
    setDensityDirectly(density: ContentDensityMode): void {
        this._density$.next(density);
    }
}

describe('GlobalContentDensityService', () => {
    let service: GlobalContentDensityService;
    let mockStorage: MockContentDensityStorage;

    beforeEach(() => {
        mockStorage = new MockContentDensityStorage();

        TestBed.configureTestingModule({
            providers: [GlobalContentDensityService, { provide: ContentDensityStorage, useValue: mockStorage }]
        });

        service = TestBed.inject(GlobalContentDensityService);
    });

    afterEach(() => {
        service.ngOnDestroy();
    });

    describe('initialization', () => {
        it('should be created', () => {
            expect(service).toBeTruthy();
        });

        it('should initialize with default content density from storage', () => {
            expect(service.currentContentDensity).toBe(ContentDensityMode.COZY);
        });

        it('should initialize with compact density when storage provides compact', () => {
            // Create new instance with compact default
            const compactStorage = new MockContentDensityStorage();
            compactStorage.setDensityDirectly(ContentDensityMode.COMPACT);

            TestBed.resetTestingModule();
            TestBed.configureTestingModule({
                providers: [GlobalContentDensityService, { provide: ContentDensityStorage, useValue: compactStorage }]
            });

            const compactService = TestBed.inject(GlobalContentDensityService);
            expect(compactService.currentContentDensity).toBe(ContentDensityMode.COMPACT);
            compactService.ngOnDestroy();
        });
    });

    describe('contentDensityListener', () => {
        it('should return an observable', () => {
            const listener = service.contentDensityListener();
            expect(listener).toBeTruthy();
            expect(typeof listener.subscribe).toBe('function');
        });

        it('should emit current density value', (done) => {
            service.contentDensityListener().subscribe((density) => {
                expect(density).toBe(ContentDensityMode.COZY);
                done();
            });
        });

        it('should emit updated density when storage changes', (done) => {
            const emittedValues: ContentDensityMode[] = [];

            service.contentDensityListener().subscribe((density) => {
                emittedValues.push(density);
                if (emittedValues.length === 2) {
                    expect(emittedValues).toEqual([ContentDensityMode.COZY, ContentDensityMode.COMPACT]);
                    done();
                }
            });

            mockStorage.setDensityDirectly(ContentDensityMode.COMPACT);
        });
    });

    describe('updateContentDensity', () => {
        it('should update content density', (done) => {
            service.updateContentDensity(ContentDensityMode.COMPACT).subscribe(() => {
                expect(service.currentContentDensity).toBe(ContentDensityMode.COMPACT);
                done();
            });
        });

        it('should update to condensed density', (done) => {
            service.updateContentDensity(ContentDensityMode.CONDENSED).subscribe(() => {
                expect(service.currentContentDensity).toBe(ContentDensityMode.CONDENSED);
                done();
            });
        });

        it('should update to cozy density', (done) => {
            // First set to compact
            service.updateContentDensity(ContentDensityMode.COMPACT).subscribe(() => {
                // Then set back to cozy
                service.updateContentDensity(ContentDensityMode.COZY).subscribe(() => {
                    expect(service.currentContentDensity).toBe(ContentDensityMode.COZY);
                    done();
                });
            });
        });

        it('should notify listeners when density changes', (done) => {
            const emittedValues: ContentDensityMode[] = [];

            service.contentDensityListener().subscribe((density) => {
                emittedValues.push(density);
                if (emittedValues.length === 3) {
                    expect(emittedValues).toEqual([
                        ContentDensityMode.COZY,
                        ContentDensityMode.COMPACT,
                        ContentDensityMode.CONDENSED
                    ]);
                    done();
                }
            });

            service.updateContentDensity(ContentDensityMode.COMPACT).subscribe();
            service.updateContentDensity(ContentDensityMode.CONDENSED).subscribe();
        });
    });

    describe('currentContentDensity property', () => {
        it('should reflect the current density value synchronously', () => {
            expect(service.currentContentDensity).toBe(ContentDensityMode.COZY);

            mockStorage.setDensityDirectly(ContentDensityMode.COMPACT);
            expect(service.currentContentDensity).toBe(ContentDensityMode.COMPACT);

            mockStorage.setDensityDirectly(ContentDensityMode.CONDENSED);
            expect(service.currentContentDensity).toBe(ContentDensityMode.CONDENSED);
        });
    });

    describe('cleanup', () => {
        it('should unsubscribe on destroy', () => {
            const subscription = (service as any)._subscription;
            expect(subscription.closed).toBe(false);

            service.ngOnDestroy();

            expect(subscription.closed).toBe(true);
        });
    });
});
