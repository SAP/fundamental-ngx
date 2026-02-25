import { EnvironmentInjector, createEnvironmentInjector } from '@angular/core';
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

        it('should initialize with default density', () => {
            expect(storage.contentDensity()).toBe(ContentDensityMode.COZY);
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
        it('should update density and navigate', () => {
            storage.setContentDensity(ContentDensityMode.COMPACT);

            expect(storage.contentDensity()).toBe(ContentDensityMode.COMPACT);
            expect(mockRouter.navigateByUrl).toHaveBeenCalled();
            const navigatedUrl = mockRouter.navigateByUrl.mock.calls[0][0];
            expect(navigatedUrl).toContain(storageKey);
            expect(navigatedUrl).toContain(ContentDensityMode.COMPACT);
        });

        it('should update the signal value', () => {
            storage.setContentDensity(ContentDensityMode.COMPACT);
            expect(storage.contentDensity()).toBe(ContentDensityMode.COMPACT);
        });
    });

    describe('reading from URL query params', () => {
        it('should update density when query params change', fakeAsync(() => {
            expect(storage.contentDensity()).toBe(ContentDensityMode.COZY);

            // Simulate URL query param change
            queryParams$.next({ [storageKey]: ContentDensityMode.COMPACT });
            tick();

            expect(storage.contentDensity()).toBe(ContentDensityMode.COMPACT);
        }));

        it('should not update when query param key is missing', fakeAsync(() => {
            expect(storage.contentDensity()).toBe(ContentDensityMode.COZY);

            // Simulate URL change without our key
            queryParams$.next({ otherParam: 'value' });
            tick();

            // Should keep the initial value
            expect(storage.contentDensity()).toBe(ContentDensityMode.COZY);
        }));

        it('should not update when value is same', fakeAsync(() => {
            expect(storage.contentDensity()).toBe(ContentDensityMode.COZY);

            // Emit same value
            queryParams$.next({ [storageKey]: ContentDensityMode.COZY });
            tick();

            // Should still be cozy
            expect(storage.contentDensity()).toBe(ContentDensityMode.COZY);
        }));
    });

    describe('URL construction', () => {
        it('should construct proper URL with query param', () => {
            mockRouter.url = '/page?existing=param';

            storage.setContentDensity(ContentDensityMode.CONDENSED);

            const navigatedUrl = mockRouter.navigateByUrl.mock.calls[0][0];
            expect(navigatedUrl).toContain(storageKey + '=' + ContentDensityMode.CONDENSED);
        });

        it('should replace existing density param in URL', () => {
            mockRouter.url = `/page?${storageKey}=${ContentDensityMode.COZY}`;

            storage.setContentDensity(ContentDensityMode.COMPACT);

            const navigatedUrl = mockRouter.navigateByUrl.mock.calls[0][0];
            expect(navigatedUrl).toContain(storageKey + '=' + ContentDensityMode.COMPACT);
            // Should not contain the old value
            expect(navigatedUrl).not.toContain(storageKey + '=' + ContentDensityMode.COZY);
        });

        it('should preserve existing query params when adding density', () => {
            mockRouter.url = '/page?foo=bar&baz=qux';

            storage.setContentDensity(ContentDensityMode.COMPACT);

            const navigatedUrl = mockRouter.navigateByUrl.mock.calls[0][0];
            expect(navigatedUrl).toContain('foo=bar');
            expect(navigatedUrl).toContain('baz=qux');
            expect(navigatedUrl).toContain(storageKey + '=' + ContentDensityMode.COMPACT);
        });

        it('should handle URL without query params', () => {
            mockRouter.url = '/page';

            storage.setContentDensity(ContentDensityMode.COMPACT);

            const navigatedUrl = mockRouter.navigateByUrl.mock.calls[0][0];
            expect(navigatedUrl).toBe('/page?' + storageKey + '=' + ContentDensityMode.COMPACT);
        });

        it('should preserve pathname correctly', () => {
            mockRouter.url = '/some/deep/path?param=value';

            storage.setContentDensity(ContentDensityMode.CONDENSED);

            const navigatedUrl = mockRouter.navigateByUrl.mock.calls[0][0];
            expect(navigatedUrl).toMatch(/^\/some\/deep\/path\?/);
        });

        it('should handle root path', () => {
            mockRouter.url = '/';

            storage.setContentDensity(ContentDensityMode.COMPACT);

            const navigatedUrl = mockRouter.navigateByUrl.mock.calls[0][0];
            expect(navigatedUrl).toBe('/?' + storageKey + '=' + ContentDensityMode.COMPACT);
        });

        it('should handle multiple density changes', () => {
            mockRouter.url = '/page';

            storage.setContentDensity(ContentDensityMode.COMPACT);
            const firstUrl = mockRouter.navigateByUrl.mock.calls[0][0];
            expect(firstUrl).toContain(storageKey + '=' + ContentDensityMode.COMPACT);

            // Simulate router URL updated after first navigation
            mockRouter.url = firstUrl;
            storage.setContentDensity(ContentDensityMode.CONDENSED);
            const secondUrl = mockRouter.navigateByUrl.mock.calls[1][0];
            expect(secondUrl).toContain(storageKey + '=' + ContentDensityMode.CONDENSED);
            expect(secondUrl).not.toContain(storageKey + '=' + ContentDensityMode.COMPACT);
        });
    });

    describe('subscription cleanup (memory leak prevention)', () => {
        it('should not update signal after injector is destroyed', fakeAsync(() => {
            // Create a child injector that we can destroy
            const queryParams$ForLeak = new BehaviorSubject<Record<string, string>>({});
            const mockRouterForLeak = { url: '/test', navigateByUrl: jest.fn() };

            const childInjector = createEnvironmentInjector(
                [
                    UrlContentDensityStorage,
                    { provide: DEFAULT_CONTENT_DENSITY, useValue: ContentDensityMode.COZY },
                    { provide: CONTENT_DENSITY_STORAGE_KEY, useValue: storageKey },
                    { provide: Router, useValue: mockRouterForLeak },
                    { provide: ActivatedRoute, useValue: { queryParams: queryParams$ForLeak.asObservable() } }
                ],
                TestBed.inject(EnvironmentInjector)
            );

            const leakTestStorage = childInjector.get(UrlContentDensityStorage);
            expect(leakTestStorage.contentDensity()).toBe(ContentDensityMode.COZY);

            // Update via query params - should work
            queryParams$ForLeak.next({ [storageKey]: ContentDensityMode.COMPACT });
            tick();
            expect(leakTestStorage.contentDensity()).toBe(ContentDensityMode.COMPACT);

            // Destroy the injector (simulates lazy module unload)
            childInjector.destroy();

            // Emit new value after destruction
            // If there's a leak, this would still update the signal (zombie behavior)
            // If properly cleaned up, this should have no effect
            queryParams$ForLeak.next({ [storageKey]: ContentDensityMode.CONDENSED });
            tick();

            // CURRENT BEHAVIOR (with leak): signal gets updated to CONDENSED
            // EXPECTED BEHAVIOR (without leak): signal stays at COMPACT
            // After fix with takeUntilDestroyed, subscription is cleaned up
            expect(leakTestStorage.contentDensity()).toBe(ContentDensityMode.COMPACT); // NO LEAK
        }));
    });
});
