import { ButtonGroupedDirective } from './button-grouped.directive';
import { Component, DebugElement, ElementRef, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
    selector: 'fd-test-component',
    template: '<button #directive fd-button-grouped>ButtonGrouped</button>'
})
export class TestComponent {
    @ViewChild('directive')
    ref: ElementRef;
}

describe('ButtonGroupedDirective', () => {
    let fixture: ComponentFixture<TestComponent>,
        component: TestComponent,
        debugElement: DebugElement,
        element: HTMLElement;

    let directive, directiveInstance;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ButtonGroupedDirective, TestComponent]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        element = debugElement.nativeElement;
        fixture.detectChanges();
        directive = debugElement.query(By.directive(ButtonGroupedDirective));
        directiveInstance = directive.injector.get(ButtonGroupedDirective);

        spyOn(directiveInstance, '_setProperties').and.callThrough();
        spyOn(directiveInstance, '_addClassToElement').and.callThrough();
    });

    it('should create', () => {
        expect(directive).toBeTruthy();
    });

    it('should assign base class', () => {
        expect(component.ref.nativeElement.className).toContain('fd-button--grouped');
    });

    it ('should support compact mode', () => {
        directiveInstance.compact = true;
        fixture.detectChanges();
        expect(component.ref.nativeElement.className).toContain('fd-button--compact');
    });

    it('should support glyph', () => {
        const testIconLabel = 'icon';
        directiveInstance.glyph = testIconLabel;
        directiveInstance.ngOnInit();
        fixture.detectChanges();
        expect(component.ref.nativeElement.className).toContain('sap-icon--' + testIconLabel);
    });

    it('should support state', () => {
        const testState = 'state';
        directiveInstance.state = testState;
        directiveInstance.ngOnInit();
        fixture.detectChanges();
        expect(component.ref.nativeElement.className).toContain('is-' + testState);
    });

});
