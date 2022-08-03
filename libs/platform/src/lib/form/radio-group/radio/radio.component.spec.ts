import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { FormModule } from '@fundamental-ngx/core/form';
import { RadioModule } from '@fundamental-ngx/core/radio';
import { runValueAccessorTests } from 'ngx-cva-test-suite';
import { PlatformRadioGroupModule } from '../radio-group.module';
import { RadioButtonComponent } from './radio.component';

@Component({
    template: `
        <fdp-radio-button
            #radio1
            id="radio1"
            name="radio"
            state="success"
            [value]="1"
            [forceRender]="true"
            [(ngModel)]="selectedValue"
        ></fdp-radio-button>
        <fdp-radio-button
            #radio2
            id="radio2"
            name="radio"
            state="error"
            [value]="2"
            fdCompact
            [forceRender]="true"
            [(ngModel)]="selectedValue"
        ></fdp-radio-button>
        <fdp-radio-button
            #radio3
            id="radio3"
            name="radio"
            [value]="3"
            [forceRender]="true"
            [disabled]="true"
            [(ngModel)]="selectedValue"
        ></fdp-radio-button>
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

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [RadioModule, FormModule, FormsModule, PlatformRadioGroupModule],
                declarations: [TestRadioButtonComponent]
            }).compileComponents();
        })
    );

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
    });

    it('radio button with default property should be created', () => {
        const inputElem = <HTMLInputElement>fixture.debugElement.query(By.css('input')).nativeElement;

        expect(inputElem.type).toEqual('radio');
        expect(inputElem.getAttribute('id')).toBeTruthy();
        expect(inputElem.getAttribute('ng-reflect-is-disabled')).toEqual('false');
        expect(inputElem.getAttribute('ng-reflect-name')).toEqual('radio');
        expect(inputElem.getAttribute('ng-reflect-value')).toEqual('1');

        expect(inputElem.classList.contains('fd-radio')).toBeTruthy();
    });

    it('radio button should be compact, valid state and disable', () => {
        const inputElems = fixture.debugElement.queryAll(By.css('input'));
        const inputElems1 = inputElems[1].nativeElement;
        const inputElems2 = inputElems[2].nativeElement;

        expect(inputElems1.type).toEqual('radio');
        expect(inputElems1.getAttribute('id')).toBeTruthy();
        expect(inputElems2.getAttribute('ng-reflect-is-disabled')).toBeTruthy();
        expect(inputElems1.getAttribute('ng-reflect-name')).toEqual('radio');
        expect(inputElems1.getAttribute('ng-reflect-value')).toEqual('2');

        expect(inputElems1.classList.contains('fd-radio')).toBeTruthy();
        expect(inputElems1.classList.contains('fd-radio--compact')).toBeTruthy();
    });

    it('radio click should should change control value', async () => {
        await wait(fixture);
        fixture.detectChanges();

        const radioInputElems = fixture.debugElement.queryAll(By.css('input'));
        const radioInputElems0 = radioInputElems[0].nativeElement;
        const radioInputElems1 = radioInputElems[1].nativeElement;

        // first radio should be checked
        expect(component.selectedValue).toEqual(1);
        expect(radioInputElems0.getAttribute('aria-checked')).toEqual('true');
        expect(radioInputElems0.getAttribute('tabindex')).toEqual('0');

        // click on second radio will check second radio and will change control value
        radioInputElems[1].nativeElement.click();

        await wait(fixture);
        fixture.detectChanges();
        expect(component.selectedValue).toEqual(2);

        expect(radioInputElems0.getAttribute('aria-checked')).toEqual('false');
        expect(radioInputElems0.getAttribute('tabindex')).toEqual('-1');
        expect(radioInputElems1.getAttribute('aria-checked')).toEqual('true');
        expect(radioInputElems1.getAttribute('tabindex')).toEqual('0');
    });
});

const RADIO_BUTTON_IDENTIFIER = 'platform-radio-button-unit-test';

runValueAccessorTests({
    component: RadioButtonComponent,
    testModuleMetadata: {
        imports: [FormModule, PlatformRadioGroupModule, FormsModule, ReactiveFormsModule]
    },
    additionalSetup: (fixture, done) => {
        fixture.componentInstance.id = RADIO_BUTTON_IDENTIFIER;
        fixture.componentInstance.name = RADIO_BUTTON_IDENTIFIER;
        done();
    },
    supportsOnBlur: false,
    internalValueChangeSetter: (fixture, value) => {
        fixture.componentInstance._valueChange(value, true);
    },
    getComponentValue: (fixture) => fixture.componentInstance._currentValue
});
