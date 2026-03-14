import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, flush, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ViewportRuler } from '@angular/cdk/overlay';
import { OverflowListItemDirective } from './overflow-list-item.directive';
import { OverflowListDirective } from './overflow-list.directive';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'test-component',
    standalone: true,
    template: `
        <div #dirRoot class="list" fdkOverflowList (overflowChanged)="onOverflowed($event)">
            @for (item of items; track item) {
                <div fdkOverflowListItem class="list-item">{{ item }}</div>
            }
        </div>
    `,
    styles: [
        `
            .list {
                position: relative;
                display: flex;
                overflow: hidden;
                width: 500px;
            }
            .list-item {
                display: block;
                box-sizing: border-box;
                min-width: 100px;
                height: 40px;
            }
        `
    ],
    imports: [OverflowListDirective, OverflowListItemDirective]
})
class TestComponent {
    @Input()
    items: any[];

    @Output()
    selected = new EventEmitter();

    onOverflowed(extraItems: number): void {
        this.selected.emit(extraItems);
    }
}

@Component({
    standalone: true,
    imports: [TestComponent],
    template: ` <test-component [items]="items" (selected)="onOverflowed($event)"></test-component> `
})
class WrapperComponent {
    items: any[] = Array.from({ length: 10 }, (_, i) => i);

    currentExtraItems = 0;

    onOverflowed(extraItems: number): void {
        this.currentExtraItems = extraItems;
    }
}

declare const global: any;

// Capture callbacks so tests can trigger observers manually.
let resizeObserverCallback: () => void;
let mutationObserverCallback: () => void;
let resizeDisconnectSpy: jest.Mock;
let mutationDisconnectSpy: jest.Mock;

describe('OverflowItemsDirective', () => {
    let component: WrapperComponent;
    let fixture: ComponentFixture<WrapperComponent>;
    let overflowListDir: OverflowListDirective;

    beforeEach(waitForAsync(() => {
        resizeDisconnectSpy = jest.fn();
        mutationDisconnectSpy = jest.fn();

        // Mocking ResizeObserver – capture callback
        global.ResizeObserver = class {
            disconnect = resizeDisconnectSpy;
            constructor(callback: () => void) {
                resizeObserverCallback = callback;
            }
            observe(): void {}
            unobserve(): void {}
        };

        // Mocking MutationObserver – capture callback
        global.MutationObserver = class {
            disconnect = mutationDisconnectSpy;
            constructor(callback: () => void) {
                mutationObserverCallback = callback;
            }
            observe(): void {}
        };

        TestBed.configureTestingModule({
            imports: [WrapperComponent, TestComponent, OverflowListDirective, OverflowListItemDirective],
            providers: [ViewportRuler]
        }).compileComponents();
    }));

    beforeEach(async () => {
        fixture = TestBed.createComponent(WrapperComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        await fixture.whenRenderingDone();

        overflowListDir = fixture.debugElement
            .query(By.directive(OverflowListDirective))
            .injector.get(OverflowListDirective);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should calculate extra items', fakeAsync(() => {
        // JSDOM doesn't compute layout, so we mock getAmountOfExtraItems
        // to return a realistic overflow count.
        jest.spyOn(overflowListDir, 'getAmountOfExtraItems').mockReturnValue(5);

        overflowListDir.calculateOverflow();
        flush();

        expect(component.currentExtraItems).toBe(5);
    }));

    it('should recalculate on resize', fakeAsync(() => {
        jest.spyOn(overflowListDir, 'getAmountOfExtraItems').mockReturnValue(3);

        window.dispatchEvent(new Event('resize'));
        tick(100); // debounceTime(100) for resize handler
        flush(); // drain the microtask from calculateOverflow

        expect(component.currentExtraItems).toBe(3);
    }));

    it('should recalculate when ResizeObserver fires', fakeAsync(() => {
        jest.spyOn(overflowListDir, 'getAmountOfExtraItems').mockReturnValue(4);

        // Simulate the ResizeObserver callback (e.g. container shrank)
        resizeObserverCallback();
        flush();

        expect(component.currentExtraItems).toBe(4);
    }));

    it('should recalculate when MutationObserver detects changes (childList / characterData)', fakeAsync(() => {
        jest.spyOn(overflowListDir, 'getAmountOfExtraItems').mockReturnValue(7);

        // Simulate the MutationObserver callback (e.g. text content changed or items added)
        mutationObserverCallback();
        flush();

        expect(component.currentExtraItems).toBe(7);
    }));

    it('should coalesce multiple calculateOverflow calls into one recalculation', fakeAsync(() => {
        const spy = jest.spyOn(overflowListDir, 'getAmountOfExtraItems').mockReturnValue(2);

        // Call calculateOverflow multiple times synchronously
        overflowListDir.calculateOverflow();
        overflowListDir.calculateOverflow();
        overflowListDir.calculateOverflow();
        flush();

        // Only one actual recalculation should have occurred
        expect(spy).toHaveBeenCalledTimes(1);
        expect(component.currentExtraItems).toBe(2);
    }));

    it('should disconnect ResizeObserver and MutationObserver on destroy', fakeAsync(() => {
        // Drain any pending microtasks from ngAfterViewInit
        flush();

        fixture.destroy();

        expect(resizeDisconnectSpy).toHaveBeenCalled();
        expect(mutationDisconnectSpy).toHaveBeenCalled();
    }));
});
