import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DndListDirective, ElementChord } from './dnd-list.directive';
import { Component, ViewChild } from '@angular/core';
import { DndItemDirective } from '../dnd-item/dnd-item.directive';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
    template: `
        <div #directiveElement fd-dnd-list>
            <div fd-dnd-item *ngFor="let item of list">
                <div>{{ item }}</div>
            </div>
        </div>
    `
})
class TestDndListComponent {
    @ViewChild('directiveElement', { static: true, read: DndListDirective })
    directive: DndListDirective<string>;

    list: string[] = [];
}

describe('DndListDirective', () => {
    let component: TestDndListComponent;
    let fixture: ComponentFixture<TestDndListComponent>;
    let directive: DndListDirective<string>;
    let elementCoordinates: ElementChord[];

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [DragDropModule],
            declarations: [DndListDirective, TestDndListComponent, DndItemDirective]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestDndListComponent);
        component = fixture.componentInstance;
        directive = component.directive;
        component.list = ['item1', 'item2', 'item3', 'item4'];
        elementCoordinates = [
            { x: 145, y: 145, position: 'before', height: 30, width: 30 },
            { x: 200, y: 200, position: 'before', height: 30, width: 30 },
            { x: 250, y: 250, position: 'before', height: 30, width: 30 },
            { x: 300, y: 300, position: 'before', height: 30, width: 30 }
        ];
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Should handle dragStart', () => {
        expect((directive as any)._elementsCoordinates).toBeFalsy();
        (directive as any)._closestItemIndex = 1;
        directive.dragStart(3);
        expect((directive as any)._elementsCoordinates.length).toBe(4);
    });

    it('Should handle move and detect good target (1)', () => {
        spyOn(directive as any, '_createLine');
        const pointerPosition = { x: 150, y: 150 };
        (directive as any)._closestItemIndex = 100;
        (directive as any)._closestItemPosition = 'after';
        (directive as any)._elementsCoordinates = elementCoordinates;

        directive.onMove(pointerPosition, 3);

        expect((directive as any)._closestItemIndex).toBe(0);
        expect((directive as any)._closestItemPosition).toBe('before');
        expect((directive as any)._createLine).toHaveBeenCalledWith(0, 'before');
    });

    it('Should handle move and detect good target (2)', () => {
        spyOn(directive as any, '_createLine');
        const pointerPosition = { x: 230, y: 230 };
        (directive as any)._closestItemIndex = 1000;
        (directive as any)._closestItemPosition = 'after';
        (directive as any)._elementsCoordinates = elementCoordinates;

        directive.onMove(pointerPosition, 3);

        expect((directive as any)._closestItemIndex).toBe(1);
        expect((directive as any)._closestItemPosition).toBe('before');
        expect((directive as any)._createLine).toHaveBeenCalledWith(1, 'before');
    });

    it('should handle dragend', () => {
        spyOn(directive.itemDropped, 'emit');
        spyOn(directive as any, '_removeAllLines');
        directive.items = [...component.list];

        (directive as any)._closestItemIndex = 1;
        directive.dragEnd(3);
        expect(directive.itemDropped.emit).toHaveBeenCalledWith({
            replacedItemIndex: 1,
            draggedItemIndex: 3,
            items: ['item1', 'item4', 'item2', 'item3']
        });

        expect((directive as any)._removeAllLines).toHaveBeenCalled();
    });

    it('should handle stickToPosition', () => {
        spyOn(directive as any, '_createLine');

        const pointerPosition = { x: 231, y: 231 };
        (directive as any)._closestItemIndex = 1000;
        (directive as any)._closestItemPosition = 'after';

        /** This is element that should be ignored */
        elementCoordinates.push({ x: 235, y: 230, stickToPosition: true, position: 'after', height: 10, width: 10 });

        (directive as any)._elementsCoordinates = elementCoordinates;

        directive.onMove(pointerPosition, 3);

        expect((directive as any)._closestItemIndex).toBe(1000);
        expect((directive as any)._closestItemPosition).toBe('after');
        expect((directive as any)._createLine).not.toHaveBeenCalledWith(1000, 'before');
    });
});
