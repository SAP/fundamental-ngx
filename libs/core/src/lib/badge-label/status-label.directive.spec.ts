import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { StatusLabelDirective } from './status-label.directive';

@Component({
    template: `
        <span fd-status-label>Fd-badge test</span>
    `
})

export class TestComponent { }

describe('StatusLabelDirective', () => {
    let component: TestComponent,
        fixture: ComponentFixture<TestComponent>,
        debugElement: DebugElement,
        element: HTMLElement;

    let directive, directiveInstance;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StatusLabelDirective, TestComponent]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        element = debugElement.nativeElement;

        fixture.detectChanges();
        directive = debugElement.query(By.directive(StatusLabelDirective));
        directiveInstance = directive.injector.get(StatusLabelDirective);


        spyOn(directiveInstance, '_setProperties').and.callThrough();
        spyOn(directiveInstance, '_addClassToElement');
    });

    it('should create', () => {
        expect(directive).toBeTruthy();
    });

    it('should add status labels class', () => {
        directiveInstance.status = 'someStatus';
        directiveInstance.statusIcon = 'someStatusIcon';
        directiveInstance.icon = 'someIcon';
        directiveInstance.ngOnInit();
        expect(directiveInstance._setProperties).toHaveBeenCalled();
        expect(directiveInstance._addClassToElement).toHaveBeenCalledWith('fd-status-label');
        expect(directiveInstance._addClassToElement).toHaveBeenCalledWith('fd-status-label--someStatus');
        expect(directiveInstance._addClassToElement).toHaveBeenCalledWith('fd-status-label--someStatusIcon');
        expect(directiveInstance._addClassToElement).toHaveBeenCalledWith('sap-icon--someIcon');
    });
});
