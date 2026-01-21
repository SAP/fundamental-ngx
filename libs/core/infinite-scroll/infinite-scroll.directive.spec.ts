import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { InfiniteScrollDirective } from './infinite-scroll.directive';

@Component({
    template: `
        <div
            fdInfiniteScroll
            [scrollPercent]="scrollPercent"
            [scrollOffset]="scrollOffset"
            (onScrollAction)="onScroll()"
            [style.max-height.px]="200"
        >
            <div style="height: 1000px">Content</div>
        </div>
    `,
    imports: [InfiniteScrollDirective]
})
class TestComponent {
    scrollPercent = 75;
    scrollOffset: number | null = null;
    scrollCount = 0;

    onScroll(): void {
        this.scrollCount++;
    }
}

describe('InfiniteScrollDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let directiveElement: DebugElement;
    let nativeElement: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestComponent]
        });
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        directiveElement = fixture.debugElement.query(By.directive(InfiniteScrollDirective));
        nativeElement = directiveElement.nativeElement;

        // Mock scroll dimensions since JSDOM doesn't compute them from CSS
        Object.defineProperty(nativeElement, 'scrollHeight', { configurable: true, value: 1000 });
        Object.defineProperty(nativeElement, 'offsetHeight', { configurable: true, value: 200 });
        Object.defineProperty(nativeElement, 'scrollTop', {
            configurable: true,
            writable: true,
            value: 0
        });

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(directiveElement).toBeTruthy();
    });

    it('should have default scrollPercent of 75', () => {
        const directive = directiveElement.injector.get(InfiniteScrollDirective);
        expect(directive.scrollPercent()).toBe(75);
    });

    it('should update scrollPercent when input changes', () => {
        component.scrollPercent = 90;
        fixture.detectChanges();

        const directive = directiveElement.injector.get(InfiniteScrollDirective);
        expect(directive.scrollPercent()).toBe(90);
    });

    it('should update scrollOffset when input changes', () => {
        component.scrollOffset = 100;
        fixture.detectChanges();

        const directive = directiveElement.injector.get(InfiniteScrollDirective);
        expect(directive.scrollOffset()).toBe(100);
    });

    it('should trigger scroll action when scrollPercent threshold is met', (done) => {
        // Scroll to 80% (exceeds 75% threshold)
        nativeElement.scrollTop = 640; // 640 + 200 (offsetHeight) = 840, 840/1000 = 0.84 (84%)

        nativeElement.dispatchEvent(new Event('scroll'));

        // Wait for debounce (50ms) + small buffer
        setTimeout(() => {
            expect(component.scrollCount).toBe(1);
            done();
        }, 100);
    });

    it('should not trigger scroll action when scrollPercent threshold is not met', (done) => {
        // Scroll to 50% (below 75% threshold)
        nativeElement.scrollTop = 300; // 300 + 200 = 500, 500/1000 = 0.5 (50%)

        nativeElement.dispatchEvent(new Event('scroll'));

        setTimeout(() => {
            expect(component.scrollCount).toBe(0);
            done();
        }, 100);
    });

    it('should use scrollOffset when provided', (done) => {
        component.scrollOffset = 200;
        fixture.detectChanges();

        // Scroll to position where remaining scroll is less than scrollOffset
        // scrollHeight = 1000, offsetHeight = 200
        // scrollTop + offsetHeight > scrollHeight - scrollOffset
        // scrollTop + 200 > 1000 - 200 = 800
        nativeElement.scrollTop = 650; // 650 + 200 = 850 > 800

        nativeElement.dispatchEvent(new Event('scroll'));

        setTimeout(() => {
            expect(component.scrollCount).toBe(1);
            done();
        }, 100);
    });

    it('should not trigger scroll action when scrollOffset threshold is not met', (done) => {
        component.scrollOffset = 300;
        fixture.detectChanges();

        // Scroll to position where remaining scroll is more than scrollOffset
        // scrollTop + 200 > 1000 - 300 = 700
        nativeElement.scrollTop = 400; // 400 + 200 = 600 < 700

        nativeElement.dispatchEvent(new Event('scroll'));

        setTimeout(() => {
            expect(component.scrollCount).toBe(0);
            done();
        }, 100);
    });

    it('should debounce scroll events', (done) => {
        // Trigger multiple rapid scroll events
        nativeElement.scrollTop = 640;
        nativeElement.dispatchEvent(new Event('scroll'));
        nativeElement.dispatchEvent(new Event('scroll'));
        nativeElement.dispatchEvent(new Event('scroll'));

        // Should only fire once due to debouncing
        setTimeout(() => {
            expect(component.scrollCount).toBe(1);
            done();
        }, 100);
    });

    it('should call shouldTriggerAction and return correct value based on scrollPercent', () => {
        const directive = directiveElement.injector.get(InfiniteScrollDirective);

        // Scroll to 80%
        nativeElement.scrollTop = 640;
        expect(directive.shouldTriggerAction()).toBe(true);

        // Scroll to 50%
        nativeElement.scrollTop = 300;
        expect(directive.shouldTriggerAction()).toBe(false);
    });

    it('should call shouldTriggerAction and return correct value based on scrollOffset', () => {
        component.scrollOffset = 200;
        fixture.detectChanges();

        const directive = directiveElement.injector.get(InfiniteScrollDirective);

        // Remaining scroll < scrollOffset
        nativeElement.scrollTop = 850;
        expect(directive.shouldTriggerAction()).toBe(true);

        // Remaining scroll > scrollOffset
        nativeElement.scrollTop = 500;
        expect(directive.shouldTriggerAction()).toBe(false);
    });

    it('should emit onScrollAction event', (done) => {
        const directive = directiveElement.injector.get(InfiniteScrollDirective);
        let emitted = false;

        // Subscribe to the output using subscribe method
        const subscription = directive.onScrollAction.subscribe(() => {
            emitted = true;
        });

        nativeElement.scrollTop = 640;
        nativeElement.dispatchEvent(new Event('scroll'));

        setTimeout(() => {
            expect(emitted).toBe(true);
            subscription.unsubscribe();
            done();
        }, 100);
    });

    it('should clean up on destroy', (done) => {
        // Set scroll position and wait for potential emission
        nativeElement.scrollTop = 640;
        nativeElement.dispatchEvent(new Event('scroll'));

        // Wait for debounce to complete
        setTimeout(() => {
            const initialCount = component.scrollCount;

            // Destroy component
            fixture.destroy();

            // Try to trigger scroll after destroy
            nativeElement.scrollTop = 700;
            nativeElement.dispatchEvent(new Event('scroll'));

            // Wait again to ensure no new emissions
            setTimeout(() => {
                // Count should not have increased after destroy
                expect(component.scrollCount).toBe(initialCount);
                done();
            }, 100);
        }, 100);
    });
});
