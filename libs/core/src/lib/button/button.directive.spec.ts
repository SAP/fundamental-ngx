import { ButtonDirective } from './button.directive';
import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
    selector: 'fd-test-component',
    template: '<button fd-button>Button</button>'
})
export class TestComponent {}

describe('ButtonDirective', () => {
    let fixture: ComponentFixture<TestComponent>,
        component: TestComponent,
        debugElement: DebugElement,
        element: HTMLElement;

    let directive, directiveInstance;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ButtonDirective, TestComponent]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        element = debugElement.nativeElement;
        fixture.detectChanges();
        directive = debugElement.query(By.directive(ButtonDirective));
        directiveInstance = directive.injector.get(ButtonDirective);

        spyOn(directiveInstance, '_setProperties').and.callThrough();
        spyOn(directiveInstance, '_addClassToElement');
    });

    it('should create', () => {
        expect(directive).toBeTruthy();
        directiveInstance.ngOnInit();
        expect(directiveInstance._setProperties).toHaveBeenCalled();
        expect(directiveInstance._addClassToElement).toHaveBeenCalledWith('fd-button');
    });

    it('should add appropriate classes', () => {
        directiveInstance.compact = 'true';
        directiveInstance.glyph = 'someGlyph';
        directiveInstance.fdType = 'someFdType';
        directiveInstance.options = 'someOption';
        directiveInstance.ngOnInit();
        expect(directiveInstance._setProperties).toHaveBeenCalled();
        expect(directiveInstance._addClassToElement).toHaveBeenCalledWith('fd-button');
        expect(directiveInstance._addClassToElement).toHaveBeenCalledWith('fd-button--compact');
        expect(directiveInstance._addClassToElement).toHaveBeenCalledWith('sap-icon--someGlyph');
        expect(directiveInstance._addClassToElement).toHaveBeenCalledWith('fd-button--someFdType');
        expect(directiveInstance._addClassToElement).toHaveBeenCalledWith('fd-button--someOption');

        // should handle an array of options
        directiveInstance.options = ['someOption1', 'someOption2'];
        directiveInstance.ngOnInit();
        expect(directiveInstance._addClassToElement).toHaveBeenCalledWith('fd-button--someOption1');
        expect(directiveInstance._addClassToElement).toHaveBeenCalledWith('fd-button--someOption2');
    });
});
