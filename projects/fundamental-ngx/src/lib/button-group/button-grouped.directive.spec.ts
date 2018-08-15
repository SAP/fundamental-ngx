import { ButtonGroupedDirective } from './button-grouped.directive';
import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
    selector: 'fd-test-component',
    template: '<button fd-button-grouped>ButtonGrouped</button>'
})
export class TestComponent {}

describe('ButtonGroupedDirective', () => {
    let fixture: ComponentFixture<TestComponent>,
        component: TestComponent,
        debugElement: DebugElement,
        element: HTMLElement;

    let directive, directiveInstance;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ButtonGroupedDirective, TestComponent]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        element = debugElement.nativeElement;
        fixture.detectChanges();
        directive = debugElement.query(By.directive(ButtonGroupedDirective));
        directiveInstance = directive.injector.get(ButtonGroupedDirective);

        spyOn(directiveInstance, '_setProperties').and.callThrough();
        spyOn(directiveInstance, '_addClassToElement');
    });

    it('should create', () => {
        expect(directive).toBeTruthy();
        directiveInstance.ngOnInit();
        expect(directiveInstance._setProperties).toHaveBeenCalled();
        expect(directiveInstance._addClassToElement).toHaveBeenCalledWith('fd-button--grouped');
    });

    it('should add appropriate classes', () => {
        directiveInstance.size = 'someSize';
        directiveInstance.glyph = 'someGlyph';
        directiveInstance.compact = true;
        directiveInstance.state = 'someState';
        directiveInstance.ngOnInit();
        expect(directiveInstance._setProperties).toHaveBeenCalled();
        expect(directiveInstance._addClassToElement).toHaveBeenCalledWith('fd-button--grouped');
        expect(directiveInstance._addClassToElement).toHaveBeenCalledWith('fd-button--someSize');
        expect(directiveInstance._addClassToElement).toHaveBeenCalledWith('sap-icon--someGlyph');
        expect(directiveInstance._addClassToElement).toHaveBeenCalledWith('fd-button--compact');
        expect(directiveInstance._addClassToElement).toHaveBeenCalledWith('is-someState');
    });
});
