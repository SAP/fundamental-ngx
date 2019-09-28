import { ButtonComponent } from './button.component';
import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
    selector: 'fd-test-component',
    template: '<button fd-button>Button</button>'
})
export class TestComponent {}

describe('ButtonComponent', () => {
    let fixture: ComponentFixture<TestComponent>,
        debugElement: DebugElement,
        element: HTMLElement;

    let component, componentInstance;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ButtonComponent, TestComponent]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        debugElement = fixture.debugElement;
        element = debugElement.nativeElement;
        fixture.detectChanges();
        component = debugElement.query(By.directive(ButtonComponent));
        componentInstance = component.injector.get(ButtonComponent);

        spyOn(componentInstance, '_setProperties').and.callThrough();
        spyOn(componentInstance, '_addClassToElement');
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        componentInstance.ngOnInit();
        expect(componentInstance._setProperties).toHaveBeenCalled();
        expect(componentInstance._addClassToElement).toHaveBeenCalledWith('fd-button');
    });

    it('should add appropriate classes', () => {
        componentInstance.compact = 'true';
        componentInstance.glyph = 'someGlyph';
        componentInstance.fdType = 'someFdType';
        componentInstance.options = 'someOption';
        componentInstance.ngOnInit();
        expect(componentInstance._setProperties).toHaveBeenCalled();
        expect(componentInstance._addClassToElement).toHaveBeenCalledWith('fd-button');
        expect(componentInstance._addClassToElement).toHaveBeenCalledWith('fd-button--compact');
        expect(componentInstance._addClassToElement).toHaveBeenCalledWith('sap-icon--someGlyph');
        expect(componentInstance._addClassToElement).toHaveBeenCalledWith('fd-button--someFdType');
        expect(componentInstance._addClassToElement).toHaveBeenCalledWith('fd-button--someOption');

        // should handle an array of options
        componentInstance.options = ['someOption1', 'someOption2'];
        componentInstance.ngOnInit();
        expect(componentInstance._addClassToElement).toHaveBeenCalledWith('fd-button--someOption1');
        expect(componentInstance._addClassToElement).toHaveBeenCalledWith('fd-button--someOption2');
    });
});
