import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableCellOverflowDirective } from './table-cell-overflow.directive';

@Component({
    template: ` <div [fdpTableCellOverflow]="enabled" [style.width.px]="width" [style.overflow]="'hidden'">
        {{ text }}
    </div>`,
    imports: [TableCellOverflowDirective]
})
class TestComponent {
    text = 'Short text';
    width = 200;
    enabled = true;
}

/**
 * TESTING LIMITATIONS:
 *
 * These tests have inherent limitations because JSDOM (the test environment) does not
 * calculate real layout. In JSDOM, `offsetWidth` and `scrollWidth` typically return 0
 * or identical values, making it impossible to test actual overflow detection.
 *
 * What we CAN test:
 * - The directive sets up ResizeObserver and MutationObserver
 * - The directive responds to the `enabled` input
 * - The directive calls setAttribute/removeAttribute on the element
 *
 * What requires E2E testing in a real browser:
 * - Actual overflow detection (offsetWidth < scrollWidth)
 * - Observer callbacks triggering on real layout changes
 * - Title attribute appearing/disappearing based on actual overflow
 *
 * Your coworker was correct that the original `if` guards made tests pass silently
 * when they should have failed. The proper solution is to acknowledge that unit tests
 * cannot fully validate layout-dependent behavior and supplement with E2E tests.
 */
describe('TableCellOverflowDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let divElement: HTMLDivElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TestComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        divElement = fixture.nativeElement.querySelector('div');
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(divElement).toBeTruthy();
    });

    it('should be enabled by default', () => {
        expect(component.enabled).toBe(true);
    });

    it('should remove title attribute when disabled', (done) => {
        // Set a title manually
        divElement.setAttribute('title', 'test');

        fixture.detectChanges();

        setTimeout(() => {
            // Disable the directive
            component.enabled = false;
            fixture.detectChanges();

            // Effect should remove the title
            setTimeout(() => {
                expect(divElement.hasAttribute('title')).toBe(false);
                done();
            }, 200);
        }, 200);
    });

    /**
     * This test verifies the directive's logic with mocked layout properties.
     * It proves the code WOULD work if JSDOM calculated layout correctly.
     */
    it('should set title when mocked layout indicates overflow', (done) => {
        // Mock layout to simulate overflow BEFORE directive setup
        Object.defineProperty(divElement, 'offsetWidth', { configurable: true, value: 100 });
        Object.defineProperty(divElement, 'scrollWidth', { configurable: true, value: 500 });
        Object.defineProperty(divElement, 'textContent', { configurable: true, value: 'Long text' });

        component.text = 'Long text';
        fixture.detectChanges();

        // Wait for afterNextRender and initial _updateTitle call
        setTimeout(() => {
            // If the directive is working correctly with our mocked values, title should be set
            expect(divElement.hasAttribute('title')).toBe(true);
            expect(divElement.getAttribute('title')).toBe('Long text');
            done();
        }, 300);
    });

    /**
     * This test verifies the directive doesn't set title when there's no overflow.
     */
    it('should not set title when mocked layout indicates no overflow', (done) => {
        // Mock layout to simulate NO overflow
        Object.defineProperty(divElement, 'offsetWidth', { configurable: true, value: 500 });
        Object.defineProperty(divElement, 'scrollWidth', { configurable: true, value: 100 });

        component.text = 'Short';
        fixture.detectChanges();

        setTimeout(() => {
            expect(divElement.hasAttribute('title')).toBe(false);
            done();
        }, 300);
    });
});
