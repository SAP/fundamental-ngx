import { Component, QueryList, ViewChildren } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { FormModule } from '@fundamental-ngx/core/form';
import { SelectItem } from '@fundamental-ngx/platform/shared';
import { runValueAccessorTests } from 'ngx-cva-test-suite';
import { FdpFormGroupModule } from '../form-group/fdp-form.module';
import { RadioGroupComponent } from './radio-group.component';
import { PlatformRadioGroupModule } from './radio-group.module';

@Component({
    selector: 'fdp-test-reative-fdp-form-group',
    template: `
        <fdp-form-group [formGroup]="form1" [object]="formData">
            <fdp-form-field #fl1 [id]="'pizzaBrand'" [label]="'Select Pizza Store:'" zone="zLeft" rank="1">
                <fdp-radio-group
                    [list]="pizzaBrands"
                    [name]="'brand'"
                    [isInline]="true"
                    [formControl]="fl1.formControl"
                ></fdp-radio-group>
            </fdp-form-field>

            <fdp-form-field [id]="'size'" [label]="'Select Pizza Size:'" zone="zLeft" rank="1">
                <fdp-radio-group
                    [list]="pizzaSizes"
                    [name]="'size'"
                    [isInline]="true"
                    formControlName="sizeOrdered"
                ></fdp-radio-group>
            </fdp-form-field>

            <fdp-form-field #fl3 [id]="'deliver'" [label]="'Select delivery method:'" zone="zLeft" rank="1">
                <fdp-radio-group
                    [list]="delivery"
                    [name]="'delivery'"
                    [isInline]="true"
                    [formControl]="fl3.formControl"
                ></fdp-radio-group>
            </fdp-form-field>

            <fdp-form-field #fl4 [id]="'payment'" [label]="'Select Payment method:'" zone="zLeft" rank="1">
                <fdp-radio-group
                    [list]="paymentMethods"
                    [name]="'payment'"
                    [isInline]="true"
                    [lookupKey]="'paymentMethod'"
                    [displayKey]="'bank'"
                    [formControl]="fl4.formControl"
                ></fdp-radio-group>
            </fdp-form-field>

            <fdp-form-field #ffl1 [id]="'season'" [label]="'My Fav Season:'" zone="zLeft" rank="1">
                <fdp-radio-group [name]="'seasons'" [isInline]="true" [formControl]="ffl1.formControl">
                    <fdp-radio-button [value]="'winter'">Winter</fdp-radio-button>
                    <fdp-radio-button [value]="'spring'">Spring</fdp-radio-button>
                    <fdp-radio-button [value]="'summer'">Summer</fdp-radio-button>
                    <fdp-radio-button [value]="'autumn'">Autumn</fdp-radio-button>
                </fdp-radio-group>
            </fdp-form-field>
        </fdp-form-group>
    `,
    standalone: true,
    imports: [FdpFormGroupModule, FormModule, PlatformRadioGroupModule, FormsModule, ReactiveFormsModule]
})
class TestRadioGroupReactiveFdpGroupComponent {
    @ViewChildren(RadioGroupComponent)
    radioGroups: QueryList<RadioGroupComponent>;

    pizzaBrands: string[] = ['Dominos', 'Pizza Hut', 'Papa Johns'];
    pizzaSizes: string[] = ['5', '8', '12'];
    seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];

    delivery: SelectItem[] = [
        new DeliveryMethod('Home Address', 'home', false),
        new DeliveryMethod('Office Address', 'office', false),
        new DeliveryMethod('Store Pickup', 'pickup', true)
    ];

    paymentMethods: Payment[] = [
        new Payment('citi debit', 'CITI'),
        new Payment('hdfc debit', 'HDFC'),
        new Payment('icici credit', 'ICICI'),
        new Payment('paytm wallet', 'Paytm'),
        new Payment('cod', 'COD')
    ];

    form1 = new FormGroup({
        sizeOrdered: new FormControl('5'),
        pizzaBrand: new FormControl(),
        deliver: new FormControl(),
        payment: new FormControl(),
        season: new FormControl()
    });

    formData = { pizzaBrand: 'Pizza Hut', season: 'winter' };
}

describe('Radio Group Test with Reactive fdp-form-group', () => {
    let component: TestRadioGroupReactiveFdpGroupComponent;
    let fixture: ComponentFixture<TestRadioGroupReactiveFdpGroupComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestRadioGroupReactiveFdpGroupComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestRadioGroupReactiveFdpGroupComponent);
        component = fixture.componentInstance;
    });

    async function wait(componentFixture: ComponentFixture<any>): Promise<void> {
        componentFixture.detectChanges();
        await componentFixture.whenStable();
    }

    it('should create radio group', () => {
        expect(component).toBeTruthy();
    });

    it('should be able to select radio, created from list of values', async () => {
        await wait(fixture);
        fixture.detectChanges();

        // pre-selection based on object passed to formGroup
        expect(component.form1.controls.pizzaBrand.value).toEqual('Pizza Hut');

        // pre-selection based on formcontrol value inside formGroup
        // expect(component.form1.controls.sizeOrdered.value).toEqual('5');

        const fdradiobuttonsLabels = fixture.debugElement.queryAll(By.css('.fd-radio__label'));

        fdradiobuttonsLabels[0].nativeElement.click();
        fixture.detectChanges();
        expect(component.form1.controls.pizzaBrand.value).toEqual('Dominos');

        fdradiobuttonsLabels[1].nativeElement.click();
        fixture.detectChanges();
        expect(component.form1.controls.pizzaBrand.value).toEqual('Pizza Hut');

        fdradiobuttonsLabels[2].nativeElement.click();
        fixture.detectChanges();
        expect(component.form1.controls.pizzaBrand.value).toEqual('Papa Johns');

        fdradiobuttonsLabels[3].nativeElement.click();
        fixture.detectChanges();
        expect(component.form1.controls.sizeOrdered.value).toEqual('5');

        fdradiobuttonsLabels[4].nativeElement.click();
        fixture.detectChanges();
        expect(component.form1.controls.sizeOrdered.value).toEqual('8');

        fdradiobuttonsLabels[5].nativeElement.click();
        fixture.detectChanges();
        expect(component.form1.controls.sizeOrdered.value).toEqual('12');
    });

    it('should be able to select radio, created from list of selectItem Objects', async () => {
        await wait(fixture);
        fixture.detectChanges();

        const fdradiobuttonsLabels = fixture.debugElement.queryAll(By.css('.fd-radio__label'));

        fdradiobuttonsLabels[6].nativeElement.click();
        fixture.detectChanges();
        expect(component.form1.controls.deliver.value).toEqual('home');

        fdradiobuttonsLabels[7].nativeElement.click();
        fixture.detectChanges();
        expect(component.form1.controls.deliver.value).toEqual('office');

        // disabled radio
        fdradiobuttonsLabels[8].nativeElement.click();
        fixture.detectChanges();
        expect(component.form1.controls.deliver.value).toEqual('office');
    });

    it('should be able to select radio,for any type of Objects using lookupKey and displayKey', async () => {
        await wait(fixture);
        fixture.detectChanges();

        const fdradiobuttonsLabels = fixture.debugElement.queryAll(By.css('.fd-radio__label'));

        fdradiobuttonsLabels[9].nativeElement.click();
        fixture.detectChanges();
        expect(component.form1.controls.payment.value).toEqual('citi debit');

        fdradiobuttonsLabels[10].nativeElement.click();
        fixture.detectChanges();
        expect(component.form1.controls.payment.value).toEqual('hdfc debit');

        fdradiobuttonsLabels[11].nativeElement.click();
        fixture.detectChanges();
        expect(component.form1.controls.payment.value).toEqual('icici credit');

        fdradiobuttonsLabels[12].nativeElement.click();
        fixture.detectChanges();
        expect(component.form1.controls.payment.value).toEqual('paytm wallet');

        fdradiobuttonsLabels[13].nativeElement.click();
        fixture.detectChanges();
        expect(component.form1.controls.payment.value).toEqual('cod');
    });

    it('should be able to select radio for content projected radios', async () => {
        await wait(fixture);
        fixture.detectChanges();

        expect(component.form1.controls.season.value).toEqual('winter');

        const fdradiobuttonsLabels = fixture.debugElement.queryAll(By.css('.fd-radio__label'));

        fdradiobuttonsLabels[14].nativeElement.click();
        fixture.detectChanges();
        expect(component.form1.controls.season.value).toEqual('winter');

        fdradiobuttonsLabels[15].nativeElement.click();
        fixture.detectChanges();
        expect(component.form1.controls.season.value).toEqual('spring');

        fdradiobuttonsLabels[16].nativeElement.click();
        fixture.detectChanges();
        expect(component.form1.controls.season.value).toEqual('summer');

        fdradiobuttonsLabels[17].nativeElement.click();
        fixture.detectChanges();
        expect(component.form1.controls.season.value).toEqual('autumn');
    });

    it('should apply is-error style on form Error', async () => {
        await wait(fixture);
        fixture.detectChanges();

        const inputElem = fixture.debugElement.queryAll(By.css('input'));

        component.radioGroups.first.contentRadioButtons.forEach((radio, i) => {
            expect(inputElem[i].nativeElement.classList.contains('is-error')).toBeFalsy();
            expect(inputElem[i].nativeElement.classList.contains('is-warning')).toBeFalsy();
        });

        component.form1.controls.pizzaBrand.setErrors({ 'has error': true });
        component.form1.controls.pizzaBrand.markAsTouched();

        fixture.detectChanges();
        expect(component.form1.controls.pizzaBrand.status).toEqual('INVALID');
    });
});

@Component({
    selector: 'fdp-test-template-driven-fdp-form-group',
    template: `
        <fdp-form-group>
            <fdp-form-field [id]="'pizzaBrandt'" [label]="'Select Pizza Store:'" zone="zLeft" rank="1">
                <fdp-radio-group
                    [list]="pizzaBrands"
                    [name]="'brand'"
                    [isInline]="true"
                    [(ngModel)]="favPizzaBrand"
                ></fdp-radio-group>
            </fdp-form-field>

            <fdp-form-field [id]="'sizet'" [label]="'Select Pizza Size:'" zone="zLeft" rank="1">
                <fdp-radio-group
                    [list]="pizzaSizes"
                    [name]="'size'"
                    [isInline]="true"
                    [(ngModel)]="sizeOrdered"
                ></fdp-radio-group>
            </fdp-form-field>

            <fdp-form-field #fl3 [id]="'delivert'" [label]="'Select delivery method:'" zone="zLeft" rank="1">
                <fdp-radio-group
                    [list]="delivery"
                    [name]="'delivery'"
                    [isInline]="true"
                    [(ngModel)]="favDeliverMethod"
                ></fdp-radio-group>
            </fdp-form-field>

            <fdp-form-field #fl4 [id]="'paymentt'" [label]="'Select Payment method:'" zone="zLeft" rank="1">
                <fdp-radio-group
                    [list]="paymentMethods"
                    [name]="'payment'"
                    [isInline]="true"
                    [lookupKey]="'paymentMethod'"
                    [displayKey]="'bank'"
                    [(ngModel)]="favPaymentMethod"
                ></fdp-radio-group>
            </fdp-form-field>

            <fdp-form-field #ffl1 [id]="'seasont'" [label]="'My Fav Season:'" zone="zLeft" rank="1">
                <fdp-radio-group [name]="'seasons'" [isInline]="true" [(ngModel)]="favSeason">
                    <fdp-radio-button [value]="'winter'">Winter</fdp-radio-button>
                    <fdp-radio-button [value]="'spring'">Spring</fdp-radio-button>
                    <fdp-radio-button [value]="'summer'">Summer</fdp-radio-button>
                    <fdp-radio-button [value]="'autumn'">Autumn</fdp-radio-button>
                </fdp-radio-group>
            </fdp-form-field>
        </fdp-form-group>
    `,
    standalone: true,
    imports: [FdpFormGroupModule, FormModule, PlatformRadioGroupModule, FormsModule, ReactiveFormsModule]
})
class TestRadioGroupTemplateDrivenFdpGroupComponent {
    @ViewChildren(RadioGroupComponent)
    radioGroups: QueryList<RadioGroupComponent>;

    pizzaBrands: string[] = ['Dominos', 'Pizza Hut', 'Papa Johns'];
    pizzaSizes: string[] = ['5', '8', '12'];
    seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];

    delivery: SelectItem[] = [
        new DeliveryMethod('Home Address', 'home', false),
        new DeliveryMethod('Office Address', 'office', false),
        new DeliveryMethod('Store Pickup', 'pickup', true)
    ];

    paymentMethods: Payment[] = [
        new Payment('citi debit', 'CITI'),
        new Payment('hdfc debit', 'HDFC'),
        new Payment('icici credit', 'ICICI'),
        new Payment('paytm wallet', 'Paytm'),
        new Payment('cod', 'COD')
    ];

    sizeOrdered = '5';
    favPizzaBrand = 'Pizza Hut';
    favDeliverMethod = '';
    favPaymentMethod = '';
    favSeason = 'winter';
}

describe('Radio Group Test with Template Driven fdp-form-group', () => {
    let component: TestRadioGroupTemplateDrivenFdpGroupComponent;
    let fixture: ComponentFixture<TestRadioGroupTemplateDrivenFdpGroupComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestRadioGroupTemplateDrivenFdpGroupComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestRadioGroupTemplateDrivenFdpGroupComponent);
        component = fixture.componentInstance;
    });

    async function wait(componentFixture: ComponentFixture<any>): Promise<void> {
        componentFixture.detectChanges();
        await componentFixture.whenStable();
    }

    it('should create radio group', () => {
        expect(component).toBeTruthy();
    });

    it('should be able to select radio, created from list of values', async () => {
        await wait(fixture);
        fixture.detectChanges();

        expect(component.favPizzaBrand).toEqual('Pizza Hut');
        expect(component.sizeOrdered).toEqual('5');

        const inputElem = fixture.debugElement.queryAll(By.css('input'));
        const fdradiobuttonsLabels = fixture.debugElement.queryAll(By.css('.fd-radio__label'));

        fdradiobuttonsLabels[0].nativeElement.click();
        await wait(fixture);
        fixture.detectChanges();
        expect(component.favPizzaBrand).toEqual('Dominos');
        expect(inputElem[0].nativeElement.getAttribute('aria-checked')).toEqual('true');
        expect(inputElem[0].nativeElement.getAttribute('tabIndex')).toEqual('0');

        expect(inputElem[1].nativeElement.getAttribute('aria-checked')).toEqual('false');
        expect(inputElem[1].nativeElement.getAttribute('tabIndex')).toEqual('-1');
        expect(inputElem[2].nativeElement.getAttribute('aria-checked')).toEqual('false');
        expect(inputElem[2].nativeElement.getAttribute('tabIndex')).toEqual('-1');

        fdradiobuttonsLabels[1].nativeElement.click();
        await wait(fixture);
        fixture.detectChanges();
        expect(component.favPizzaBrand).toEqual('Pizza Hut');
        expect(inputElem[0].nativeElement.getAttribute('aria-checked')).toEqual('false');
        expect(inputElem[0].nativeElement.getAttribute('tabIndex')).toEqual('-1');

        expect(inputElem[1].nativeElement.getAttribute('aria-checked')).toEqual('true');
        expect(inputElem[1].nativeElement.getAttribute('tabIndex')).toEqual('0');
        expect(inputElem[2].nativeElement.getAttribute('aria-checked')).toEqual('false');
        expect(inputElem[2].nativeElement.getAttribute('tabIndex')).toEqual('-1');

        fdradiobuttonsLabels[2].nativeElement.click();
        fixture.detectChanges();
        expect(component.favPizzaBrand).toEqual('Papa Johns');

        fdradiobuttonsLabels[3].nativeElement.click();
        fixture.detectChanges();
        expect(component.sizeOrdered).toEqual('5');

        fdradiobuttonsLabels[4].nativeElement.click();
        fixture.detectChanges();
        expect(component.sizeOrdered).toEqual('8');

        fdradiobuttonsLabels[5].nativeElement.click();
        fixture.detectChanges();
        expect(component.sizeOrdered).toEqual('12');
    });

    it('should be able to select radio, created from list of selectItem Objects', async () => {
        await wait(fixture);
        fixture.detectChanges();

        const fdradiobuttonsLabels = fixture.debugElement.queryAll(By.css('.fd-radio__label'));

        fdradiobuttonsLabels[6].nativeElement.click();
        fixture.detectChanges();
        expect(component.favDeliverMethod).toEqual('home');

        fdradiobuttonsLabels[7].nativeElement.click();
        fixture.detectChanges();
        expect(component.favDeliverMethod).toEqual('office');

        // disabled radio
        fdradiobuttonsLabels[8].nativeElement.click();
        fixture.detectChanges();
        expect(component.favDeliverMethod).toEqual('office');
    });

    it('should be able to select radio,for any type of Objects using lookupKey and displayKey', async () => {
        await wait(fixture);
        fixture.detectChanges();

        const fdradiobuttonsLabels = fixture.debugElement.queryAll(By.css('.fd-radio__label'));

        fdradiobuttonsLabels[9].nativeElement.click();
        fixture.detectChanges();
        expect(component.favPaymentMethod).toEqual('citi debit');

        fdradiobuttonsLabels[10].nativeElement.click();
        fixture.detectChanges();
        expect(component.favPaymentMethod).toEqual('hdfc debit');

        fdradiobuttonsLabels[11].nativeElement.click();
        fixture.detectChanges();
        expect(component.favPaymentMethod).toEqual('icici credit');

        fdradiobuttonsLabels[12].nativeElement.click();
        fixture.detectChanges();
        expect(component.favPaymentMethod).toEqual('paytm wallet');

        fdradiobuttonsLabels[13].nativeElement.click();
        fixture.detectChanges();
        expect(component.favPaymentMethod).toEqual('cod');
    });

    it('should be able to select radio for content projected radios', async () => {
        await wait(fixture);
        fixture.detectChanges();

        expect(component.favSeason).toEqual('winter');

        const fdradiobuttonsLabels = fixture.debugElement.queryAll(By.css('.fd-radio__label'));

        fdradiobuttonsLabels[14].nativeElement.click();
        fixture.detectChanges();
        expect(component.favSeason).toEqual('winter');

        fdradiobuttonsLabels[15].nativeElement.click();
        fixture.detectChanges();
        expect(component.favSeason).toEqual('spring');

        fdradiobuttonsLabels[16].nativeElement.click();
        fixture.detectChanges();
        expect(component.favSeason).toEqual('summer');

        fdradiobuttonsLabels[17].nativeElement.click();
        fixture.detectChanges();
        expect(component.favSeason).toEqual('autumn');
    });
});

class DeliveryMethod implements SelectItem {
    constructor(
        public label: string,
        public value: string,
        public disabled: boolean
    ) {}
}

class Payment {
    constructor(
        public paymentMethod: string,
        public bank: string
    ) {}
}

const RADIO_GROUP_IDENTIFIER = 'platform-radio-group-unit-test';

runValueAccessorTests({
    component: RadioGroupComponent,
    name: 'Radio group',
    testModuleMetadata: {
        imports: [PlatformRadioGroupModule]
    },
    additionalSetup: (fixture, done) => {
        fixture.componentInstance.list = ['a', 'b', 'c'];
        fixture.componentInstance.id = RADIO_GROUP_IDENTIFIER;
        fixture.componentInstance.name = RADIO_GROUP_IDENTIFIER;
        done();
    },
    supportsOnBlur: false,
    // internalValueChangeSetter: null,
    // TODO: uncomment internalValueChangeSetter after ngx-cva-test-suite@1.1.0 is released
    internalValueChangeSetter: (fixture, value) => {
        fixture.componentInstance.viewRadioButtons.find((b) => b.value === value)?._valueChange(value, true);
    },
    getComponentValue: (fixture) => fixture.componentInstance.value
});
