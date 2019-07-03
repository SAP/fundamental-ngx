import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BadgeDirective } from './badge.directive';

@Component({
    template: `
        <span fd-badge>Fd-badge test</span>
    `
})
export class TestComponent { }

describe('BadgeDirective', () => {
    let component: TestComponent,
        fixture: ComponentFixture<TestComponent>,
        debugElement: DebugElement,
        element: HTMLElement;

    let directive, directiveInstance;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BadgeDirective, TestComponent]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        element = debugElement.nativeElement;

        fixture.detectChanges();
        directive = debugElement.query(By.directive(BadgeDirective));
        directiveInstance = directive.injector.get(BadgeDirective);
        fixture = TestBed.createComponent(TestComponent);

        spyOn(directiveInstance, '_setProperties').and.callThrough();
        spyOn(directiveInstance, '_addClassToElement');
    });

    it('should create', () => {
        expect(directive).toBeTruthy();

        directiveInstance.status = 'someStatus';
        directiveInstance.modifier = 'someModifier';

        directiveInstance.ngOnInit();
        expect(directiveInstance._setProperties).toHaveBeenCalled();
        expect(directiveInstance._addClassToElement).toHaveBeenCalledWith('fd-badge--someStatus');
        expect(directiveInstance._addClassToElement).toHaveBeenCalledWith('fd-badge--someModifier');
    });
});
