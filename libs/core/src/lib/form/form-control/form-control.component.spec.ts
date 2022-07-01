import { FormControlComponent } from './form-control.component';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ContentDensityService, DEFAULT_CONTENT_DENSITY } from '../../utils/public_api';

@Component({
    selector: 'fd-test-component',
    template: '<div fd-form-control="">FormControl</div>'
})
export class TestComponent {}

describe('FormControlComponent', () => {
    let fixture: ComponentFixture<TestComponent>, component: TestComponent, debugElement: DebugElement;

    let directive, componentInstance;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [FormControlComponent, TestComponent],
            providers: [ContentDensityService]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        fixture.detectChanges();
        directive = debugElement.query(By.directive(FormControlComponent));
        componentInstance = directive.injector.get(FormControlComponent);

        spyOn(componentInstance, 'buildComponentCssClass').and.callThrough();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        componentInstance.ngOnInit();
        expect(componentInstance.buildComponentCssClass).toHaveBeenCalled();
    });

    it('should add appropriate classes', () => {
        componentInstance.ngOnChanges();
        expect(componentInstance.buildComponentCssClass).toHaveBeenCalled();
    });

    it('should handle content density when compact input is not provided', () => {
        componentInstance.ngOnInit();
        expect(componentInstance.compact).toBe(DEFAULT_CONTENT_DENSITY !== 'cozy');
        expect(componentInstance.buildComponentCssClass).toHaveBeenCalled();
    });
});
