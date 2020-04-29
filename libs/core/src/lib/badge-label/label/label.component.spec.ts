import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { LabelComponent } from './label.component';

@Component({
    template: ` <span fd-label>Fd-badge test</span> `
})
export class TestComponent {}

describe('LabelComponent', () => {
    let fixture: ComponentFixture<TestComponent>, debugElement: DebugElement, element: HTMLElement;

    let component, componentInstance;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LabelComponent, TestComponent]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        element = debugElement.nativeElement;

        fixture.detectChanges();
        component = debugElement.query(By.directive(LabelComponent));
        componentInstance = component.injector.get(LabelComponent);

        spyOn(componentInstance, '_setProperties').and.callThrough();
        spyOn(componentInstance, '_addClassToElement');
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should add label class', () => {
        componentInstance.status = 'someStatus';
        componentInstance.ngOnInit();
        expect(componentInstance._setProperties).toHaveBeenCalled();
        expect(componentInstance._addClassToElement).toHaveBeenCalledWith('fd-label');
        expect(componentInstance._addClassToElement).toHaveBeenCalledWith('fd-label--someStatus');
    });
});
