import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { OverflowLayoutItemDirective } from './directives/overflow-layout-item.directive';
import { OverflowLayoutComponent } from './overflow-layout.component';

import { OverflowLayoutModule } from './overflow-layout.module';
import { OverflowLayoutService } from './overflow-layout.service';

@Component({
    selector: 'fd-test-component',
    template: `
        <fd-overflow-layout [maxVisibleItems]="maxItems" [style.width.px]="containerWidth">
            <ng-container *ngFor="let item of itemsToRender; let i = index">
                <div
                    *fdOverflowItemRef="let hidden; index as i"
                    fdOverflowLayoutItem
                    [focusable]="true"
                    [style.width.px]="elementsWidth"
                    [style.height.px]="20"
                >
                    {{ i }}
                </div>
            </ng-container>
            <div *fdOverflowExpand></div>
        </fd-overflow-layout>
    `
})
export class TestComponent {
    elementsWidth = 200;
    containerWidth = 1000;
    maxItems = 3;

    itemsToRender = new Array(10).fill(null);

    @ViewChild(OverflowLayoutComponent)
    overflowLayout: OverflowLayoutComponent;

    addItem(): void {
        this.itemsToRender.push(null);
    }

    removeItem(): void {
        this.itemsToRender.pop();
    }
}

describe('OverflowLayoutComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let service: OverflowLayoutService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [OverflowLayoutModule],
            declarations: [TestComponent]
        }).compileComponents();
    });

    beforeEach(async () => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        await fixture.whenRenderingDone();
        fixture.detectChanges();
        service = (component.overflowLayout as any)._overflowLayoutService;
        jest.spyOn(
            (component.overflowLayout as any)._elementRef.nativeElement,
            'getBoundingClientRect'
        ).mockImplementation(() => ({
            width: component.containerWidth
        }));
        jest.spyOn(service as any, '_getElementWidth').mockImplementation(() => component.elementsWidth);
        service.fitVisibleItems();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render needed amount of items', async () => {
        await fixture.whenStable();

        expect(fixture.debugElement.queryAll(By.directive(OverflowLayoutItemDirective)).length).toEqual(
            component.maxItems
        );
    });

    it('should render automatic amount of items', async () => {
        await fixture.whenStable();

        const expectedAmount = Math.floor(component.containerWidth / component.elementsWidth) - 1; // Minus 'More' button container
        const visibleItemsCountSpy = jest.spyOn(component.overflowLayout.visibleItemsCount, 'emit');

        component.maxItems = Infinity;
        fixture.detectChanges();
        await fixture.whenStable();

        expect(visibleItemsCountSpy).toHaveBeenLastCalledWith(expectedAmount);
        expect(fixture.debugElement.queryAll(By.directive(OverflowLayoutItemDirective)).length).toEqual(expectedAmount);
    });

    it('should react on items resize', async () => {
        component.elementsWidth = 300;
        fixture.detectChanges();
        await fixture.whenStable();

        const expectedAmount = Math.floor(component.containerWidth / component.elementsWidth);

        expect(fixture.debugElement.queryAll(By.directive(OverflowLayoutItemDirective)).length).toEqual(expectedAmount);
    });

    it('should react on container resize', async () => {
        component.elementsWidth = 200;
        component.containerWidth = 600;
        fixture.detectChanges();
        await fixture.whenStable();

        const expectedAmount = Math.floor(component.containerWidth / component.elementsWidth);

        expect(fixture.debugElement.queryAll(By.directive(OverflowLayoutItemDirective)).length).toEqual(expectedAmount);
    });
});
