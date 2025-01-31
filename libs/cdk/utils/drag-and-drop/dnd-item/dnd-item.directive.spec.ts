import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DragDropModule, DragDrop, DragRef } from '@angular/cdk/drag-drop';
import { Component, ViewChild, Renderer2 } from '@angular/core';
import { DndItemDirective } from './dnd-item.directive';

// Mocking DragDrop to avoid actual DragDrop logic in tests
class MockDragDrop {
    createDrag(): DragRef {
        return {
            moved: { subscribe: jest.fn() } as any,
            released: { subscribe: jest.fn() } as any,
            started: { subscribe: jest.fn() } as any,
            disabled: false,
            dispose: jest.fn(),
            reset: jest.fn()
        } as unknown as DragRef;
    }
}

@Component({
    template: `
        <span>
            <div #directiveElement fd-dnd-item>
                <div cdkDrag>
                    <div></div>
                </div>
            </div>
        </span>
    `,
    standalone: true,
    imports: [DragDropModule, DndItemDirective]
})
class TestDndContainerComponent {
    @ViewChild('directiveElement', { static: true, read: DndItemDirective })
    directive: DndItemDirective;
}

describe('DndItemDirective', () => {
    let component: TestDndContainerComponent;
    let directive: DndItemDirective;
    let fixture: ComponentFixture<TestDndContainerComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            providers: [
                Renderer2,
                { provide: DragDrop, useClass: MockDragDrop } // Use mock DragDrop
            ],
            imports: [TestDndContainerComponent] // Import the standalone TestDndContainerComponent
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestDndContainerComponent);
        component = fixture.componentInstance;
        directive = component.directive;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(directive).toBeTruthy();
    });

    it('should apply the default class when applyDragItemClass is true', () => {
        directive.applyDragItemClass = true;
        fixture.detectChanges();
        const element = fixture.debugElement.nativeElement.querySelector('[fd-dnd-item]');
        expect(element.classList).toContain('fd-dnd-item');
    });

    it('should not apply the default class when applyDragItemClass is false', () => {
        directive.applyDragItemClass = false;
        fixture.detectChanges();
        const element = fixture.debugElement.nativeElement.querySelector('[fd-dnd-item]');
        expect(element.classList).not.toContain('fd-dnd-item');
    });

    it('should create proper placeholder and emit started event on drag start', () => {
        const spy = jest.spyOn(directive.started, 'emit');
        expect(directive['_placeholderElement']).toBeFalsy();
        directive.onCdkDragStart();
        expect(directive['_placeholderElement']).not.toBeFalsy();
        expect(spy).toHaveBeenCalled();
    });

    it('should remove placeholder and emit released event on drag release', () => {
        const spy = jest.spyOn(directive.released, 'emit');
        directive['_placeholderElement'] = document.createElement('div');
        directive.elementRef.nativeElement.appendChild(directive['_placeholderElement']);
        directive.onCdkDragReleased();
        expect(directive['_placeholderElement']).toBeFalsy();
        expect(spy).toHaveBeenCalled();
    });

    it('should emit moved event on CdkMove', () => {
        const spy = jest.spyOn(directive.moved, 'emit');
        const mockPosition = { x: 100, y: 100 };
        directive.onCdkMove(mockPosition);
        expect(spy).toHaveBeenCalledWith(mockPosition);
    });

    it('should create a proper horizontal line', () => {
        directive.createLine('before', false);
        expect(directive['_lineElement']).not.toBeFalsy();
        
        if (directive['_lineElement']) {
            const classes: string[] = Array.from(directive['_lineElement'].classList); // Convert DOMTokenList to string[]
            expect(classes).toContain('drop-area__line');
            expect(classes).toContain('drop-area__line--horizontal');
            expect(classes).toContain('before');
        }
    });

    it('should create a proper vertical line', () => {
        directive.createLine('before', true);
        expect(directive['_lineElement']).not.toBeFalsy();

        if (directive['_lineElement']) {
            const classes: string[] = Array.from(directive['_lineElement'].classList); // Convert DOMTokenList to string[]
            expect(classes).toContain('drop-area__line');
            expect(classes).toContain('drop-area__line--vertical');
            expect(classes).toContain('before');
        }
    });

    it('should set the draggable state correctly', () => {
        directive.draggable = false;
        expect(directive['_dragRef'].disabled).toBe(true);
        directive.draggable = true;
        expect(directive['_dragRef'].disabled).toBe(false);
    });

    it('should set the disabled state correctly', () => {
        directive.setDisabledState(true);
        const element = fixture.debugElement.nativeElement.querySelector('[fd-dnd-item]');        
        expect(element.classList).toContain('fd-dnd-item--disabled');
        directive.setDisabledState(false);
        expect(element.classList).not.toContain('fd-dnd-item--disabled');
    });

    it('should clean up correctly on destroy', () => {
        const unsubscribeSpy = jest.spyOn(directive['_subscriptions'], 'unsubscribe');
        const disposeSpy = jest.spyOn(directive['_dragRef'], 'dispose');
        
        fixture.destroy();
        
        expect(unsubscribeSpy).toHaveBeenCalled();
        expect(disposeSpy).toHaveBeenCalled();
    });
});
