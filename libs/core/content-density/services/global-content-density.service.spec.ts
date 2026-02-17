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

    describe('initialization', () => {
        it('should be created', () => {
            expect(service).toBeTruthy();
        });

        it('should initialize with default content density from storage', () => {
            expect(service.currentDensitySignal()).toBe(ContentDensityMode.COZY);
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
            expect(compactService.currentDensitySignal()).toBe(ContentDensityMode.COMPACT);
        });
    });

    describe('currentDensitySignal', () => {
        it('should return a signal with the current density', () => {
            expect(service.currentDensitySignal()).toBe(ContentDensityMode.COZY);
        });

        it('should be callable as a signal', () => {
            const density = service.currentDensitySignal;
            expect(typeof density).toBe('function');
            expect(density()).toBe(ContentDensityMode.COZY);
        });
    });

    describe('currentContentDensity (deprecated getter)', () => {
        it('should return the current density from signal', () => {
            expect(service.currentContentDensity).toBe(ContentDensityMode.COZY);
        });

        it('should return the same value as currentDensitySignal', () => {
            expect(service.currentContentDensity).toBe(service.currentDensitySignal());
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
                // Signal updates reactively
                expect(service.currentDensitySignal()).toBe(ContentDensityMode.COMPACT);
                done();
            });
        });

        it('should update to condensed density', (done) => {
            service.updateContentDensity(ContentDensityMode.CONDENSED).subscribe(() => {
                expect(service.currentDensitySignal()).toBe(ContentDensityMode.CONDENSED);
                done();
            });
        });

        it('should update to cozy density', (done) => {
            // First set to compact
            service.updateContentDensity(ContentDensityMode.COMPACT).subscribe(() => {
                // Then set back to cozy
                service.updateContentDensity(ContentDensityMode.COZY).subscribe(() => {
                    expect(service.currentDensitySignal()).toBe(ContentDensityMode.COZY);
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

    describe('reactive updates', () => {
        it('should update signal when storage changes', (done) => {
            expect(service.currentDensitySignal()).toBe(ContentDensityMode.COZY);

            // Subscribe to verify the change propagates
            service.contentDensityListener().subscribe((density) => {
                if (density === ContentDensityMode.COMPACT) {
                    // Signal should have updated via toSignal
                    expect(service.currentDensitySignal()).toBe(ContentDensityMode.COMPACT);
                    done();
                }
            });

            mockStorage.setDensityDirectly(ContentDensityMode.COMPACT);
        });
    });
});
