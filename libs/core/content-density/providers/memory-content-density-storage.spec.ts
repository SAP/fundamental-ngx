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

        it('should initialize with default content density', () => {
            expect(storage.contentDensity()).toBe(ContentDensityMode.COZY);
        });

        it('should initialize with compact when provided as default', () => {
            TestBed.resetTestingModule();
            TestBed.configureTestingModule({
                providers: [
                    MemoryContentDensityStorage,
                    { provide: DEFAULT_CONTENT_DENSITY, useValue: ContentDensityMode.COMPACT }
                ]
            });

            const compactStorage = TestBed.inject(MemoryContentDensityStorage);

            expect(compactStorage.contentDensity()).toBe(ContentDensityMode.COMPACT);
        });
    });

    describe('contentDensity signal', () => {
        it('should return a signal', () => {
            expect(storage.contentDensity).toBeTruthy();
            expect(typeof storage.contentDensity).toBe('function');
        });

        it('should return current density value', () => {
            expect(storage.contentDensity()).toBe(ContentDensityMode.COZY);
        });
    });

    describe('setContentDensity', () => {
        it('should update density to compact', () => {
            storage.setContentDensity(ContentDensityMode.COMPACT);
            expect(storage.contentDensity()).toBe(ContentDensityMode.COMPACT);
        });

        it('should update density to condensed', () => {
            storage.setContentDensity(ContentDensityMode.CONDENSED);
            expect(storage.contentDensity()).toBe(ContentDensityMode.CONDENSED);
        });

        it('should update density to cozy', () => {
            // First set to compact
            storage.setContentDensity(ContentDensityMode.COMPACT);
            expect(storage.contentDensity()).toBe(ContentDensityMode.COMPACT);

            // Then set back to cozy
            storage.setContentDensity(ContentDensityMode.COZY);
            expect(storage.contentDensity()).toBe(ContentDensityMode.COZY);
        });
    });

    describe('reactive updates', () => {
        it('should update signal value when density changes', () => {
            expect(storage.contentDensity()).toBe(ContentDensityMode.COZY);

            storage.setContentDensity(ContentDensityMode.COMPACT);
            expect(storage.contentDensity()).toBe(ContentDensityMode.COMPACT);

            storage.setContentDensity(ContentDensityMode.CONDENSED);
            expect(storage.contentDensity()).toBe(ContentDensityMode.CONDENSED);
        });
    });
});
