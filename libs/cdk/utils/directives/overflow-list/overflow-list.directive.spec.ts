import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
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
            <div *ngFor="let item of items" fdkOverflowListItem class="list-item">{{ item }}</div>
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
    imports: [CommonModule, OverflowListDirective, OverflowListItemDirective]
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
    items: any[] = Array(100).fill(0);

    currentExtraItems = 0;

    onOverflowed(extraItems: number): void {
        this.currentExtraItems = extraItems;
    }
}

declare const global: any;

describe('OverflowItemsDirective', () => {
    let component: WrapperComponent;
    let fixture: ComponentFixture<WrapperComponent>;

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
        Object.defineProperty(global.window.HTMLElement.prototype, 'clientWidth', {
            configurable: true,
            value: 500
        });
        Object.defineProperty(global.window.HTMLElement.prototype, 'offsetWidth', {
            configurable: true,
            value: 100
        });
        Object.defineProperty(global.window.HTMLElement.prototype, 'offsetLeft', {
            configurable: true,
            value: 0
        });

        fixture = TestBed.createComponent(WrapperComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        await fixture.whenRenderingDone();

        // Mock the overflow items' sizes
        const items = fixture.debugElement.queryAll(By.css('.list-item'));
        items.forEach((item) => {
            Object.defineProperty(item.nativeElement, 'offsetWidth', {
                configurable: true,
                value: 120 // Ensure an overflow
            });
        });

        // Trigger initial overflow calculation
        const overflowListDir = fixture.debugElement
            .query(By.directive(OverflowListDirective))
            .injector.get(OverflowListDirective);
        overflowListDir.calculateOverflow();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should calculate extra items', fakeAsync(() => {
        component.items = new Array(100).fill(0); // Ensure enough items to overflow
        fixture.detectChanges();
        tick(100); // Simulate time for calculations

        // Re-trigger calculation to ensure it happens
        const overflowListDir = fixture.debugElement
            .query(By.directive(OverflowListDirective))
            .injector.get(OverflowListDirective);
        overflowListDir.calculateOverflow();

        fixture.detectChanges();
        tick(100); // Wait for any async tasks to complete

        expect(component.currentExtraItems).not.toBe(0);
    }), 10000); // Extend timeout in milliseconds

    it('should recalculate on resize', fakeAsync(() => {
        const initialStateOfExtraItems = component.currentExtraItems;

        component.items.push(1231);
        fixture.detectChanges();
        tick(100); // Simulate time for calculations

        window.dispatchEvent(new Event('resize'));
        fixture.detectChanges();
        tick(60); // Simulate time for resize handling and recalculations

        fixture.whenStable().then(() => {
            const stateOfExtraItemsAfterResize = component.currentExtraItems;
            expect(initialStateOfExtraItems).not.toBe(stateOfExtraItemsAfterResize);
        });
    }), 10000); // Extend timeout in milliseconds
});
