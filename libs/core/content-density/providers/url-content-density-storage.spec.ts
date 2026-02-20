import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CONTENT_DENSITY_STORAGE_KEY } from '../tokens/content-density-storage-key.token';
import { DEFAULT_CONTENT_DENSITY } from '../tokens/default-content-density.token';
import { ContentDensityMode } from '../types/content-density.mode';
import { UrlContentDensityStorage } from './url-content-density-storage';

describe('UrlContentDensityStorage', () => {
    let storage: UrlContentDensityStorage;
    let mockRouter: { url: string; navigateByUrl: jest.Mock };
    let queryParams$: BehaviorSubject<Record<string, string>>;
    const storageKey = 'density';

    beforeEach(() => {
        queryParams$ = new BehaviorSubject<Record<string, string>>({});
        mockRouter = {
            url: '/test-page',
            navigateByUrl: jest.fn()
        };

        TestBed.configureTestingModule({
            providers: [
                UrlContentDensityStorage,
                { provide: DEFAULT_CONTENT_DENSITY, useValue: ContentDensityMode.COZY },
                { provide: CONTENT_DENSITY_STORAGE_KEY, useValue: storageKey },
                { provide: Router, useValue: mockRouter },
                { provide: ActivatedRoute, useValue: { queryParams: queryParams$.asObservable() } }
            ]
        });

        storage = TestBed.inject(UrlContentDensityStorage);
    });

    describe('initialization', () => {
        it('should be created', () => {
            expect(storage).toBeTruthy();
        });

        it('should initialize with default density', (done) => {
            storage.getContentDensity().subscribe((density) => {
                expect(density).toBe(ContentDensityMode.COZY);
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

        it('should emit distinct values only', fakeAsync(() => {
            const emittedValues: ContentDensityMode[] = [];

            storage.getContentDensity().subscribe((density) => {
                emittedValues.push(density);
            });

            tick();
            expect(emittedValues).toEqual([ContentDensityMode.COZY]);

            // Emit same value - should not trigger new emission due to distinctUntilChanged
            queryParams$.next({ [storageKey]: ContentDensityMode.COZY });
            tick();
            expect(emittedValues.length).toBe(1);
        }));
    });

    describe('setContentDensity', () => {
        it('should update density and navigate', (done) => {
            storage.setContentDensity(ContentDensityMode.COMPACT).subscribe(() => {
                expect(mockRouter.navigateByUrl).toHaveBeenCalled();
                const navigatedUrl = mockRouter.navigateByUrl.mock.calls[0][0];
                expect(navigatedUrl).toContain(storageKey);
                expect(navigatedUrl).toContain(ContentDensityMode.COMPACT);
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

    describe('reading from URL query params', () => {
        it('should update density when query params change', fakeAsync(() => {
            const emittedValues: ContentDensityMode[] = [];

            storage.getContentDensity().subscribe((density) => {
                emittedValues.push(density);
            });

            tick();

            // Simulate URL query param change
            queryParams$.next({ [storageKey]: ContentDensityMode.COMPACT });
            tick();

            expect(emittedValues).toContain(ContentDensityMode.COMPACT);
        }));

        it('should not update when query param key is missing', fakeAsync(() => {
            const emittedValues: ContentDensityMode[] = [];

            storage.getContentDensity().subscribe((density) => {
                emittedValues.push(density);
            });

            tick();

            // Simulate URL change without our key
            queryParams$.next({ otherParam: 'value' });
            tick();

            // Should only have the initial value
            expect(emittedValues).toEqual([ContentDensityMode.COZY]);
        }));
    });

    describe('URL construction', () => {
        it('should construct proper URL with query param', (done) => {
            mockRouter.url = '/page?existing=param';

            storage.setContentDensity(ContentDensityMode.CONDENSED).subscribe(() => {
                const navigatedUrl = mockRouter.navigateByUrl.mock.calls[0][0];
                expect(navigatedUrl).toContain(storageKey + '=' + ContentDensityMode.CONDENSED);
                done();
            });
        });

        it('should replace existing density param in URL', (done) => {
            mockRouter.url = `/page?${storageKey}=${ContentDensityMode.COZY}`;

            storage.setContentDensity(ContentDensityMode.COMPACT).subscribe(() => {
                const navigatedUrl = mockRouter.navigateByUrl.mock.calls[0][0];
                expect(navigatedUrl).toContain(storageKey + '=' + ContentDensityMode.COMPACT);
                // Should not contain the old value
                expect(navigatedUrl).not.toContain(storageKey + '=' + ContentDensityMode.COZY);
                done();
            });
        });
    });
});
