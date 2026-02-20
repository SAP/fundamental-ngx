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

            TestBed.inject(LocalContentDensityStorage);
            expect(presetStorage.get(storageKey)).toBe(ContentDensityMode.COMPACT);
        });
    });

    describe('getContentDensity', () => {
        it('should return an observable', () => {
            const result = storage.getContentDensity();
            expect(result).toBeTruthy();
            expect(typeof result.subscribe).toBe('function');
        });

        it('should emit current density from localStorage', (done) => {
            storage.getContentDensity().subscribe((density) => {
                expect(density).toBe(ContentDensityMode.COZY);
                done();
            });
        });

        it('should clean up subscription on unsubscribe', () => {
            const subscription = storage.getContentDensity().subscribe();
            expect(subscription.closed).toBe(false);

            subscription.unsubscribe();
            expect(subscription.closed).toBe(true);
        });
    });

    describe('setContentDensity', () => {
        it('should update density in localStorage', (done) => {
            storage.setContentDensity(ContentDensityMode.COMPACT).subscribe(() => {
                expect(mockLocalStorage.get(storageKey)).toBe(ContentDensityMode.COMPACT);
                done();
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
