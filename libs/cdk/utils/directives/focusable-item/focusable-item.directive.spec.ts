import { InteractivityChecker, LiveAnnouncer } from '@angular/cdk/a11y';
import { ENTER, ESCAPE, F2, MAC_ENTER } from '@angular/cdk/keycodes';
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { Subject, of } from 'rxjs';
import { TabbableElementService } from '../../services';
import { CellFocusedEventAnnouncer, FocusableItemDirective, FocusableItemPosition } from './focusable-item.directive';
import { FocusableObserver } from './focusable.observer';

@Component({
    standalone: true,
    imports: [FocusableItemDirective],
    template: `
        @if (announcer) {
            <div
                fdkFocusableItem
                [fdkFocusableItem]="isFocusable"
                [cellFocusedEventAnnouncer]="announcer"
                (cellFocused)="onCellFocused($event)"
                (focusableChildElementFocused)="onChildFocused()"
            >
                <button #childButton>Child Button</button>
                <input type="text" #childInput />
            </div>
        } @else {
            <div
                fdkFocusableItem
                [fdkFocusableItem]="isFocusable"
                (cellFocused)="onCellFocused($event)"
                (focusableChildElementFocused)="onChildFocused()"
            >
                <button #childButton>Child Button</button>
                <input type="text" #childInput />
            </div>
        }
    `
})
class TestComponent {
    @ViewChild(FocusableItemDirective, { static: false }) directive: FocusableItemDirective;
    @ViewChild('childButton', { static: false }) childButton: any;
    @ViewChild('childInput', { static: false }) childInput: any;

    isFocusable = true;
    announcer?: CellFocusedEventAnnouncer;
    cellFocusedCount = 0;
    childFocusedCount = 0;

    onCellFocused(position: FocusableItemPosition): void {
        this.cellFocusedCount++;
    }

    onChildFocused(): void {
        this.childFocusedCount++;
    }
}

describe('FocusableItemDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let directive: FocusableItemDirective;
    let element: HTMLElement;
    let mockFocusableObserver: jest.Mocked<FocusableObserver>;
    let mockTabbableElementService: jest.Mocked<TabbableElementService>;
    let mockLiveAnnouncer: jest.Mocked<LiveAnnouncer>;
    let mockInteractivityChecker: jest.Mocked<InteractivityChecker>;

    beforeEach(waitForAsync(() => {
        mockFocusableObserver = {
            observe: jest.fn().mockReturnValue(of(true))
        } as any;

        mockTabbableElementService = {
            getTabbableElement: jest.fn()
        } as any;

        mockLiveAnnouncer = {
            announce: jest.fn().mockResolvedValue(undefined),
            clear: jest.fn()
        } as any;

        mockInteractivityChecker = {
            isFocusable: jest.fn().mockReturnValue(true)
        } as any;

        TestBed.configureTestingModule({
            imports: [TestComponent],
            providers: [
                { provide: FocusableObserver, useValue: mockFocusableObserver },
                { provide: TabbableElementService, useValue: mockTabbableElementService },
                { provide: LiveAnnouncer, useValue: mockLiveAnnouncer },
                { provide: InteractivityChecker, useValue: mockInteractivityChecker }
            ]
        }).compileComponents();
    }));

    beforeEach(async () => {
        // Need for A11y cdk module to correctly define tabbable/focusable element.
        Object.defineProperty(global.window.HTMLElement.prototype, 'offsetWidth', { configurable: true, value: 10 });

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        await fixture.whenStable();
        directive = component.directive;
        element = directive.elementRef.nativeElement;
    });

    it('should create', () => {
        expect(directive).toBeTruthy();
    });

    it('should have default tabindex of 0 when focusable', () => {
        expect(element.getAttribute('tabindex')).toBe('0');
    });

    it('should set tabindex to -1 when not focusable', () => {
        component.isFocusable = false;
        fixture.detectChanges();
        expect(element.getAttribute('tabindex')).toBe('-1');
    });

    it('should return element from element() method', () => {
        expect(directive.element()).toBe(element);
    });

    it('should return focusable state from isFocusable()', () => {
        expect(directive.isFocusable()).toBe(true);
        component.isFocusable = false;
        fixture.detectChanges();
        expect(directive.isFocusable()).toBe(false);
    });

    it('should set focusable state programmatically', () => {
        directive.setFocusable(false);
        expect(directive.isFocusable()).toBe(false);
        directive.setFocusable(true);
        expect(directive.isFocusable()).toBe(true);
    });

    it('should focus element when focus() is called', () => {
        const focusSpy = jest.spyOn(element, 'focus');
        directive.focus();
        expect(focusSpy).toHaveBeenCalled();
    });

    it('should set tabbable state and update tabindex', () => {
        directive.setTabbable(false);
        fixture.detectChanges();
        expect(element.getAttribute('tabindex')).toBe('-1');

        directive.setTabbable(true);
        fixture.detectChanges();
        expect(element.getAttribute('tabindex')).toBe('0');
    });

    describe('focusin event', () => {
        it('should emit cellFocused when element receives focus with position set', fakeAsync(() => {
            directive._position = { rowIndex: 0, colIndex: 1, totalRows: 5, totalCols: 3 };

            directive.cellFocused.subscribe((emittedPosition) => {
                expect(emittedPosition).toEqual({ rowIndex: 0, colIndex: 1, totalRows: 5, totalCols: 3 });
            });

            element.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
            tick();
        }));

        it('should announce position using custom announcer', fakeAsync(() => {
            const customAnnouncer = jest.fn((pos: FocusableItemPosition) => `Custom: ${pos.rowIndex},${pos.colIndex}`);
            component.announcer = customAnnouncer;
            fixture.detectChanges();

            // Re-get references since @if (announcer) recreated the DOM
            directive = component.directive;
            element = fixture.nativeElement.querySelector('[fdkFocusableItem]');

            directive._position = { rowIndex: 2, colIndex: 3, totalRows: 5, totalCols: 4 };
            element.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
            tick();

            expect(mockLiveAnnouncer.clear).toHaveBeenCalled();
            expect(mockLiveAnnouncer.announce).toHaveBeenCalledWith('Custom: 2,3');
        }));

        it('should announce position using default announcer', fakeAsync(() => {
            directive._position = { rowIndex: 1, colIndex: 2, totalRows: 5, totalCols: 4 };
            fixture.detectChanges();

            element.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
            tick();

            expect(mockLiveAnnouncer.announce).toHaveBeenCalledWith('Column 3 of 4, row: 2 of 5');
        }));

        it('should emit _parentFocusableItemFocused when element itself is focused', fakeAsync(() => {
            let parentFocusedEmitted = false;
            directive._parentFocusableItemFocused.subscribe(() => (parentFocusedEmitted = true));

            element.focus();
            element.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
            tick();

            expect(parentFocusedEmitted).toBe(true);
        }));

        it('should emit focusableChildElementFocused when focusable child is focused', fakeAsync(() => {
            let childFocusedEmitted = false;
            directive.focusableChildElementFocused.subscribe(() => (childFocusedEmitted = true));

            const childButton = element.querySelector('button') as HTMLElement;
            childButton.focus();
            element.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
            tick();

            expect(childFocusedEmitted).toBe(true);
        }));

        it('should not emit events when not focusable', fakeAsync(() => {
            directive.setFocusable(false);
            directive._position = { rowIndex: 0, colIndex: 0, totalRows: 1, totalCols: 1 };
            let cellFocusedEmitted = false;
            directive.cellFocused.subscribe(() => (cellFocusedEmitted = true));

            element.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
            tick();

            expect(cellFocusedEmitted).toBe(false);
        }));
    });

    describe('keydown event', () => {
        it('should emit keydown when element is focused', () => {
            const keydownSpy = jest.fn();
            directive.keydown.subscribe(keydownSpy);

            element.focus();
            const event = new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true });
            element.dispatchEvent(event);

            expect(keydownSpy).toHaveBeenCalled();
        });

        it('should focus first tabbable child on ENTER key', () => {
            const childButton = element.querySelector('button') as HTMLElement;
            mockTabbableElementService.getTabbableElement.mockReturnValue(childButton);
            const focusSpy = jest.spyOn(childButton, 'focus');

            element.focus();
            const event = new KeyboardEvent('keydown', { keyCode: ENTER, bubbles: true });
            Object.defineProperty(event, 'keyCode', { value: ENTER });
            element.dispatchEvent(event);

            expect(focusSpy).toHaveBeenCalled();
        });

        it('should focus first tabbable child on MAC_ENTER key', () => {
            const childButton = element.querySelector('button') as HTMLElement;
            mockTabbableElementService.getTabbableElement.mockReturnValue(childButton);
            const focusSpy = jest.spyOn(childButton, 'focus');

            element.focus();
            const event = new KeyboardEvent('keydown', { keyCode: MAC_ENTER, bubbles: true });
            Object.defineProperty(event, 'keyCode', { value: MAC_ENTER });
            element.dispatchEvent(event);

            expect(focusSpy).toHaveBeenCalled();
        });

        it('should focus first tabbable child on F2 key', () => {
            const childButton = element.querySelector('button') as HTMLElement;
            mockTabbableElementService.getTabbableElement.mockReturnValue(childButton);
            const focusSpy = jest.spyOn(childButton, 'focus');

            element.focus();
            const event = new KeyboardEvent('keydown', { keyCode: F2, bubbles: true });
            Object.defineProperty(event, 'keyCode', { value: F2 });
            element.dispatchEvent(event);

            expect(focusSpy).toHaveBeenCalled();
        });

        it('should not focus child when shift+F2 is pressed on cell', () => {
            const childButton = element.querySelector('button') as HTMLElement;
            mockTabbableElementService.getTabbableElement.mockReturnValue(childButton);
            const focusSpy = jest.spyOn(childButton, 'focus');

            element.focus();
            const event = new KeyboardEvent('keydown', { keyCode: F2, shiftKey: true, bubbles: true });
            Object.defineProperty(event, 'keyCode', { value: F2 });
            element.dispatchEvent(event);

            expect(focusSpy).not.toHaveBeenCalled();
        });

        it('should focus cell on ESCAPE when child is focused', () => {
            const childButton = element.querySelector('button') as HTMLElement;
            childButton.focus();
            const focusSpy = jest.spyOn(element, 'focus');

            const event = new KeyboardEvent('keydown', { keyCode: ESCAPE, bubbles: true });
            Object.defineProperty(event, 'keyCode', { value: ESCAPE });
            element.dispatchEvent(event);

            expect(focusSpy).toHaveBeenCalled();
        });

        it('should focus cell on Shift+F2 when child is focused', () => {
            const childButton = element.querySelector('button') as HTMLElement;
            childButton.focus();
            const focusSpy = jest.spyOn(element, 'focus');

            const event = new KeyboardEvent('keydown', { keyCode: F2, shiftKey: true, bubbles: true });
            Object.defineProperty(event, 'keyCode', { value: F2 });
            element.dispatchEvent(event);

            expect(focusSpy).toHaveBeenCalled();
        });

        it('should not handle keydown when not focusable', () => {
            directive.setFocusable(false);
            const keydownSpy = jest.fn();
            directive.keydown.subscribe(keydownSpy);

            element.focus();
            const event = new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true });
            element.dispatchEvent(event);

            expect(keydownSpy).not.toHaveBeenCalled();
        });

        it('should stop propagation when focusing child', () => {
            const childButton = element.querySelector('button') as HTMLElement;
            mockTabbableElementService.getTabbableElement.mockReturnValue(childButton);

            element.focus();
            const event = new KeyboardEvent('keydown', { keyCode: ENTER, bubbles: true });
            Object.defineProperty(event, 'keyCode', { value: ENTER });
            const stopPropSpy = jest.spyOn(event, 'stopPropagation');
            element.dispatchEvent(event);

            expect(stopPropSpy).toHaveBeenCalled();
        });

        it('should stop propagation when focusing cell from child', () => {
            const childButton = element.querySelector('button') as HTMLElement;
            childButton.focus();

            const event = new KeyboardEvent('keydown', { keyCode: ESCAPE, bubbles: true });
            Object.defineProperty(event, 'keyCode', { value: ESCAPE });
            const stopPropSpy = jest.spyOn(event, 'stopPropagation');
            element.dispatchEvent(event);

            expect(stopPropSpy).toHaveBeenCalled();
        });
    });

    describe('tabbable elements management', () => {
        it('should disable tabbable elements', () => {
            const childButton = element.querySelector('button') as HTMLElement;
            const childInput = element.querySelector('input') as HTMLElement;
            childButton.tabIndex = 0;
            childInput.tabIndex = 0;

            directive.disableTabbableElements();

            expect(childButton.tabIndex).toBe(-1);
            expect(childInput.tabIndex).toBe(-1);
        });

        it('should enable tabbable elements and restore original tabIndex', () => {
            const childButton = element.querySelector('button') as HTMLElement;
            const childInput = element.querySelector('input') as HTMLElement;
            childButton.tabIndex = 0;
            childInput.tabIndex = 2;

            directive.disableTabbableElements();
            expect(childButton.tabIndex).toBe(-1);
            expect(childInput.tabIndex).toBe(-1);

            directive.enableTabbableElements();
            expect(childButton.tabIndex).toBe(0);
            expect(childInput.tabIndex).toBe(2);
        });

        it('should not fail when enabling tabbable elements with no disabled elements', () => {
            expect(() => directive.enableTabbableElements()).not.toThrow();
        });

        it('should only disable elements with tabIndex >= 0', () => {
            const childButton = element.querySelector('button') as HTMLElement;
            childButton.tabIndex = -1;

            directive.disableTabbableElements();

            // Element should still be -1 and not tracked
            expect(childButton.tabIndex).toBe(-1);
        });
    });

    describe('focusable observer integration', () => {
        it('should observe element focusability', () => {
            expect(mockFocusableObserver.observe).toHaveBeenCalledWith(directive.elementRef, false);
        });

        it('should update focusable state when observer emits', fakeAsync(() => {
            const focusableSubject = new Subject<boolean>();
            mockFocusableObserver.observe.mockReturnValue(focusableSubject);

            // Create a new component to trigger the observer subscription
            const newFixture = TestBed.createComponent(TestComponent);
            newFixture.detectChanges();
            const newDirective = newFixture.componentInstance.directive;

            expect(newDirective.isFocusable()).toBe(true);

            focusableSubject.next(false);
            tick();

            expect(newDirective.isFocusable()).toBe(false);

            focusableSubject.next(true);
            tick();

            expect(newDirective.isFocusable()).toBe(true);
        }));
    });

    describe('input and output bindings', () => {
        it('should accept fdkFocusableItem input', () => {
            component.isFocusable = false;
            fixture.detectChanges();
            expect(directive.fdkFocusableItem()).toBe(false);
        });

        it('should emit cellFocused output', fakeAsync(() => {
            directive._position = { rowIndex: 0, colIndex: 0, totalRows: 1, totalCols: 1 };
            element.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
            tick();
            expect(component.cellFocusedCount).toBe(1);
        }));

        it('should emit focusableChildElementFocused output', fakeAsync(() => {
            let childFocusedCount = 0;
            directive.focusableChildElementFocused.subscribe(() => childFocusedCount++);
            const childButton = element.querySelector('button') as HTMLElement;
            childButton.focus();
            tick();
            expect(childFocusedCount).toBe(1);
        }));
    });
});
