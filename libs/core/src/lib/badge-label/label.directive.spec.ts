import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { LabelDirective } from './label.directive';

@Component({
    template: `
        <span fd-label>Fd-badge test</span>
    `
})

export class TestComponent { }

describe('LabelDirective', () => {
    let component: TestComponent,
        fixture: ComponentFixture<TestComponent>,
        debugElement: DebugElement,
        element: HTMLElement;

    let directive, directiveInstance;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LabelDirective, TestComponent]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        element = debugElement.nativeElement;

        fixture.detectChanges();
        directive = debugElement.query(By.directive(LabelDirective));
        directiveInstance = directive.injector.get(LabelDirective);


        spyOn(directiveInstance, '_setProperties').and.callThrough();
        spyOn(directiveInstance, '_addClassToElement');
    });

    it('should create', () => {
        expect(directive).toBeTruthy();
    });

    it('should add label class', () => {
        directiveInstance.status = 'someStatus';
        directiveInstance.ngOnInit();
        expect(directiveInstance._setProperties).toHaveBeenCalled();
        expect(directiveInstance._addClassToElement).toHaveBeenCalledWith('fd-label');
        expect(directiveInstance._addClassToElement).toHaveBeenCalledWith('fd-label--someStatus');
    });
});
