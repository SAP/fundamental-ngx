import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from '@fundamental-ngx/cdk/utils';
import { CONTENT_DENSITY_STORAGE_KEY } from '../tokens/content-density-storage-key.token';
import { DEFAULT_CONTENT_DENSITY } from '../tokens/default-content-density.token';
import { ContentDensityMode } from '../types/content-density.mode';
import { LocalContentDensityStorage } from './local-content-density-storage';

class MockLocalStorageService {
    private _storage: Map<string, any> = new Map();

    get<T>(key: string): T | null {
        return this._storage.get(key) ?? null;
    }

    set<T>(key: string, value: T): void {
        this._storage.set(key, value);
    }

    remove(key: string): void {
        this._storage.delete(key);
    }

    clear(): void {
        this._storage.clear();
    }
}

describe('LocalContentDensityStorage', () => {
    let storage: LocalContentDensityStorage;
    let mockLocalStorage: MockLocalStorageService;
    const storageKey = '__TestContentDensity__';

    beforeEach(() => {
        mockLocalStorage = new MockLocalStorageService();

        TestBed.configureTestingModule({
            providers: [
                LocalContentDensityStorage,
                { provide: DEFAULT_CONTENT_DENSITY, useValue: ContentDensityMode.COZY },
                { provide: CONTENT_DENSITY_STORAGE_KEY, useValue: storageKey },
                { provide: LocalStorageService, useValue: mockLocalStorage }
            ]
        });

        storage = TestBed.inject(LocalContentDensityStorage);
    });

    describe('initialization', () => {
        it('should be created', () => {
            expect(storage).toBeTruthy();
        });

        it('should initialize localStorage with default density if not set', () => {
            expect(mockLocalStorage.get(storageKey)).toBe(ContentDensityMode.COZY);
        });

        it('should not overwrite existing localStorage value', () => {
            // Reset and set a value before creating storage
            TestBed.resetTestingModule();
            const presetStorage = new MockLocalStorageService();
            presetStorage.set(storageKey, ContentDensityMode.COMPACT);

            TestBed.configureTestingModule({
                providers: [
                    LocalContentDensityStorage,
                    { provide: DEFAULT_CONTENT_DENSITY, useValue: ContentDensityMode.COZY },
                    { provide: CONTENT_DENSITY_STORAGE_KEY, useValue: storageKey },
                    { provide: LocalStorageService, useValue: presetStorage }
                ]
            });

            const newStorage = TestBed.inject(LocalContentDensityStorage);
            expect(presetStorage.get(storageKey)).toBe(ContentDensityMode.COMPACT);
            expect(newStorage.contentDensity()).toBe(ContentDensityMode.COMPACT);
        });
    });

    describe('contentDensity signal', () => {
        it('should return a signal', () => {
            expect(storage.contentDensity).toBeTruthy();
            expect(typeof storage.contentDensity).toBe('function');
        });

        it('should return current density from localStorage', () => {
            expect(storage.contentDensity()).toBe(ContentDensityMode.COZY);
        });
    });

    describe('setContentDensity', () => {
        it('should update density in localStorage', () => {
            storage.setContentDensity(ContentDensityMode.COMPACT);
            expect(mockLocalStorage.get(storageKey)).toBe(ContentDensityMode.COMPACT);
        });

        it('should update the signal value', () => {
            storage.setContentDensity(ContentDensityMode.COMPACT);
            expect(storage.contentDensity()).toBe(ContentDensityMode.COMPACT);
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

        it('should persist changes to localStorage', () => {
            storage.setContentDensity(ContentDensityMode.COMPACT);
            expect(mockLocalStorage.get(storageKey)).toBe(ContentDensityMode.COMPACT);

            storage.setContentDensity(ContentDensityMode.CONDENSED);
            expect(mockLocalStorage.get(storageKey)).toBe(ContentDensityMode.CONDENSED);
        });
    });
});
