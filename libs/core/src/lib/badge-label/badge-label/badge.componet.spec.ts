import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BadgeComponent } from './badge.component';

@Component({
    template: ` <span fd-badge>Fd-badge test</span> `
})
export class TestComponent {}

describe('BadgeComponent', () => {
    let fixture: ComponentFixture<TestComponent>, debugElement: DebugElement, element: HTMLElement;

    let component, componentInstance;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BadgeComponent, TestComponent]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        element = debugElement.nativeElement;

        fixture.detectChanges();
        component = debugElement.query(By.directive(BadgeComponent));
        componentInstance = component.injector.get(BadgeComponent);
        fixture = TestBed.createComponent(TestComponent);

        spyOn(componentInstance, '_setProperties').and.callThrough();
        spyOn(componentInstance, '_addClassToElement');
    });

    it('should create', () => {
        expect(component).toBeTruthy();

        componentInstance.status = 'someStatus';
        componentInstance.modifier = 'someModifier';

        componentInstance.ngOnInit();
        expect(componentInstance._setProperties).toHaveBeenCalled();
        expect(componentInstance._addClassToElement).toHaveBeenCalledWith('fd-badge--someStatus');
        expect(componentInstance._addClassToElement).toHaveBeenCalledWith('fd-badge--someModifier');
    });
});
