import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { StatusLabelComponent } from './status-label.component';

@Component({
    template: `
        <span fd-status-label>Fd-badge test</span>
    `
})

export class TestComponent { }

describe('StatusLabelComponent', () => {
    let fixture: ComponentFixture<TestComponent>,
        debugElement: DebugElement,
        element: HTMLElement;

    let component, componentInstance;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StatusLabelComponent, TestComponent]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        element = debugElement.nativeElement;

        fixture.detectChanges();
        component = debugElement.query(By.directive(StatusLabelComponent));
        componentInstance = component.injector.get(StatusLabelComponent);


        spyOn(componentInstance, '_setProperties').and.callThrough();
        spyOn(componentInstance, '_addClassToElement');
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should add status labels class', () => {
        componentInstance.status = 'someStatus';
        componentInstance.statusIcon = 'someStatusIcon';
        componentInstance.icon = 'someIcon';
        componentInstance.ngOnInit();
        expect(componentInstance._setProperties).toHaveBeenCalled();
        expect(componentInstance._addClassToElement).toHaveBeenCalledWith('fd-status-label');
        expect(componentInstance._addClassToElement).toHaveBeenCalledWith('fd-status-label--someStatus');
        expect(componentInstance._addClassToElement).toHaveBeenCalledWith('fd-status-label--someStatusIcon');
        expect(componentInstance._addClassToElement).toHaveBeenCalledWith('sap-icon--someIcon');
    });
});
