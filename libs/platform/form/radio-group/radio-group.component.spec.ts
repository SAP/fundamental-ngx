import { Component, QueryList, ViewChildren } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { FormModule } from '@fundamental-ngx/core/form';
import { RadioButtonComponent as CoreRadioButtonComponent } from '@fundamental-ngx/core/radio';
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

@Component({
    selector: 'fdp-test-readonly-radio-group',
    template: `
        <form [formGroup]="form">
            <fdp-radio-group [name]="'season'" [readonly]="readonly" formControlName="season">
                <fdp-radio-button [value]="'winter'">Winter</fdp-radio-button>
                <fdp-radio-button [value]="'spring'">Spring</fdp-radio-button>
                <fdp-radio-button [value]="'summer'">Summer</fdp-radio-button>
            </fdp-radio-group>

            <fdp-radio-group
                [name]="'brand'"
                [list]="pizzaBrands"
                [readonly]="readonly"
                formControlName="brand"
            ></fdp-radio-group>
        </form>
    `,
    standalone: true,
    imports: [PlatformRadioGroupModule, FormsModule, ReactiveFormsModule]
})
class TestReadonlyRadioGroupComponent {
    @ViewChildren(RadioGroupComponent)
    radioGroups: QueryList<RadioGroupComponent>;

    readonly = true;
    pizzaBrands: string[] = ['Dominos', 'Pizza Hut', 'Papa Johns'];

    form = new FormGroup({
        season: new FormControl('winter'),
        brand: new FormControl('Dominos')
    });
}

describe('Radio Group readonly', () => {
    let component: TestReadonlyRadioGroupComponent;
    let fixture: ComponentFixture<TestReadonlyRadioGroupComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestReadonlyRadioGroupComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestReadonlyRadioGroupComponent);
        component = fixture.componentInstance;
    });

    async function wait(componentFixture: ComponentFixture<any>): Promise<void> {
        componentFixture.detectChanges();
        await componentFixture.whenStable();
    }

    it('should forward readonly from the group to content-projected radios', async () => {
        await wait(fixture);
        fixture.detectChanges();

        const contentRadios = component.radioGroups.first.contentRadioButtons.toArray();
        expect(contentRadios.length).toBeGreaterThan(0);
        contentRadios.forEach((radio) => expect(radio.isReadonly).toBe(true));

        // underlying core radio-button inputs reflect the readonly state
        const groupEl = fixture.debugElement.query(By.directive(RadioGroupComponent));
        const readonlyInputs = groupEl.queryAll(By.css('input[aria-readonly="true"]'));
        expect(readonlyInputs.length).toBe(contentRadios.length);

        // the core radios delegate arrow navigation to the group's FocusKeyManager
        const coreRadios = groupEl.queryAll(By.directive(CoreRadioButtonComponent));
        expect(coreRadios.length).toBeGreaterThan(0);
        coreRadios.forEach((radio) => expect(radio.componentInstance.managedFocus()).toBe(true));
    });

    it('should forward readonly from the group to list-generated radios', async () => {
        await wait(fixture);
        fixture.detectChanges();

        const listRadios = component.radioGroups.last.viewRadioButtons.toArray();
        expect(listRadios.length).toBeGreaterThan(0);
        listRadios.forEach((radio) => expect(radio.isReadonly).toBe(true));
    });

    it('should not change the selection or mark dirty when a readonly radio is clicked', async () => {
        await wait(fixture);
        fixture.detectChanges();

        expect(component.form.controls.season.value).toEqual('winter');
        expect(component.form.controls.season.dirty).toBe(false);

        const labels = fixture.debugElement.queryAll(By.css('.fd-radio__label'));
        labels[1].nativeElement.click(); // Spring
        await wait(fixture);
        fixture.detectChanges();

        expect(component.form.controls.season.value).toEqual('winter');
        expect(component.form.controls.season.dirty).toBe(false);
    });

    it('should still accept programmatic updates while readonly', async () => {
        await wait(fixture);
        fixture.detectChanges();

        component.form.controls.season.setValue('summer');
        await wait(fixture);
        fixture.detectChanges();

        expect(component.form.controls.season.value).toEqual('summer');
        expect(component.radioGroups.first.value).toEqual('summer');
    });

    it('should allow selection again once readonly is removed', async () => {
        await wait(fixture);
        fixture.detectChanges();

        component.readonly = false;
        await wait(fixture);
        fixture.detectChanges();

        const labels = fixture.debugElement.queryAll(By.css('.fd-radio__label'));
        labels[1].nativeElement.click(); // Spring
        await wait(fixture);
        fixture.detectChanges();

        expect(component.form.controls.season.value).toEqual('spring');
    });

    it('should move focus by exactly one radio on the first arrow key press', async () => {
        await wait(fixture);
        fixture.detectChanges();

        const groupEl = fixture.debugElement.query(By.directive(RadioGroupComponent));
        const inputs = groupEl
            .queryAll(By.css('input[type="radio"]'))
            .map((de) => de.nativeElement as HTMLInputElement);
        expect(inputs.length).toBeGreaterThan(2);

        // Focus the first radio, then a single ArrowRight should advance to the next one.
        inputs[0].focus();
        inputs[0].dispatchEvent(
            new KeyboardEvent('keydown', { key: 'ArrowRight', keyCode: 39, which: 39, bubbles: true, cancelable: true })
        );
        await wait(fixture);

        expect(document.activeElement).toBe(inputs[1]);
        // read-only: navigation must not change the selected value
        expect(component.form.controls.season.value).toEqual('winter');
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
