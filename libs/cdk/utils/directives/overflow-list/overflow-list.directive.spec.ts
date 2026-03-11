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

describe('OverflowItemsDirective', () => {
    let component: WrapperComponent;
    let fixture: ComponentFixture<WrapperComponent>;
    let overflowListDir: OverflowListDirective;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [WrapperComponent, TestComponent, OverflowListDirective, OverflowListItemDirective],
            providers: [ViewportRuler]
        }).compileComponents();

        // Mocking ResizeObserver
        global.ResizeObserver = class {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            constructor(callback: () => void) {}
            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
            observe() {}
            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
            unobserve() {}
            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
            disconnect() {}
        };
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
});
