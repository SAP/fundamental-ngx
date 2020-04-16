import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DndListDirective, ElementChord } from './dnd-list.directive';
import { Component, ViewChild } from '@angular/core';
import { DndContainerDirective } from '../dnd-container/dnd-container.directive';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
    template: `
        <div #directiveElement fd-dnd-list>
            <div fd-dnd-container *ngFor="let item of list">
                <div cdkDrag>
                    <div>{{ item }}</div>
                </div>
            </div>
        </div>
    `
})
class TestDndListComponent {
    @ViewChild('directiveElement', { static: true, read: DndListDirective })
    directive: DndListDirective;

    list: string[] = [];
}

describe('DndListDirective', () => {
    let component: TestDndListComponent;
    let fixture: ComponentFixture<TestDndListComponent>;
    let directive: DndListDirective;
    let elementChords: ElementChord[];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [DragDropModule],
            declarations: [DndListDirective, TestDndListComponent, DndContainerDirective]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestDndListComponent);
        component = fixture.componentInstance;
        directive = component.directive;
        component.list = ['item1', 'item2', 'item3', 'item4'];
        elementChords = [
            { x: 145, y: 145, position: 'before' },
            { x: 200, y: 200, position: 'before' },
            { x: 250, y: 250, position: 'before' },
            { x: 300, y: 300, position: 'before' }
        ];
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Should handle dragStart', () => {
        expect((directive as any).elementChords).toBeFalsy();
        directive.dragStart(3);
        expect((directive as any).draggedItemIndex).toBe(3);
        expect((directive as any).elementChords.length).toBe(4);
    });

    it('Should handle move and detect good target (1)', () => {
        spyOn(directive as any, 'generateLine');
        const pointerPosition = { pointerPosition: { x: 150, y: 150 } };
        (directive as any).closestLinkIndex = 100;
        (directive as any).closestLinkPosition = 'after';
        (directive as any).draggedItemIndex = 3;
        (directive as any).elementChords = elementChords;

        directive.onMove(<any>pointerPosition);

        expect((directive as any).closestLinkIndex).toBe(0);
        expect((directive as any).closestLinkPosition).toBe('before');
        expect((directive as any).generateLine).toHaveBeenCalledWith(0, 'before');
    });

    it('Should handle move and detect good target (2)', () => {
        spyOn(directive as any, 'generateLine');
        const pointerPosition = { pointerPosition: { x: 230, y: 230 } };
        (directive as any).closestLinkIndex = 1000;
        (directive as any).closestLinkPosition = 'after';
        (directive as any).draggedItemIndex = 3;
        (directive as any).elementChords = elementChords;

        directive.onMove(<any>pointerPosition);

        expect((directive as any).closestLinkIndex).toBe(2);
        expect((directive as any).closestLinkPosition).toBe('before');
        expect((directive as any).generateLine).toHaveBeenCalledWith(2, 'before');
    });

    it('should handle dragend', () => {
        spyOn(directive.itemsChange, 'emit');
        spyOn(directive as any, 'removeAllLines');
        (directive as any).draggedItemIndex = 3;
        (directive as any).closestLinkIndex = 1;
        directive.items = [...component.list];

        directive.dragEnd();

        expect(directive.itemsChange.emit).toHaveBeenCalledWith(['item1', 'item4', 'item2', 'item3']);

        expect((directive as any).removeAllLines).toHaveBeenCalled();
    });

    it('should handle stickToPosition', () => {
        spyOn(directive as any, 'generateLine');

        const pointerPosition = { pointerPosition: { x: 230, y: 230 } };
        (directive as any).closestLinkIndex = 1000;
        (directive as any).closestLinkPosition = 'after';
        (directive as any).draggedItemIndex = 3;

        /** This is element tht should be ignored */
        elementChords.push({ x: 235, y: 230, stickToPosition: true, position: 'after' });

        (directive as any).elementChords = elementChords;

        directive.onMove(<any>pointerPosition);

        expect((directive as any).closestLinkIndex).toBe(2);
        expect((directive as any).closestLinkPosition).toBe('before');
        expect((directive as any).generateLine).toHaveBeenCalledWith(2, 'before');
    });
});
