import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DndContainerDirective } from './dnd-container.directive';
import { Component, ViewChild } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
    template: `
            <span>
                <div #directiveElement fd-dnd-container>
                    <div cdkDrag>
                        <div></div>
                    </div>
                </div>
            </span>
    `
})
class TestDndContainerComponent {
    @ViewChild('directiveElement', { static: true, read: DndContainerDirective })
    directive: DndContainerDirective;
}

describe('DndContainerDirective', () => {
    let component: TestDndContainerComponent;
    let directive: DndContainerDirective;
    let fixture: ComponentFixture<TestDndContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [DragDropModule],
            declarations: [TestDndContainerComponent, DndContainerDirective]
        })
            .compileComponents();
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
        expect((directive as any).placeholderElement).toBeFalsy();
        directive.onCdkDragStart();
        expect((directive as any).placeholderElement).not.toBeFalsy();
        expect(directive.started.emit).toHaveBeenCalled();
    });

    it('should react to drag release', () => {
        spyOn(directive.released, 'emit');
        (directive as any).placeholderElement = document.createElement('div');
        directive.element.nativeElement.appendChild((directive as any).placeholderElement);
        directive.onCdkDragReleased();
        expect((directive as any).placeholderElement).toBeFalsy();
        expect(directive.released.emit).toHaveBeenCalled();
    });

    it('should create proper horizontal line', () => {
        directive.createLine('before', true);
        expect((directive as any).lineElement).not.toBeFalsy();
        const classes: string[] = (directive as any).lineElement.classList;
        expect(classes).toContain('drop-area__line');
        expect(classes).toContain('drop-area__line--horizontal');
        expect(classes).toContain('before');
    });

    it('should create proper vertical line', () => {
        directive.createLine('before', false);
        expect((directive as any).lineElement).not.toBeFalsy();
        const classes: string[] = (directive as any).lineElement.classList;
        expect(classes).toContain('drop-area__line');
        expect(classes).toContain('drop-area__line--vertical');
        expect(classes).toContain('before');
    });
});
