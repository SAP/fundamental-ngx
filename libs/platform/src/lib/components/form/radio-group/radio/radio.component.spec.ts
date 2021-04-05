import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RadioButtonComponent } from './radio.component';
import { RadioModule, FormModule, FormGroupComponent } from '@fundamental-ngx/core';
import { FormsModule } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';

@Component({
    template: `
        <fdp-radio-button
            #radio1
            id="radio1"
            name="radio"
            stateType="success"
            [value]="1"
            [forceRender]="true"
            [(ngModel)]="selectedValue"
        ></fdp-radio-button>
        <fdp-radio-button
            #radio2
            id="radio2"
            name="radio"
            stateType="error"
            [value]="2"
            [contentDensity]="'compact'"
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

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [RadioModule, FormModule, FormsModule],
            declarations: [RadioButtonComponent, FormGroupComponent, TestRadioButtonComponent]
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
    });

    it('radio button with default property should be created', () => {
        const inputElem = fixture.debugElement.query(By.css('input'));

        expect(inputElem.nativeElement.type).toEqual('radio');
        expect(inputElem.nativeElement.getAttribute('id')).toBeTruthy();
        expect(inputElem.nativeElement.getAttribute('ng-reflect-is-disabled')).toEqual('false');
        expect(inputElem.nativeElement.getAttribute('ng-reflect-name')).toEqual('radio');
        expect(inputElem.nativeElement.getAttribute('ng-reflect-value')).toEqual('1');

        expect(inputElem.nativeElement.classList.contains('fd-radio')).toBeTruthy();
    });

    it('radio button should be compact, valid state and disable', () => {
        const inputElems = fixture.debugElement.queryAll(By.css('input'));

        expect(inputElems[1].nativeElement.type).toEqual('radio');
        expect(inputElems[1].nativeElement.getAttribute('id')).toBeTruthy();
        expect(inputElems[2].nativeElement.getAttribute('ng-reflect-is-disabled')).toBeTruthy();
        expect(inputElems[1].nativeElement.getAttribute('ng-reflect-name')).toEqual('radio');
        expect(inputElems[1].nativeElement.getAttribute('ng-reflect-value')).toEqual('2');

        expect(inputElems[1].nativeElement.classList.contains('fd-radio')).toBeTruthy();
        expect(inputElems[1].nativeElement.classList.contains('fd-radio--compact')).toBeTruthy();
    });

    it('radio click should should change control value', async () => {
        await wait(fixture);
        fixture.detectChanges();

        const radioInputElems = fixture.debugElement.queryAll(By.css('input'));

        // first radio should be checked
        expect(component.selectedValue).toEqual(1);
        expect(radioInputElems[0].nativeElement.getAttribute('aria-checked')).toEqual('true');
        expect(radioInputElems[0].nativeElement.getAttribute('tabindex')).toEqual('0');

        // click on second radio will check second radio and will change control value
        radioInputElems[1].nativeElement.click();

        await wait(fixture);
        fixture.detectChanges();
        expect(component.selectedValue).toEqual(2);

        expect(radioInputElems[0].nativeElement.getAttribute('aria-checked')).toEqual('false');
        expect(radioInputElems[0].nativeElement.getAttribute('tabindex')).toEqual('-1');
        expect(radioInputElems[1].nativeElement.getAttribute('aria-checked')).toEqual('true');
        expect(radioInputElems[1].nativeElement.getAttribute('tabindex')).toEqual('0');
    });
});
