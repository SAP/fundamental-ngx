import { FormControlDirective } from './form-control.directive';
import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
    selector: 'fd-test-component',
    template: '<div fd-form-control="">FormControl</div>'
})
export class TestComponent {}

describe('FormControlDirective', () => {
    let fixture: ComponentFixture<TestComponent>,
        component: TestComponent,
        debugElement: DebugElement,
        element: HTMLElement;

    let directive, directiveInstance;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FormControlDirective, TestComponent]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        element = debugElement.nativeElement;
        fixture.detectChanges();
        directive = debugElement.query(By.directive(FormControlDirective));
        directiveInstance = directive.injector.get(FormControlDirective);

        spyOn(directiveInstance, 'buildComponentCssClass').and.callThrough();
    });

    it('should create', () => {
        expect(directive).toBeTruthy();
        directiveInstance.ngOnInit();
        expect(directiveInstance.buildComponentCssClass).toHaveBeenCalled();
    });

    it('should add appropriate classes', () => {
        directiveInstance.ngOnChanges();
        expect(directiveInstance.buildComponentCssClass).toHaveBeenCalled();
    });
});
