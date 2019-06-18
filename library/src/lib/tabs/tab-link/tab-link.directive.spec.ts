import { Component, DebugElement, ElementRef, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TabLinkDirective } from './tab-link.directive';
import { By } from '@angular/platform-browser';
import { FormControlDirective } from '../../form/form-control/form-control.directive';

@Component({
    selector: 'fd-test-component',
    template: '<div #directiveElement fd-tab-link>Link</div>'
})
export class TestComponent {
    @ViewChild('directiveElement') ref: ElementRef;
}

describe('TabLinkDirective', () => {
    let fixture: ComponentFixture<TestComponent>,
        component: TabLinkDirective,
        debugElement: DebugElement
    ;
    let directive, directiveInstance;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TabLinkDirective, TestComponent]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        debugElement = fixture.debugElement;
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
        directive = debugElement.query(By.directive(TabLinkDirective));
        directiveInstance = directive.injector.get(TabLinkDirective);

        spyOn(directiveInstance, '_setProperties').and.callThrough();
        spyOn(directiveInstance, '_addClassToElement');
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Should Activate and change class', () => {
        directiveInstance.activateChange(true);
        expect(directiveInstance._setProperties).toHaveBeenCalled();
        expect(directiveInstance._addClassToElement).toHaveBeenCalledWith('is-selected');
    });

    it('Should Disable and change class', () => {
        directiveInstance.disabledChange(true);
        expect(directiveInstance._setProperties).toHaveBeenCalled();
        expect(directiveInstance._addClassToElement).toHaveBeenCalledWith('is-disabled');
    });
});
