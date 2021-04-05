import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RadioButtonComponent } from './radio-button.component';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
    template: `
        <form [formGroup]="radioForm">
            <fd-radio-button
                #radio1
                [selectedValue]="radioForm.controls.radioInput1.value"
                [value]="1"
                name="radio"
            ></fd-radio-button>
            <fd-radio-button
                #radio2
                [selectedValue]="radioForm.controls.radioInput2.value"
                [value]="2"
                name="radio"
            ></fd-radio-button>
        </form>
    `
})
class TestRadioButtonComponentReactiveForms {
    @ViewChild('radio1') radioButton1: RadioButtonComponent;
    @ViewChild('radio2') radioButton2: RadioButtonComponent;

    radioForm = new FormGroup({
        radioInput1: new FormControl(true),
        radioInput2: new FormControl(true)
    });
}

describe('RadioButtonComponent reactive forms', () => {
    let component: TestRadioButtonComponentReactiveForms;
    let fixture: ComponentFixture<TestRadioButtonComponentReactiveForms>;
    let changeDetectorRef: ChangeDetectorRef;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule],
            declarations: [RadioButtonComponent, TestRadioButtonComponentReactiveForms]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestRadioButtonComponentReactiveForms);
        component = fixture.componentInstance;
        changeDetectorRef = fixture.componentRef.injector.get(ChangeDetectorRef);
        fixture.detectChanges();
    });

    async function wait(componentFixture: ComponentFixture<any>): Promise<any> {
        changeDetectorRef.markForCheck();
        componentFixture.detectChanges();
        await componentFixture.whenStable();
    }

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have the value', async () => {
        await fixture.whenStable();
        expect(component.radioButton1.value).toEqual(1);
    });

    it('should check second radio', async() => {
      await fixture.whenStable();
      new Promise(async () => {
        component.radioButton2.inputElement.nativeElement.click();
        await fixture.detectChanges();
      }).then(() => {
        expect(component.radioButton1.inputElement.nativeElement.checked).toBeFalsy();
        expect(component.radioButton2.inputElement.nativeElement.checked).toBeTruthy();
      });
    });
});
