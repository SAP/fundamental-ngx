import { IdentifierDirective } from './identifier.directive';
import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
    selector: 'fd-test-component',
    template: '<span fd-identifier>Identifier</span>'
})
export class TestComponent {}

describe('IdentifierDirective', () => {
    let fixture: ComponentFixture<TestComponent>,
        component: TestComponent,
        debugElement: DebugElement,
        element: HTMLElement;

    let directive, directiveInstance;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [IdentifierDirective, TestComponent]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        element = debugElement.nativeElement;
        fixture.detectChanges();
        directive = debugElement.query(By.directive(IdentifierDirective));
        directiveInstance = directive.injector.get(IdentifierDirective);

        spyOn(directiveInstance, '_setProperties').and.callThrough();
        spyOn(directiveInstance, '_addClassToElement');
    });

    it('should create', () => {
        expect(directive).toBeTruthy();
        directiveInstance.ngOnInit();
        expect(directiveInstance._setProperties).toHaveBeenCalled();
    });

    it('should add appropriate classes', () => {
        directiveInstance.size = 'someSize';
        directiveInstance.circle = true;
        directiveInstance.transparent = true;
        directiveInstance.colorAccent = 'someColorAccent';
        directiveInstance.glyph = 'someGlyph';
        directiveInstance.ngOnInit();
        expect(directiveInstance._setProperties).toHaveBeenCalled();
        expect(directiveInstance._addClassToElement).toHaveBeenCalledWith('fd-identifier--someSize');
        expect(directiveInstance._addClassToElement).toHaveBeenCalledWith('fd-identifier--circle');
        expect(directiveInstance._addClassToElement).toHaveBeenCalledWith('fd-identifier--transparent');
        expect(directiveInstance._addClassToElement).toHaveBeenCalledWith(
            'fd-has-background-color-accent-someColorAccent'
        );
        expect(directiveInstance._addClassToElement).toHaveBeenCalledWith('sap-icon--someGlyph');
    });
});
