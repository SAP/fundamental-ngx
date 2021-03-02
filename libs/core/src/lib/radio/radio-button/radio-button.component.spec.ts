import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RadioButtonComponent } from './radio-button.component';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    template: `
        <fd-radio-button #radio1 state="success" [(ngModel)]="selectedValue" [value]="1" name="radio"></fd-radio-button>
        <fd-radio-button #radio2 state="error" [(ngModel)]="selectedValue" [value]="2" name="radio"></fd-radio-button>
        <fd-radio-button
            #radio3
            [disabled]="true"
            [(ngModel)]="selectedValue"
            [value]="3"
            name="radio"
        ></fd-radio-button>
    `
})
class TestRadioButtonComponent {
    selectedValue = 1;

    @ViewChild('radio1') radioButton1: RadioButtonComponent;
    @ViewChild('radio2') radioButton2: RadioButtonComponent;
    @ViewChild('radio3') radioButton3: RadioButtonComponent;
}

describe('RadioButtonComponent', () => {
    let component: TestRadioButtonComponent;
    let fixture: ComponentFixture<TestRadioButtonComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [RadioButtonComponent, TestRadioButtonComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestRadioButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    async function wait(componentFixture: ComponentFixture<any>): Promise<void> {
        componentFixture.detectChanges();
        await componentFixture.whenStable();
    }

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(component.radioButton1.name).toContain('radio');
    });

    it('should have the value', async () => {
        await fixture.whenStable();
        expect(component.radioButton1.value).toEqual(1);
    });

    it('should check second radio', () => {
        component.radioButton2.valueChange(2);

        (<any>component.radioButton2).changeDetectionRef.detectChanges();
        fixture.detectChanges();

        expect(component.radioButton2.inputElement.nativeElement.checked).toBeTruthy();
        expect(component.radioButton1.inputElement.nativeElement.checked).toBeFalsy();
    });

    it('should have correct state', async () => {
        await wait(fixture);

        // value is accessed by [] because component doesn't have a getter for state by design
        expect(component.radioButton1.state).toContain('success');
        expect(component.radioButton2.state).toContain('error');
    });

    it('should be disabled', async () => {
        await wait(fixture);

        expect(component.radioButton3.disabled).toBeTruthy();
        expect(component.radioButton3.inputElement.nativeElement.disabled).toBeTruthy();
    });
});
