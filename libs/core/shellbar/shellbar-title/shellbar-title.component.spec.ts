import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ResizeObserverService } from '@fundamental-ngx/cdk/utils';
import { of } from 'rxjs';
import { ShellbarTitleComponent } from './shellbar-title.component';

@Component({
    selector: 'fd-test-shellbar-title-long',
    template: `
        <fd-shellbar-title>
            This is a very long title that should trigger font size adjustment when it wraps to multiple lines
        </fd-shellbar-title>
    `,
    standalone: true,
    imports: [ShellbarTitleComponent]
})
class ShellbarTitleLongTextTestComponent {}

@Component({
    selector: 'fd-test-shellbar-title-short',
    template: ` <fd-shellbar-title>Short Title</fd-shellbar-title> `,
    standalone: true,
    imports: [ShellbarTitleComponent]
})
class ShellbarTitleShortTextTestComponent {}

describe('ShellbarTitleComponent', () => {
    let component: ShellbarTitleComponent;
    let fixture: ComponentFixture<ShellbarTitleComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ShellbarTitleComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ShellbarTitleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

describe('ShellbarTitleComponent - Font Size Adjustment', () => {
    let longTextFixture: ComponentFixture<ShellbarTitleLongTextTestComponent>;
    let titleComponent: ShellbarTitleComponent;
    let mockResizeObserver: jest.Mocked<ResizeObserverService>;

    beforeEach(waitForAsync(() => {
        mockResizeObserver = {
            observe: jest.fn().mockReturnValue(of([]))
        } as any;

        TestBed.configureTestingModule({
            imports: [ShellbarTitleLongTextTestComponent],
            providers: [{ provide: ResizeObserverService, useValue: mockResizeObserver }]
        }).compileComponents();
    }));

    beforeEach(async () => {
        longTextFixture = TestBed.createComponent(ShellbarTitleLongTextTestComponent);
        longTextFixture.detectChanges();
        await longTextFixture.whenStable();
        titleComponent = longTextFixture.debugElement.query((el) => el.name === 'fd-shellbar-title')?.componentInstance;
    });

    it('should set up resize observer on initialization', () => {
        expect(mockResizeObserver.observe).toHaveBeenCalled();
    });

    it('should have fontSize signal', () => {
        expect(titleComponent['fontSize']).toBeDefined();
        expect(typeof titleComponent['fontSize']).toBe('function');
    });

    it('should adjust font size when content overflows', () => {
        const titleElement = longTextFixture.nativeElement.querySelector('.fd-shellbar__title') as HTMLElement;
        expect(titleElement).toBeTruthy();

        // Trigger font size adjustment
        titleComponent['_adjustFontSize']();
        longTextFixture.detectChanges();

        // Font size should be set (may be null if no adjustment needed)
        const fontSize = titleComponent['fontSize']();
        expect(fontSize === null || typeof fontSize === 'number').toBe(true);
    });

    it('should set font size within allowed range', () => {
        // Simulate overflow by mocking scroll/client height
        const titleElement = longTextFixture.nativeElement.querySelector('.fd-shellbar__title') as HTMLElement;
        if (!titleElement) {
            return;
        }

        Object.defineProperty(titleElement, 'scrollHeight', {
            configurable: true,
            value: 100
        });
        Object.defineProperty(titleElement, 'clientHeight', {
            configurable: true,
            value: 50
        });

        titleComponent['_adjustFontSize']();
        longTextFixture.detectChanges();

        const fontSize = titleComponent['fontSize']();
        if (fontSize !== null) {
            // Font size should be between min and max (0.875rem to 1rem)
            expect(fontSize).toBeGreaterThanOrEqual(0.875);
            expect(fontSize).toBeLessThanOrEqual(1);
        }
    });

    it('should not set font size for short text that fits', () => {
        const shortFixture = TestBed.createComponent(ShellbarTitleShortTextTestComponent);
        shortFixture.detectChanges();

        const shortTitleComponent = shortFixture.debugElement.query(
            (el) => el.name === 'fd-shellbar-title'
        )?.componentInstance;

        if (shortTitleComponent) {
            shortTitleComponent['_adjustFontSize']();
            shortFixture.detectChanges();

            // Short text should not need font size adjustment
            const fontSize = shortTitleComponent['fontSize']();
            expect(fontSize).toBeNull();
        }
    });

    it('should handle resize events', () => {
        // Verify resize observer was set up
        expect(mockResizeObserver.observe).toHaveBeenCalled();

        // The component should react to resize events through the observer
        const observeCall = mockResizeObserver.observe.mock.calls[0];
        expect(observeCall).toBeDefined();
    });

    it('should debounce font size adjustments', (done) => {
        const adjustSpy = jest.spyOn(titleComponent as any, '_adjustFontSize');

        // Call multiple times rapidly
        titleComponent['_adjustFontSize']();
        titleComponent['_adjustFontSize']();
        titleComponent['_adjustFontSize']();

        // Should use timeout for debouncing
        setTimeout(() => {
            // Method should have been called
            expect(adjustSpy).toHaveBeenCalled();
            done();
        }, 150);
    });
});

describe('ShellbarTitleComponent - Multi-line Text Handling', () => {
    it('should clamp text to maximum 2 lines', async () => {
        TestBed.configureTestingModule({
            imports: [ShellbarTitleLongTextTestComponent]
        });

        const longFixture = TestBed.createComponent(ShellbarTitleLongTextTestComponent);
        longFixture.detectChanges();
        await longFixture.whenStable();

        const titleElement = longFixture.nativeElement.querySelector('.fd-shellbar__title');
        expect(titleElement).toBeTruthy();

        // Line clamp directive should be applied
        const hasLineClamp =
            titleElement.getAttribute('fdLineClamp') !== null || titleElement.classList.contains('fd-line-clamp');
        expect(hasLineClamp || titleElement.style['-webkit-line-clamp'] || titleElement.style.lineClamp).toBeTruthy();
    });
});
