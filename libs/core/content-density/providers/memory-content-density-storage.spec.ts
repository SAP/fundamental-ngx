import { TestBed } from '@angular/core/testing';
import { DEFAULT_CONTENT_DENSITY } from '../tokens/default-content-density.token';
import { ContentDensityMode } from '../types/content-density.mode';
import { MemoryContentDensityStorage } from './memory-content-density-storage';

describe('MemoryContentDensityStorage', () => {
    let storage: MemoryContentDensityStorage;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                MemoryContentDensityStorage,
                { provide: DEFAULT_CONTENT_DENSITY, useValue: ContentDensityMode.COZY }
            ]
        });

        storage = TestBed.inject(MemoryContentDensityStorage);
    });

    describe('initialization', () => {
        it('should be created', () => {
            expect(storage).toBeTruthy();
        });

        it('should initialize with default content density', (done) => {
            storage.getContentDensity().subscribe((density) => {
                expect(density).toBe(ContentDensityMode.COZY);
                done();
            });
        });

        it('should initialize with compact when provided as default', (done) => {
            TestBed.resetTestingModule();
            TestBed.configureTestingModule({
                providers: [
                    MemoryContentDensityStorage,
                    { provide: DEFAULT_CONTENT_DENSITY, useValue: ContentDensityMode.COMPACT }
                ]
            });

            const compactStorage = TestBed.inject(MemoryContentDensityStorage);

            compactStorage.getContentDensity().subscribe((density) => {
                expect(density).toBe(ContentDensityMode.COMPACT);
                done();
            });
        });
    });

    describe('getContentDensity', () => {
        it('should return an observable', () => {
            const result = storage.getContentDensity();
            expect(result).toBeTruthy();
            expect(typeof result.subscribe).toBe('function');
        });

        it('should emit current density value', (done) => {
            storage.getContentDensity().subscribe((density) => {
                expect(density).toBe(ContentDensityMode.COZY);
                done();
            });
        });
    });

    describe('setContentDensity', () => {
        it('should update density to compact', (done) => {
            storage.setContentDensity(ContentDensityMode.COMPACT).subscribe(() => {
                storage.getContentDensity().subscribe((density) => {
                    expect(density).toBe(ContentDensityMode.COMPACT);
                    done();
                });
            });
        });

        it('should update density to condensed', (done) => {
            storage.setContentDensity(ContentDensityMode.CONDENSED).subscribe(() => {
                storage.getContentDensity().subscribe((density) => {
                    expect(density).toBe(ContentDensityMode.CONDENSED);
                    done();
                });
            });
        });

        it('should update density to cozy', (done) => {
            // First set to compact
            storage.setContentDensity(ContentDensityMode.COMPACT).subscribe(() => {
                // Then set back to cozy
                storage.setContentDensity(ContentDensityMode.COZY).subscribe(() => {
                    storage.getContentDensity().subscribe((density) => {
                        expect(density).toBe(ContentDensityMode.COZY);
                        done();
                    });
                });
            });
        });

        it('should return observable of void', (done) => {
            storage.setContentDensity(ContentDensityMode.COMPACT).subscribe((result) => {
                expect(result).toBeUndefined();
                done();
            });
        });
    });

    describe('reactive updates', () => {
        it('should notify subscribers when density changes', (done) => {
            const emittedValues: ContentDensityMode[] = [];

            storage.getContentDensity().subscribe((density) => {
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

            storage.setContentDensity(ContentDensityMode.COMPACT).subscribe();
            storage.setContentDensity(ContentDensityMode.CONDENSED).subscribe();
        });
    });
});
