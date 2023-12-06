import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormLabelComponent } from './form-label.component';

@Component({
    template: ` <label #componentElement fd-form-label>Test Text</label> `,
    standalone: true,
    imports: [FormLabelComponent]
})
class TestComponent {
    @ViewChild(FormLabelComponent)
    ref: FormLabelComponent;

    getLabelElement(): Element {
        return document.getElementsByClassName('fd-form-label')[0];
    }
}

describe('FormLabelComponent', () => {
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
        expect(component.getLabelElement().className.includes('fd-form-label')).toBe(true);
    });
});
