import { TestBed } from '@angular/core/testing';
import { DynamicPageService } from './dynamic-page.service';
import { dynamicPageWidthToSize } from './utils';

describe('DynamicPageService', () => {
    let service: DynamicPageService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [DynamicPageService]
        });
        service = TestBed.inject(DynamicPageService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('responsiveSize computed signal', () => {
        it('should return same value as dynamicPageWidthToSize utility', () => {
            const testWidths = [0, 500, 599, 600, 800, 1023, 1024, 1200, 1439, 1440, 1600, 2000];

            testWidths.forEach((width) => {
                service.pixelsSizeChanged.set(width);

                const fromSignal = service.responsiveSize();
                const fromUtility = dynamicPageWidthToSize(width);

                expect(fromSignal).toBe(fromUtility);
            });
        });
    });

    describe('collapsed signal', () => {
        it('should toggle collapsed state', () => {
            expect(service.collapsed()).toBe(false);

            service.toggleCollapsed();
            expect(service.collapsed()).toBe(true);

            service.toggleCollapsed();
            expect(service.collapsed()).toBe(false);
        });
    });

    describe('manualSizeOverride signal', () => {
        it('should default to null', () => {
            expect(service.manualSizeOverride()).toBeNull();
        });

        it('should override responsiveSize when set', () => {
            // pixelsSizeChanged is 0, which would compute to 'small'
            expect(service.responsiveSize()).toBe('small');

            // Set manual override to 'large'
            service.manualSizeOverride.set('large');
            expect(service.responsiveSize()).toBe('large');

            // Set manual override to 'extra-large'
            service.manualSizeOverride.set('extra-large');
            expect(service.responsiveSize()).toBe('extra-large');
        });

        it('should fall back to computed size when override is null', () => {
            // Set pixel width to trigger 'medium' size
            service.pixelsSizeChanged.set(800);
            expect(service.responsiveSize()).toBe('medium');

            // Set manual override
            service.manualSizeOverride.set('small');
            expect(service.responsiveSize()).toBe('small');

            // Clear override - should fall back to computed
            service.manualSizeOverride.set(null);
            expect(service.responsiveSize()).toBe('medium');
        });

        it('should take precedence over pixelsSizeChanged', () => {
            // Set pixel width to 1500 (extra-large)
            service.pixelsSizeChanged.set(1500);
            expect(service.responsiveSize()).toBe('extra-large');

            // Override with 'small' - should win
            service.manualSizeOverride.set('small');
            expect(service.responsiveSize()).toBe('small');

            // Change pixels - override should still win
            service.pixelsSizeChanged.set(800);
            expect(service.responsiveSize()).toBe('small');
        });
    });
});
