import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup, FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RadioButtonComponent } from './radio/radio.component';
import { RadioGroupComponent } from './radio-group.component';
import { FormModule, RadioModule } from '@fundamental-ngx/core';
import { FdpFormGroupModule } from '../form-group/fdp-form.module';
import { PlatformRadioGroupModule } from './radio-group.module';
import { SelectItem } from '../../../domain/data-model';

@Component({
    selector: 'fdp-test-radio-group',
    template: `
        <form [formGroup]="customForm">
            <fieldset fd-fieldset>
                <fdp-radio-group
                    [id]="'radio1'"
                    [name]="'radio1'"
                    [contentDensity]="'compact'"
                    [value]="'Spring'"
                    [isInline]="false"
                    formControlName="example1"
                >
                    <fdp-radio-button *ngFor="let season of seasons" [value]="season">
                        {{ season }}
                    </fdp-radio-button>
                </fdp-radio-group>
            </fieldset>
        </form>
    `
})
class TestComponentContent {
    seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];
    favoriteSeason = '';
    customForm = new FormGroup({
        example1: new FormControl({ value: '', disabled: false })
    });

    @ViewChild(RadioGroupComponent)
    radioGroup: RadioGroupComponent;
}

describe('RadioGroupComponent', () => {
    let host: TestComponentContent;
    let component: RadioGroupComponent;
    let fixture: ComponentFixture<TestComponentContent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormModule, RadioModule, ReactiveFormsModule],
            declarations: [TestComponentContent, RadioGroupComponent, RadioButtonComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponentContent);
        host = fixture.componentInstance;
        component = host.radioGroup;
        fixture.detectChanges();
    });

    async function wait(componentFixture: ComponentFixture<any>): Promise<void> {
        componentFixture.detectChanges();
        await componentFixture.whenStable();
    }

    it('should create', () => {
        expect(host).toBeTruthy();
    });

    it('should create radio buttons with given values', () => {
        const fdradiobuttonsElem = fixture.debugElement.queryAll(By.css('fd-radio-button'));
        expect(fdradiobuttonsElem.length).toEqual(4);
        fdradiobuttonsElem.forEach((fdradio) => {
            expect(host.seasons.includes(fdradio.nativeElement.getAttribute('ng-reflect-value'))).toBeTruthy();
        });
        const inputElem = fixture.debugElement.queryAll(By.css('input'));
        expect(inputElem.length).toEqual(4);
        inputElem.forEach((inputradio) => {
            expect(host.seasons.includes(inputradio.nativeElement.getAttribute('ng-reflect-value'))).toBeTruthy();
        });
    });

    it('control value should change on click', async () => {
        await wait(fixture);
        expect(host.customForm.get('example1').value).toEqual('Spring');

        const fdradiobuttonsElem = fixture.debugElement.queryAll(By.css('fd-radio-button'));

        fdradiobuttonsElem[0].nativeElement.click();
        fixture.detectChanges();
        expect(host.customForm.get('example1').value).toEqual('Winter');

        fdradiobuttonsElem[1].nativeElement.click();
        fixture.detectChanges();
        expect(host.customForm.get('example1').value).toEqual('Spring');

        fdradiobuttonsElem[2].nativeElement.click();
        fixture.detectChanges();
        expect(host.customForm.get('example1').value).toEqual('Summer');

        fdradiobuttonsElem[3].nativeElement.click();
        fixture.detectChanges();
        expect(host.customForm.get('example1').value).toEqual('Autumn');
    });

    it('should have is-error set to radio button', async () => {
        const inputElem1 = fixture.debugElement.queryAll(By.css('input'));
        inputElem1.forEach((inputradio) => {
            expect(inputradio.nativeElement.classList.contains('is-error')).toBeFalsy();
            expect(inputradio.nativeElement.classList.contains('is-warning')).toBeFalsy();
        });

        host.customForm.get('example1').setErrors({ 'has error': true });
        host.customForm.get('example1').markAsTouched();

        await wait(fixture);
        fixture.detectChanges();
        const inputElem2 = fixture.debugElement.queryAll(By.css('input'));
        inputElem2.forEach((inputradio) => {
            expect(inputradio.nativeElement.classList.contains('is-error')).toBeTruthy();
        });
    });
});

@Component({
    selector: 'fdp-test-radio-group',
    template: `
        <form class="flex-form">
            <fieldset fd-fieldset>
                <fdp-radio-group
                    [id]="'radio1'"
                    [name]="'radio1'"
                    [value]="'Spring'"
                    [list]="seasons"
                    [isInline]="false"
                    [(ngModel)]="favoriteSeason"
                >
                </fdp-radio-group>
            </fieldset>
        </form>
    `
})
class TestComponentList {
    seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];

    favoriteSeason = '';

    @ViewChild(RadioGroupComponent)
    radioGroup: RadioGroupComponent;

    @ViewChildren(RadioButtonComponent)
    radioButtons: RadioButtonComponent;
}

describe('GroupRadioButtonComponent', () => {
    let host: TestComponentList;
    let component: RadioGroupComponent;
    let fixture: ComponentFixture<TestComponentList>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormModule, RadioModule, FormsModule],
            declarations: [TestComponentList, RadioGroupComponent, RadioButtonComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponentList);
        host = fixture.componentInstance;
        component = host.radioGroup;
        fixture.detectChanges();
    });

    async function wait(componentFixture: ComponentFixture<any>): Promise<void> {
        componentFixture.detectChanges();
        await componentFixture.whenStable();
    }

    it('should create', () => {
        expect(host).toBeTruthy();
    });

    it('should create radio buttons with given values', async () => {
        await wait(fixture);
        fixture.detectChanges();

        const fdradiobuttonsElem = fixture.debugElement.queryAll(By.css('fdp-radio-button'));
        fixture.detectChanges();

        expect(fdradiobuttonsElem.length).toEqual(4);
        fdradiobuttonsElem.forEach((fdradio) => {
            expect(host.seasons.includes(fdradio.nativeElement.getAttribute('ng-reflect-value'))).toBeTruthy();
        });
        const inputElem = fixture.debugElement.queryAll(By.css('input'));
        expect(inputElem.length).toEqual(4);
        inputElem.forEach((inputradio) => {
            expect(host.seasons.includes(inputradio.nativeElement.getAttribute('ng-reflect-value'))).toBeTruthy();
        });
    });

    it('control value should change on click', async () => {
        await wait(fixture);
        fixture.detectChanges();

        expect(host.favoriteSeason).toEqual('Spring');

        const fdradiobuttonsElem = fixture.debugElement.queryAll(By.css('fd-radio-button'));

        fdradiobuttonsElem[0].nativeElement.click();
        fixture.detectChanges();
        expect(host.favoriteSeason).toEqual('Winter');

        fdradiobuttonsElem[1].nativeElement.click();
        fixture.detectChanges();
        expect(host.favoriteSeason).toEqual('Spring');

        fdradiobuttonsElem[2].nativeElement.click();
        fixture.detectChanges();
        expect(host.favoriteSeason).toEqual('Summer');

        fdradiobuttonsElem[3].nativeElement.click();
        fixture.detectChanges();
        expect(host.favoriteSeason).toEqual('Autumn');
    });
});

@Component({
    selector: 'fdp-test-reative-fdp-form-group',
    template: `
        <fdp-form-group [multiLayout]="true" [formGroup]="form1" [object]="formData">
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
                    [lookupKey]="'paymetMethod'"
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
    `
})
class TestRadioGroupReactiveFdpGroup {
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

    paymentMethods: object[] = [
        new Paymet('citi debit', 'CITI'),
        new Paymet('hdfc debit', 'HDFC'),
        new Paymet('icici credit', 'ICICI'),
        new Paymet('paytm wallet', 'Paytm'),
        new Paymet('cod', 'COD')
    ];

    form1 = new FormGroup({
        sizeOrdered: new FormControl('5')
    });

    formData = { pizzaBrand: 'Pizza Hut', season: 'winter' };
}

describe('Radio Group Test with Reactive fdp-form-group', () => {
    let component: TestRadioGroupReactiveFdpGroup;
    let fixture: ComponentFixture<TestRadioGroupReactiveFdpGroup>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FdpFormGroupModule, FormModule, PlatformRadioGroupModule, FormsModule, ReactiveFormsModule],
            declarations: [TestRadioGroupReactiveFdpGroup, RadioGroupComponent, RadioButtonComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestRadioGroupReactiveFdpGroup);
        component = fixture.componentInstance;
        fixture.detectChanges();
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
        expect(component.form1.controls.sizeOrdered.value).toEqual('5');

        const fdradiobuttonsElem = fixture.debugElement.queryAll(By.css('fd-radio-button'));

        fdradiobuttonsElem[0].nativeElement.click();
        fixture.detectChanges();
        expect(component.form1.controls.pizzaBrand.value).toEqual('Dominos');

        fdradiobuttonsElem[1].nativeElement.click();
        fixture.detectChanges();
        expect(component.form1.controls.pizzaBrand.value).toEqual('Pizza Hut');

        fdradiobuttonsElem[2].nativeElement.click();
        fixture.detectChanges();
        expect(component.form1.controls.pizzaBrand.value).toEqual('Papa Johns');

        fdradiobuttonsElem[3].nativeElement.click();
        fixture.detectChanges();
        expect(component.form1.controls.sizeOrdered.value).toEqual('5');

        fdradiobuttonsElem[4].nativeElement.click();
        fixture.detectChanges();
        expect(component.form1.controls.sizeOrdered.value).toEqual('8');

        fdradiobuttonsElem[5].nativeElement.click();
        fixture.detectChanges();
        expect(component.form1.controls.sizeOrdered.value).toEqual('12');
    });

    it('should be able to select radio, created from list of selectItem Objects', async () => {
        await wait(fixture);
        fixture.detectChanges();

        const fdradiobuttonsElem = fixture.debugElement.queryAll(By.css('fd-radio-button'));

        fdradiobuttonsElem[6].nativeElement.click();
        fixture.detectChanges();
        expect(component.form1.controls.deliver.value).toEqual('home');

        fdradiobuttonsElem[7].nativeElement.click();
        fixture.detectChanges();
        expect(component.form1.controls.deliver.value).toEqual('office');

        // disabled radio
        fdradiobuttonsElem[8].nativeElement.click();
        fixture.detectChanges();
        expect(component.form1.controls.deliver.value).toEqual('office');
    });

    it('should be able to select radio,for any type of Objects using lookupKey and displayKey', async () => {
        await wait(fixture);
        fixture.detectChanges();

        const fdradiobuttonsElem = fixture.debugElement.queryAll(By.css('fd-radio-button'));

        fdradiobuttonsElem[9].nativeElement.click();
        fixture.detectChanges();
        expect(component.form1.controls.payment.value).toEqual('citi debit');

        fdradiobuttonsElem[10].nativeElement.click();
        fixture.detectChanges();
        expect(component.form1.controls.payment.value).toEqual('hdfc debit');

        fdradiobuttonsElem[11].nativeElement.click();
        fixture.detectChanges();
        expect(component.form1.controls.payment.value).toEqual('icici credit');

        fdradiobuttonsElem[12].nativeElement.click();
        fixture.detectChanges();
        expect(component.form1.controls.payment.value).toEqual('paytm wallet');

        fdradiobuttonsElem[13].nativeElement.click();
        fixture.detectChanges();
        expect(component.form1.controls.payment.value).toEqual('cod');
    });

    it('should be able to select radio for content projected radios', async () => {
        await wait(fixture);
        fixture.detectChanges();

        expect(component.form1.controls.season.value).toEqual('winter');

        const fdradiobuttonsElem = fixture.debugElement.queryAll(By.css('fd-radio-button'));

        fdradiobuttonsElem[14].nativeElement.click();
        fixture.detectChanges();
        expect(component.form1.controls.season.value).toEqual('winter');

        fdradiobuttonsElem[15].nativeElement.click();
        fixture.detectChanges();
        expect(component.form1.controls.season.value).toEqual('spring');

        fdradiobuttonsElem[16].nativeElement.click();
        fixture.detectChanges();
        expect(component.form1.controls.season.value).toEqual('summer');

        fdradiobuttonsElem[17].nativeElement.click();
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
        <fdp-form-group [multiLayout]="true">
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
                    [lookupKey]="'paymetMethod'"
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
    `
})
class TestRadioGroupTemplateDrivenFdpGroup {
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

    paymentMethods: object[] = [
        new Paymet('citi debit', 'CITI'),
        new Paymet('hdfc debit', 'HDFC'),
        new Paymet('icici credit', 'ICICI'),
        new Paymet('paytm wallet', 'Paytm'),
        new Paymet('cod', 'COD')
    ];

    sizeOrdered = '5';
    favPizzaBrand = 'Pizza Hut';
    favDeliverMethod = '';
    favPaymentMethod = '';
    favSeason = 'winter';
}

describe('Radio Group Test with Template Driven fdp-form-group', () => {
    let component: TestRadioGroupTemplateDrivenFdpGroup;
    let fixture: ComponentFixture<TestRadioGroupTemplateDrivenFdpGroup>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FdpFormGroupModule, FormModule, PlatformRadioGroupModule, FormsModule, ReactiveFormsModule],
            declarations: [TestRadioGroupTemplateDrivenFdpGroup, RadioGroupComponent, RadioButtonComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestRadioGroupTemplateDrivenFdpGroup);
        component = fixture.componentInstance;
        fixture.detectChanges();
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

        const fdradiobuttonsElem = fixture.debugElement.queryAll(By.css('fd-radio-button'));

        fdradiobuttonsElem[0].nativeElement.click();
        fixture.detectChanges();
        expect(component.favPizzaBrand).toEqual('Dominos');

        fdradiobuttonsElem[1].nativeElement.click();
        fixture.detectChanges();
        expect(component.favPizzaBrand).toEqual('Pizza Hut');

        fdradiobuttonsElem[2].nativeElement.click();
        fixture.detectChanges();
        expect(component.favPizzaBrand).toEqual('Papa Johns');

        fdradiobuttonsElem[3].nativeElement.click();
        fixture.detectChanges();
        expect(component.sizeOrdered).toEqual('5');

        fdradiobuttonsElem[4].nativeElement.click();
        fixture.detectChanges();
        expect(component.sizeOrdered).toEqual('8');

        fdradiobuttonsElem[5].nativeElement.click();
        fixture.detectChanges();
        expect(component.sizeOrdered).toEqual('12');
    });

    it('should be able to select radio, created from list of selectItem Objects', async () => {
        await wait(fixture);
        fixture.detectChanges();

        const fdradiobuttonsElem = fixture.debugElement.queryAll(By.css('fd-radio-button'));

        fdradiobuttonsElem[6].nativeElement.click();
        fixture.detectChanges();
        expect(component.favDeliverMethod).toEqual('home');

        fdradiobuttonsElem[7].nativeElement.click();
        fixture.detectChanges();
        expect(component.favDeliverMethod).toEqual('office');

        // disabled radio
        fdradiobuttonsElem[8].nativeElement.click();
        fixture.detectChanges();
        expect(component.favDeliverMethod).toEqual('office');
    });

    it('should be able to select radio,for any type of Objects using lookupKey and displayKey', async () => {
        await wait(fixture);
        fixture.detectChanges();

        const fdradiobuttonsElem = fixture.debugElement.queryAll(By.css('fd-radio-button'));

        fdradiobuttonsElem[9].nativeElement.click();
        fixture.detectChanges();
        expect(component.favPaymentMethod).toEqual('citi debit');

        fdradiobuttonsElem[10].nativeElement.click();
        fixture.detectChanges();
        expect(component.favPaymentMethod).toEqual('hdfc debit');

        fdradiobuttonsElem[11].nativeElement.click();
        fixture.detectChanges();
        expect(component.favPaymentMethod).toEqual('icici credit');

        fdradiobuttonsElem[12].nativeElement.click();
        fixture.detectChanges();
        expect(component.favPaymentMethod).toEqual('paytm wallet');

        fdradiobuttonsElem[13].nativeElement.click();
        fixture.detectChanges();
        expect(component.favPaymentMethod).toEqual('cod');
    });

    it('should be able to select radio for content projected radios', async () => {
        await wait(fixture);
        fixture.detectChanges();

        expect(component.favSeason).toEqual('winter');

        const fdradiobuttonsElem = fixture.debugElement.queryAll(By.css('fd-radio-button'));

        fdradiobuttonsElem[14].nativeElement.click();
        fixture.detectChanges();
        expect(component.favSeason).toEqual('winter');

        fdradiobuttonsElem[15].nativeElement.click();
        fixture.detectChanges();
        expect(component.favSeason).toEqual('spring');

        fdradiobuttonsElem[16].nativeElement.click();
        fixture.detectChanges();
        expect(component.favSeason).toEqual('summer');

        fdradiobuttonsElem[17].nativeElement.click();
        fixture.detectChanges();
        expect(component.favSeason).toEqual('autumn');
    });
});

class DeliveryMethod implements SelectItem {
    constructor(public label: string, public value: string, public disabled: boolean) {}
}

class Paymet {
    constructor(public paymetMethod: string, public bank: string) {}
}
