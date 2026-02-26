import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ClickedDirective } from './clicked.directive';

@Component({
    standalone: true,
    imports: [ClickedDirective],
    template: ` <div fdkClicked (fdkClicked)="onClicked($event)">Click me</div> `
})
class TestComponent {
    @ViewChild(ClickedDirective, { static: true }) directive!: ClickedDirective;

    clickCount = 0;
    lastEvent?: MouseEvent | KeyboardEvent;

    onClicked(event: MouseEvent | KeyboardEvent): void {
        this.clickCount++;
        this.lastEvent = event;
    }
}

describe('ClickedDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let directive: ClickedDirective;
    let element: HTMLElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        directive = component.directive;
        element = fixture.nativeElement.querySelector('[fdkClicked]');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(directive).toBeTruthy();
    });

    describe('static eventName', () => {
        it('should have correct event name', () => {
            expect(ClickedDirective.eventName).toBe('fdkClicked');
        });
    });

    describe('mouse click', () => {
        it('should emit event on mouse click', () => {
            const clickEvent = new MouseEvent('click', { bubbles: true });
            element.dispatchEvent(clickEvent);

            expect(component.clickCount).toBe(1);
            expect(component.lastEvent).toBeInstanceOf(MouseEvent);
            expect(component.lastEvent?.type).toBe('click');
        });

        it('should emit multiple times for multiple clicks', () => {
            element.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            element.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            element.dispatchEvent(new MouseEvent('click', { bubbles: true }));

            expect(component.clickCount).toBe(3);
        });

        it('should pass mouse event details', () => {
            const clickEvent = new MouseEvent('click', {
                bubbles: true,
                clientX: 100,
                clientY: 200
            });
            element.dispatchEvent(clickEvent);

            expect(component.lastEvent).toBeInstanceOf(MouseEvent);
            const mouseEvent = component.lastEvent as MouseEvent;
            expect(mouseEvent.clientX).toBe(100);
            expect(mouseEvent.clientY).toBe(200);
        });
    });

    describe('Enter key', () => {
        it('should emit event on Enter key press', () => {
            const enterEvent = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
            element.dispatchEvent(enterEvent);

            expect(component.clickCount).toBe(1);
            expect(component.lastEvent).toBeInstanceOf(KeyboardEvent);
            expect((component.lastEvent as KeyboardEvent).key).toBe('Enter');
        });

        it('should emit on Enter keydown specifically', () => {
            // Should work with keydown
            element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
            expect(component.clickCount).toBe(1);

            // keyup should not trigger (directive listens to keydown.enter)
            element.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', bubbles: true }));
            expect(component.clickCount).toBe(1); // Still 1, not 2
        });
    });

    describe('Space key', () => {
        it('should emit event on Space key press', () => {
            const spaceEvent = new KeyboardEvent('keydown', { key: ' ', bubbles: true });
            element.dispatchEvent(spaceEvent);

            expect(component.clickCount).toBe(1);
            expect(component.lastEvent).toBeInstanceOf(KeyboardEvent);
            expect((component.lastEvent as KeyboardEvent).key).toBe(' ');
        });

        it('should emit on Space keydown specifically', () => {
            // Should work with keydown
            element.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
            expect(component.clickCount).toBe(1);

            // keyup should not trigger
            element.dispatchEvent(new KeyboardEvent('keyup', { key: ' ', bubbles: true }));
            expect(component.clickCount).toBe(1); // Still 1, not 2
        });
    });

    describe('combined interactions', () => {
        it('should emit for all three interaction types', () => {
            // Mouse click
            element.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            expect(component.clickCount).toBe(1);

            // Enter key
            element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
            expect(component.clickCount).toBe(2);

            // Space key
            element.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
            expect(component.clickCount).toBe(3);
        });

        it('should maintain separate event types', () => {
            const events: Array<MouseEvent | KeyboardEvent> = [];
            const subscription = directive.fdkClicked.subscribe((event) => {
                events.push(event);
            });

            element.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
            element.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));

            expect(events.length).toBe(3);
            expect(events[0]).toBeInstanceOf(MouseEvent);
            expect(events[1]).toBeInstanceOf(KeyboardEvent);
            expect(events[2]).toBeInstanceOf(KeyboardEvent);

            subscription.unsubscribe();
        });
    });

    describe('other keys', () => {
        it('should not emit on other keyboard keys', () => {
            element.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', bubbles: true }));
            element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }));
            element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
            element.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));

            expect(component.clickCount).toBe(0);
        });
    });

    describe('cleanup', () => {
        it('should stop emitting after component is destroyed', () => {
            element.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            expect(component.clickCount).toBe(1);

            // Destroy the component
            fixture.destroy();

            // Try to emit events (should not cause errors)
            element.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));

            // Count should still be 1
            expect(component.clickCount).toBe(1);
        });
    });

    describe('programmatic subscription', () => {
        it('should allow programmatic subscription to output', () => {
            const events: Array<MouseEvent | KeyboardEvent> = [];
            const subscription = directive.fdkClicked.subscribe((event) => {
                events.push(event);
            });

            element.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));

            expect(events.length).toBe(2);

            subscription.unsubscribe();
        });

        it('should handle multiple subscribers', () => {
            let count1 = 0;
            let count2 = 0;

            const sub1 = directive.fdkClicked.subscribe(() => count1++);
            const sub2 = directive.fdkClicked.subscribe(() => count2++);

            element.dispatchEvent(new MouseEvent('click', { bubbles: true }));

            expect(count1).toBe(1);
            expect(count2).toBe(1);

            sub1.unsubscribe();
            sub2.unsubscribe();
        });
    });
});
