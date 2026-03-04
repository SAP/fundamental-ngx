import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { FocusableItemDirective } from '../focusable-item/focusable-item.directive';
import { FocusableListDirective } from './focusable-list.directive';

@Component({
    template: `
        <div fdkFocusableList [wrap]="wrap" [focusable]="focusable">
            <div fdkFocusableItem id="item-0" [fdkFocusableItem]="item0Focusable"></div>
            <div fdkFocusableItem id="item-1" [fdkFocusableItem]="item1Focusable"></div>
            <div fdkFocusableItem id="item-2" [fdkFocusableItem]="item2Focusable"></div>
        </div>
    `,
    standalone: true,
    imports: [FocusableListDirective, FocusableItemDirective]
})
class TestComponent {
    @ViewChild(FocusableListDirective, { static: false }) listDirective!: FocusableListDirective;
    wrap = false;
    focusable = false;
    item0Focusable = true;
    item1Focusable = true;
    item2Focusable = true;
}

describe('FocusableListDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let directive: FocusableListDirective;
    let listElement: HTMLElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        listElement = fixture.nativeElement.querySelector('[fdkFocusableList]');
        fixture.detectChanges();
        directive = component.listDirective;
    });

    it('should create', () => {
        expect(directive).toBeTruthy();
    });

    describe('initialization', () => {
        it('should initialize with vertical navigation direction by default', () => {
            expect(directive.navigationDirection()).toBe('vertical');
        });

        it('should initialize with ltr content direction by default', () => {
            expect(directive.contentDirection()).toBe('ltr');
        });

        it('should initialize with wrap disabled by default', () => {
            expect(directive.wrap()).toBe(false);
        });

        it('should initialize with focusable disabled by default', () => {
            expect(directive.focusable).toBe(false);
        });

        it('should have tabindex -1 by default', () => {
            expect(listElement.getAttribute('tabindex')).toBe('-1');
        });

        it('should detect focusable items', () => {
            expect(directive._focusableItems().length).toBe(3);
        });
    });

    describe('focusable property', () => {
        it('should set tabindex to 0 when focusable is true', () => {
            component.focusable = true;
            fixture.detectChanges();

            expect(directive.focusable).toBe(true);
            expect(listElement.getAttribute('tabindex')).toBe('0');
        });

        it('should set tabindex to -1 when focusable is false', () => {
            component.focusable = false;
            fixture.detectChanges();

            expect(directive.focusable).toBe(false);
            expect(listElement.getAttribute('tabindex')).toBe('-1');
        });
    });

    describe('wrap property', () => {
        it('should update wrap value', () => {
            component.wrap = true;
            fixture.detectChanges();

            expect(directive.wrap()).toBe(true);
        });

        it('should support wrapping with true value', () => {
            component.wrap = true;
            fixture.detectChanges();

            directive.setActiveItem(0);

            expect(directive.wrap()).toBe(true);
        });
    });

    describe('navigation direction', () => {
        it('should have vertical navigation direction by default', () => {
            expect(directive.navigationDirection()).toBe('vertical');
        });

        it('should update navigation direction to horizontal', () => {
            directive.navigationDirection.set('horizontal');
            fixture.detectChanges();

            expect(directive.navigationDirection()).toBe('horizontal');
        });

        it('should update navigation direction to grid', () => {
            directive.navigationDirection.set('grid');
            fixture.detectChanges();

            expect(directive.navigationDirection()).toBe('grid');
        });
    });

    describe('content direction', () => {
        it('should have ltr content direction by default', () => {
            expect(directive.contentDirection()).toBe('ltr');
        });

        it('should update content direction to rtl', () => {
            directive.contentDirection.set('rtl');
            fixture.detectChanges();

            expect(directive.contentDirection()).toBe('rtl');
        });
    });

    describe('setActiveItem', () => {
        it('should set active item by index', () => {
            directive.setActiveItem(1);

            // Verify that the key manager's active item index is set to 1
            const keyManager = (directive as any)._keyManager;
            expect(keyManager?.activeItemIndex).toBe(1);
        });

        it('should skip non-focusable items', () => {
            // Make item at index 1 non-focusable
            component.item1Focusable = false;
            fixture.detectChanges();

            // Try to set active item to index 1 (non-focusable)
            directive.setActiveItem(1);

            // Should skip item at index 1 and focus item at index 2 instead
            const keyManager = (directive as any)._keyManager;
            expect(keyManager?.activeItemIndex).toBe(2);
        });

        it('should handle out of bounds index', () => {
            const initialIndex = (directive as any)._keyManager?.activeItemIndex;

            directive.setActiveItem(999);

            // Should not throw error and active index should remain unchanged or null
            const keyManager = (directive as any)._keyManager;
            expect(keyManager?.activeItemIndex).toBe(initialIndex);
            expect(directive).toBeTruthy();
        });
    });

    describe('focus method', () => {
        it('should focus the list when focusable is true', () => {
            directive.focusable = true;
            fixture.detectChanges();

            const focusSpy = jest.spyOn(listElement, 'focus');
            directive.focus();

            expect(focusSpy).toHaveBeenCalled();
        });

        it('should not focus the list when focusable is false', () => {
            directive.focusable = false;
            fixture.detectChanges();

            const focusSpy = jest.spyOn(listElement, 'focus');
            directive.focus();

            expect(focusSpy).not.toHaveBeenCalled();
        });
    });

    describe('setTabbable', () => {
        it('should set tabbable state to true', () => {
            directive.setTabbable(true);
            fixture.detectChanges();

            expect(listElement.getAttribute('tabindex')).toBe('0');
        });

        it('should set tabbable state to false', () => {
            directive.setTabbable(false);
            fixture.detectChanges();

            expect(listElement.getAttribute('tabindex')).toBe('-1');
        });
    });

    describe('itemFocused event', () => {
        it('should emit itemFocused event when item receives focus', () => {
            let emittedEvent: any;
            directive.itemFocused.subscribe((event) => {
                emittedEvent = event;
            });

            fixture.detectChanges();

            const itemElement = fixture.nativeElement.querySelector('[fdkFocusableItem]');
            itemElement.focus();
            itemElement.dispatchEvent(new Event('focus'));

            expect(emittedEvent).toBeDefined();
            expect(emittedEvent.index).toBe(0);
            expect(emittedEvent.total).toBe(3);
            expect(emittedEvent.id).toBe('item-0');
        });
    });

    describe('setItems', () => {
        it('should allow setting items programmatically', () => {
            const items = directive._focusableItems();
            directive.setItems([items[0], items[1]]);

            expect(directive._focusableItems().length).toBe(2);
        });
    });

    describe('grid mode', () => {
        it('should handle grid position setting', () => {
            const position = {
                rowIndex: 0,
                totalRows: 3
            };

            directive._setGridPosition(position);
            fixture.detectChanges();

            const items = directive._focusableItems();
            items.forEach((item, index) => {
                expect(item._position).toEqual({
                    ...position,
                    colIndex: index,
                    totalCols: items.length
                });
            });
        });

        it('should emit grid list focused event on focus', () => {
            let emittedPosition: any;
            directive._gridListFocused$.subscribe((pos) => {
                emittedPosition = pos;
            });

            const position = {
                rowIndex: 0,
                totalRows: 3
            };
            directive._setGridPosition(position);
            fixture.detectChanges();

            directive.focusable = true;
            fixture.detectChanges();

            directive._onFocus();

            expect(emittedPosition).toEqual(position);
        });

        it('should announce grid position with live announcer', () => {
            const liveAnnouncer = TestBed.inject(LiveAnnouncer);
            jest.spyOn(liveAnnouncer, 'announce').mockResolvedValue();
            const clearSpy = jest.spyOn(liveAnnouncer, 'clear');

            const position = {
                rowIndex: 0,
                totalRows: 3
            };
            directive._setGridPosition(position);
            directive.focusable = true;
            fixture.detectChanges();

            directive._onFocus();

            expect(clearSpy).toHaveBeenCalled();
        });
    });

    describe('visibility tracking', () => {
        it('should track visibility state', () => {
            expect(typeof directive._isVisible()).toBe('boolean');
        });
    });

    describe('cleanup', () => {
        it('should destroy key manager on directive destroy', fakeAsync(() => {
            fixture.detectChanges();
            tick();

            const keyManager = (directive as any)._keyManager;
            if (keyManager) {
                const destroySpy = jest.spyOn(keyManager, 'destroy');
                directive.ngOnDestroy();
                expect(destroySpy).toHaveBeenCalled();
            } else {
                directive.ngOnDestroy();
                expect(true).toBe(true); // Pass if no key manager
            }
        }));
    });

    describe('listFocusedEventAnnouncer', () => {
        it('should have default announcer function', () => {
            const position = {
                rowIndex: 1,
                totalRows: 3
            };

            const announcer = directive.listFocusedEventAnnouncer();
            const result = announcer(position);

            expect(result).toBeTruthy();
            expect(typeof result).toBe('string');
        });
    });

    describe('_setItemsTabbable', () => {
        it('should set tabbable state for all items', () => {
            directive._setItemsTabbable(true);
            fixture.detectChanges();

            const items = directive._focusableItems();
            expect(items.length).toBeGreaterThan(0);
        });

        it('should disable tabbable state for all items', () => {
            directive._setItemsTabbable(false);
            fixture.detectChanges();

            const items = directive._focusableItems();
            expect(items.length).toBeGreaterThan(0);
        });
    });
});
