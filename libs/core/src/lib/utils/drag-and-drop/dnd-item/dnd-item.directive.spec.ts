import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DndItemDirective } from './dnd-item.directive';
import { Component, ViewChild } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
    template: `
        <span>
            <div #directiveElement fd-dnd-item>
                <div cdkDrag>
                    <div></div>
                </div>
            </div>
        </span>
    `
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
            imports: [DragDropModule],
            declarations: [TestDndContainerComponent, DndItemDirective]
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
    });

    it('should react to start drag', () => {
        spyOn(directive.started, 'emit');
        expect((directive as any)._placeholderElement).toBeFalsy();
        directive.onCdkDragStart();
        expect((directive as any)._placeholderElement).not.toBeFalsy();
        expect(directive.started.emit).toHaveBeenCalled();
    });

    it('should react to drag release', () => {
        spyOn(directive.released, 'emit');
        (directive as any)._placeholderElement = document.createElement('div');
        directive.element.nativeElement.appendChild((directive as any)._placeholderElement);
        directive.onCdkDragReleased();
        expect((directive as any)._placeholderElement).toBeFalsy();
        expect(directive.released.emit).toHaveBeenCalled();
    });

    it('should create proper horizontal line', () => {
        directive.createLine('before', false);
        expect((directive as any)._lineElement).not.toBeFalsy();
        const classes: string[] = (directive as any)._lineElement.classList;
        expect(classes).toContain('drop-area__line');
        expect(classes).toContain('drop-area__line--horizontal');
        expect(classes).toContain('before');
    });

    it('should create proper vertical line', () => {
        directive.createLine('before', true);
        expect((directive as any)._lineElement).not.toBeFalsy();
        const classes: string[] = (directive as any)._lineElement.classList;
        expect(classes).toContain('drop-area__line');
        expect(classes).toContain('drop-area__line--vertical');
        expect(classes).toContain('before');
    });
});
