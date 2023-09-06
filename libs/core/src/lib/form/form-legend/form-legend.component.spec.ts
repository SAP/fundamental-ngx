import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormLegendDirective } from './form-legend.directive';

@Component({
    template: ` <legend #directiveElement fd-form-legend>Test Text</legend> `,
    imports: [FormLegendDirective],
    standalone: true
})
class TestComponent {
    @ViewChild('directiveElement')
    ref: ElementRef;
}

describe('FormLegendDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should assign class', () => {
        expect(component.ref.nativeElement.className).toBe('fd-fieldset__legend');
    });
});
