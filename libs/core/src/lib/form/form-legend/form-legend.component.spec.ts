import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormModule } from '../form.module';

@Component({
    template: ` <legend #directiveElement fd-form-legend>Test Text</legend> `
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
            declarations: [TestComponent],
            imports: [FormModule]
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
