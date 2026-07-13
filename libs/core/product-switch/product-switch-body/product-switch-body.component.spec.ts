import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DOWN_ARROW, ENTER, LEFT_ARROW, RIGHT_ARROW, SPACE, UP_ARROW } from '@angular/cdk/keycodes';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DndItemDirective, FdDropEvent } from '@fundamental-ngx/cdk/utils';
import { createKeyboardEvent } from '@fundamental-ngx/core/tests';
import { ProductSwitchBodyComponent } from './product-switch-body.component';
import { ProductSwitchItem } from './product-switch.item';

const SMALL_LIST: ProductSwitchItem[] = [
    {
        title: 'Home',
        subtitle: 'Central Home',
        icon: 'home',
        stickToPosition: true,
        disabledDragAndDrop: true
    },
    {
        title: 'Analytics Cloud',
        subtitle: 'Analytics Cloud',
        icon: 'business-objects-experience',
        selected: true
    },
    {
        title: 'Catalog',
        subtitle: 'Ariba',
        icon: 'contacts'
    },
    {
        title: 'Guided Buying',
        icon: 'credit-card'
    },
    {
        title: 'Strategic Procurement',
        icon: 'cart-3'
    }
];

const LARGE_LIST: ProductSwitchItem[] = [
    { title: 'Home', icon: 'home' },
    { title: 'Analytics', icon: 'chart' },
    { title: 'Catalog', icon: 'contacts' },
    { title: 'Buying', icon: 'credit-card' },
    { title: 'Procurement', icon: 'cart-3' },
    { title: 'Finance', icon: 'money-bills' },
    { title: 'HR', icon: 'employee' },
    { title: 'Marketing', icon: 'marketing-campaign' }
];

@Component({
    selector: 'fd-product-switch-body-test',
    template:
        '<fd-product-switch-body [products]="list" [forceListMode]="forceListMode" [dragAndDropEnabled]="dragAndDropEnabled"> </fd-product-switch-body>',
    imports: [ProductSwitchBodyComponent]
})
class ProductSwitchBodyTestComponent {
    list: ProductSwitchItem[] = [...SMALL_LIST];
    forceListMode = false;
    dragAndDropEnabled = true;
}

describe('ProductSwitchBodyComponent', () => {
    let fixture: ComponentFixture<ProductSwitchBodyTestComponent>, debugElement: DebugElement;
    let componentInstance: ProductSwitchBodyComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ProductSwitchBodyTestComponent]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductSwitchBodyTestComponent);
        debugElement = fixture.debugElement;
        fixture.detectChanges();
        const bodyDebugEl = debugElement.query(By.directive(ProductSwitchBodyComponent));
        componentInstance = bodyDebugEl.injector.get(ProductSwitchBodyComponent);
    });

    describe('creation', () => {
        it('should create the component', () => {
            expect(componentInstance).toBeTruthy();
        });

        it('should have dragAndDropEnabled true by default', () => {
            expect(componentInstance.dragAndDropEnabled).toBe(true);
        });

        it('should have forceListMode false by default', () => {
            expect(componentInstance.forceListMode).toBe(false);
        });

        it('should have isOpen false by default', () => {
            expect(componentInstance.isOpen()).toBe(false);
        });
    });

    describe('rendering', () => {
        it('should render one list item per product', () => {
            const items = fixture.debugElement.queryAll(By.css('li.fd-product-switch__item'));
            expect(items.length).toBe(SMALL_LIST.length);
        });

        it('should display the product title', () => {
            const firstItem = fixture.debugElement.query(By.css('.fd-product-switch__title'));
            expect(firstItem.nativeElement.textContent.trim()).toBe('Home');
        });

        it('should display the product subtitle when provided', () => {
            const subtitles = fixture.debugElement.queryAll(By.css('.fd-product-switch__subtitle'));
            // 3 of the 5 items have subtitles
            expect(subtitles.length).toBe(3);
            expect(subtitles[0].nativeElement.textContent.trim()).toBe('Central Home');
        });

        it('should not render subtitle element when subtitle is absent', () => {
            fixture.componentInstance.list = [{ title: 'No Subtitle', icon: 'home' }];
            fixture.detectChanges();
            const subtitles = fixture.debugElement.queryAll(By.css('.fd-product-switch__subtitle'));
            expect(subtitles.length).toBe(0);
        });

        it('should mark the selected item with the selected class', () => {
            const items = fixture.debugElement.queryAll(By.css('li.fd-product-switch__item'));
            // second item has selected: true
            expect(items[1].nativeElement.classList).toContain('selected');
            expect(items[0].nativeElement.classList).not.toContain('selected');
        });

        it('should render an anchor element when product has a url', () => {
            fixture.componentInstance.list = [{ title: 'Link Product', icon: 'home', url: 'https://example.com' }];
            fixture.detectChanges();
            const anchor = fixture.debugElement.query(By.css('a.fd-product-switch__link'));
            expect(anchor).toBeTruthy();
            expect(anchor.nativeElement.getAttribute('href')).toBe('https://example.com');
        });

        it('should not render an anchor when product has no url', () => {
            fixture.componentInstance.list = [{ title: 'No Link', icon: 'home' }];
            fixture.detectChanges();
            const anchor = fixture.debugElement.query(By.css('a.fd-product-switch__link'));
            expect(anchor).toBeFalsy();
        });

        it('should set correct ARIA attributes on each item', () => {
            const items = fixture.debugElement.queryAll(By.css('li.fd-product-switch__item'));
            expect(items[0].nativeElement.getAttribute('aria-posinset')).toBe('1');
            expect(items[0].nativeElement.getAttribute('aria-setsize')).toBe(String(SMALL_LIST.length));
            expect(items[items.length - 1].nativeElement.getAttribute('aria-posinset')).toBe(String(SMALL_LIST.length));
        });
    });

    describe('@Input dragAndDropEnabled', () => {
        it('should pass draggable=true to the DnD item when dragAndDropEnabled is true and item does not disable it', () => {
            // Second item has no disabledDragAndDrop, so it should be draggable
            const dndItems = fixture.debugElement.queryAll(By.directive(DndItemDirective));
            expect((dndItems[1].injector.get(DndItemDirective) as DndItemDirective)['_draggable']).toBe(true);
        });

        it('should pass draggable=false to all DnD items when dragAndDropEnabled is false', () => {
            fixture.componentInstance.dragAndDropEnabled = false;
            fixture.detectChanges();
            const dndItems = fixture.debugElement.queryAll(By.directive(DndItemDirective));
            dndItems.forEach((item) => {
                expect((item.injector.get(DndItemDirective) as DndItemDirective)['_draggable']).toBe(false);
            });
        });

        it('should pass draggable=false for items with disabledDragAndDrop set', () => {
            // First item has disabledDragAndDrop: true
            const dndItems = fixture.debugElement.queryAll(By.directive(DndItemDirective));
            expect((dndItems[0].injector.get(DndItemDirective) as DndItemDirective)['_draggable']).toBe(false);
        });
    });

    describe('@Input forceListMode', () => {
        it('should report list mode when forceListMode is true', () => {
            fixture.componentInstance.forceListMode = true;
            fixture.detectChanges();
            expect(componentInstance._isListMode()).toBe(true);
        });

        it('should apply mobile CSS class when in list mode', () => {
            fixture.componentInstance.forceListMode = true;
            fixture.detectChanges();
            const body = fixture.debugElement.query(By.css('.fd-product-switch__body'));
            expect(body.nativeElement.classList).toContain('fd-product-switch__body--mobile');
        });
    });

    describe('_isSmallMode()', () => {
        it('should return true when products count is less than 7', () => {
            expect(componentInstance._isSmallMode()).toBe(true);
        });

        it('should return false when products count is 7 or more', () => {
            componentInstance.products = [...LARGE_LIST];
            expect(componentInstance._isSmallMode()).toBe(false);
        });
    });

    describe('model isOpen', () => {
        it('should default to false', () => {
            expect(componentInstance.isOpen()).toBe(false);
        });

        it('should update when set programmatically', () => {
            componentInstance.isOpen.set(true);
            fixture.detectChanges();
            expect(componentInstance.isOpen()).toBe(true);
        });
    });

    describe('@Output itemClicked', () => {
        it('should emit itemClicked when an item is clicked', () => {
            const spy = jest.fn();
            componentInstance.itemClicked.subscribe(spy);
            const firstItem = fixture.debugElement.query(By.css('li.fd-product-switch__item'));
            firstItem.nativeElement.click();
            expect(spy).toHaveBeenCalled();
        });

        it('should mark the clicked item as selected and deselect others', () => {
            const items = fixture.debugElement.queryAll(By.css('li.fd-product-switch__item'));
            // Click the first (unselected) item
            items[0].nativeElement.click();
            fixture.detectChanges();
            expect(componentInstance.products[0].selected).toBe(true);
            expect(componentInstance.products[1].selected).toBe(false);
        });

        it('should invoke item callback with the click event when provided', () => {
            const callbackSpy = jest.fn();
            fixture.componentInstance.list = [{ title: 'With Callback', icon: 'home', callback: callbackSpy }];
            fixture.detectChanges();
            const item = fixture.debugElement.query(By.css('li.fd-product-switch__item'));
            item.nativeElement.click();
            expect(callbackSpy).toHaveBeenCalledTimes(1);
        });
    });

    describe('@Output productsChange', () => {
        it('should emit productsChange and update products when items are dropped', () => {
            const spy = jest.fn();
            componentInstance.productsChange.subscribe(spy);
            const reordered: ProductSwitchItem[] = [SMALL_LIST[1], SMALL_LIST[0], ...SMALL_LIST.slice(2)];
            const dropEvent: FdDropEvent<ProductSwitchItem> = {
                items: reordered,
                replacedItemIndex: 0,
                draggedItemIndex: 1,
                insertAt: 'before',
                mode: 'shift'
            };
            componentInstance._productSwitchItemsChangeHandle(dropEvent);
            expect(spy).toHaveBeenCalledWith(reordered);
            expect(componentInstance.products).toBe(reordered);
        });
    });

    describe('keyboard navigation — ENTER / SPACE', () => {
        it('should call preventDefault and click the item on ENTER', () => {
            const el = fixture.debugElement.query(By.css('li'));
            jest.spyOn(el.nativeElement, 'click');
            el.nativeElement.focus();
            const keyboardEvent = createKeyboardEvent('keydown', ENTER, 'Enter', el.nativeElement);
            jest.spyOn(keyboardEvent, 'preventDefault');
            el.nativeElement.dispatchEvent(keyboardEvent);

            expect(keyboardEvent.preventDefault).toHaveBeenCalled();
            expect(el.nativeElement.click).toHaveBeenCalled();
        });

        it('should call preventDefault and click the item on SPACE', () => {
            const el = fixture.debugElement.query(By.css('li'));
            jest.spyOn(el.nativeElement, 'click');
            el.nativeElement.focus();
            const keyboardEvent = createKeyboardEvent('keydown', SPACE, ' ', el.nativeElement);
            jest.spyOn(keyboardEvent, 'preventDefault');
            el.nativeElement.dispatchEvent(keyboardEvent);

            expect(keyboardEvent.preventDefault).toHaveBeenCalled();
            expect(el.nativeElement.click).toHaveBeenCalled();
        });
    });

    describe('keyboard navigation — grid mode (small, 3 columns)', () => {
        beforeEach(() => {
            jest.spyOn(componentInstance, '_isListMode').mockReturnValue(false);
        });

        it('should move focus to the next sibling on RIGHT_ARROW', () => {
            const el = fixture.debugElement.query(By.css('li'));
            const nextEl = el.nativeElement.nextElementSibling;
            el.nativeElement.focus();
            const keyboardEvent = createKeyboardEvent('keydown', RIGHT_ARROW, 'ArrowRight', el.nativeElement);
            el.nativeElement.dispatchEvent(keyboardEvent);

            expect(document.activeElement).toBe(nextEl);
        });

        it('should wrap focus to the first item when RIGHT_ARROW is pressed on the last item', () => {
            const els = fixture.debugElement.queryAll(By.css('li'));
            const lastEl = els[els.length - 1];
            lastEl.nativeElement.focus();
            const keyboardEvent = createKeyboardEvent('keydown', RIGHT_ARROW, 'ArrowRight', lastEl.nativeElement);
            lastEl.nativeElement.dispatchEvent(keyboardEvent);

            expect(document.activeElement).toBe(els[0].nativeElement);
        });

        it('should move focus to the previous sibling on LEFT_ARROW', () => {
            const el = fixture.debugElement.query(By.css('li'));
            const nextEl = el.nativeElement.nextElementSibling;
            nextEl.focus();
            const keyboardEvent = createKeyboardEvent('keydown', LEFT_ARROW, 'ArrowLeft', nextEl);
            nextEl.dispatchEvent(keyboardEvent);

            expect(document.activeElement).toBe(el.nativeElement);
        });

        it('should move focus down by 3 columns on DOWN_ARROW (small mode)', () => {
            const el = fixture.debugElement.query(By.css('li'));
            // Column size is 3 in small mode
            const targetEl = el.nativeElement.nextElementSibling.nextElementSibling.nextElementSibling;
            el.nativeElement.focus();
            const keyboardEvent = createKeyboardEvent('keydown', DOWN_ARROW, 'ArrowDown', el.nativeElement);
            el.nativeElement.dispatchEvent(keyboardEvent);

            expect(document.activeElement).toBe(targetEl);
        });

        it('should move focus up by 3 columns on UP_ARROW (small mode)', () => {
            const el = fixture.debugElement.query(By.css('li'));
            const targetEl = el.nativeElement.nextElementSibling.nextElementSibling.nextElementSibling;
            targetEl.focus();
            const keyboardEvent = createKeyboardEvent('keydown', UP_ARROW, 'ArrowUp', targetEl);
            targetEl.dispatchEvent(keyboardEvent);

            expect(document.activeElement).toBe(el.nativeElement);
        });
    });

    describe('keyboard navigation — grid mode (large, 4 columns)', () => {
        beforeEach(() => {
            fixture.componentInstance.list = [...LARGE_LIST];
            fixture.detectChanges();
            jest.spyOn(componentInstance, '_isListMode').mockReturnValue(false);
        });

        it('should move focus down by 4 columns on DOWN_ARROW (large mode)', () => {
            const el = fixture.debugElement.query(By.css('li'));
            // Column size is 4 in large mode
            const targetEl =
                el.nativeElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling;
            el.nativeElement.focus();
            const keyboardEvent = createKeyboardEvent('keydown', DOWN_ARROW, 'ArrowDown', el.nativeElement);
            el.nativeElement.dispatchEvent(keyboardEvent);

            expect(document.activeElement).toBe(targetEl);
        });

        it('should move focus up by 4 columns on UP_ARROW (large mode)', () => {
            const el = fixture.debugElement.query(By.css('li'));
            const targetEl =
                el.nativeElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling;
            targetEl.focus();
            const keyboardEvent = createKeyboardEvent('keydown', UP_ARROW, 'ArrowUp', targetEl);
            targetEl.dispatchEvent(keyboardEvent);

            expect(document.activeElement).toBe(el.nativeElement);
        });
    });

    describe('keyboard navigation — list mode', () => {
        beforeEach(() => {
            jest.spyOn(componentInstance, '_isListMode').mockReturnValue(true);
        });

        it('should move focus to the next item on DOWN_ARROW', () => {
            const el = fixture.debugElement.query(By.css('li'));
            const nextEl = el.nativeElement.nextElementSibling;
            el.nativeElement.focus();
            const keyboardEvent = createKeyboardEvent('keydown', DOWN_ARROW, 'ArrowDown', el.nativeElement);
            el.nativeElement.dispatchEvent(keyboardEvent);

            expect(document.activeElement).toBe(nextEl);
        });

        it('should move focus to the previous item on UP_ARROW', () => {
            const el = fixture.debugElement.query(By.css('li'));
            const nextEl = el.nativeElement.nextElementSibling;
            nextEl.focus();
            const keyboardEvent = createKeyboardEvent('keydown', UP_ARROW, 'ArrowUp', nextEl);
            nextEl.dispatchEvent(keyboardEvent);

            expect(document.activeElement).toBe(el.nativeElement);
        });

        it('should wrap focus to the first item when DOWN_ARROW is pressed on the last item', () => {
            const items = fixture.debugElement.queryAll(By.css('li.fd-product-switch__item'));
            const lastEl = items[items.length - 1].nativeElement;
            lastEl.focus();
            const keyboardEvent = createKeyboardEvent('keydown', DOWN_ARROW, 'ArrowDown', lastEl);
            lastEl.dispatchEvent(keyboardEvent);

            expect(document.activeElement).toBe(items[0].nativeElement);
        });

        it('should wrap focus to the last item when UP_ARROW is pressed on the first item', () => {
            const items = fixture.debugElement.queryAll(By.css('li.fd-product-switch__item'));
            const firstEl = items[0].nativeElement;
            firstEl.focus();
            const keyboardEvent = createKeyboardEvent('keydown', UP_ARROW, 'ArrowUp', firstEl);
            firstEl.dispatchEvent(keyboardEvent);

            expect(document.activeElement).toBe(items[items.length - 1].nativeElement);
        });
    });
});
