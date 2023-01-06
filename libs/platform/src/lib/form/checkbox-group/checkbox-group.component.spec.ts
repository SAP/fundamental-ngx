import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component, ViewChildren, QueryList } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { FormModule } from '@fundamental-ngx/core/form';
import { SelectItem } from '@fundamental-ngx/platform/shared';
import { FdpFormGroupModule } from './../form-group/fdp-form.module';
import { CheckboxGroupComponent } from './checkbox-group.component';
import { PlatformCheckboxGroupModule } from './checkbox-group.module';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { PlatformCheckboxModule } from '../checkbox/checkbox.module';
import { runValueAccessorTests } from 'ngx-cva-test-suite';

@Component({
    selector: 'fdp-cbg-reactive-test',
    template: `
        <fdp-form-group [formGroup]="form1" [object]="formData">
            <fdp-form-field #fl1 [id]="'phones'" [label]="'Phones interested in:'" zone="zLeft" rank="1">
                <fdp-checkbox-group
                    [list]="phoneslist"
                    [name]="'brands'"
                    [formControl]="fl1.formControl"
                ></fdp-checkbox-group>
            </fdp-form-field>

            <fdp-form-field #fl2 [id]="'visited'" [label]="'Country visited: '" zone="zLeft" rank="1">
                <fdp-checkbox-group
                    [list]="countryVisited"
                    [name]="'visited'"
                    [formControl]="fl2.formControl"
                ></fdp-checkbox-group>
            </fdp-form-field>

            <fdp-form-field #fl3 [id]="'hobbies'" [label]="'My Hobbies:'" zone="zLeft" rank="1">
                <fdp-checkbox-group [name]="'hobby'" [formControl]="fl3.formControl">
                    <fdp-checkbox [values]="{ trueValue: 'cooking' }" [label]="'Cooking'"></fdp-checkbox>
                    <fdp-checkbox [values]="{ trueValue: 'painting' }" [label]="'Painting'"></fdp-checkbox>
                    <fdp-checkbox [values]="{ trueValue: 'coding' }" [label]="'Coding'"></fdp-checkbox>
                    <fdp-checkbox [values]="{ trueValue: 'gardening' }" [label]="'Gardening'"></fdp-checkbox>
                </fdp-checkbox-group>
            </fdp-form-field>

            <fdp-form-field #fl4 [id]="'language'" [label]="'Languages Known: '" zone="zLeft" rank="1">
                <fdp-checkbox-group
                    [list]="languages"
                    [name]="'language'"
                    [formControl]="fl4.formControl"
                ></fdp-checkbox-group>
            </fdp-form-field>

            <fdp-form-field #fl5 [id]="'fruits'" [label]="'Fruits:'" zone="zLeft" rank="1">
                <fdp-checkbox-group [name]="'fruits'" [formControl]="fl5.formControl">
                    <fdp-checkbox [values]="{ trueValue: 'apple' }" [label]="'Apple'" [disabled]="true"></fdp-checkbox>
                    <fdp-checkbox [values]="{ trueValue: 'banana' }" [label]="'Banana'"></fdp-checkbox>
                    <fdp-checkbox [values]="{ trueValue: 'guava' }" [label]="'Guava'" [disabled]="true"></fdp-checkbox>
                    <fdp-checkbox [values]="{ trueValue: 'papaya' }" [label]="'Papaya'"></fdp-checkbox>
                </fdp-checkbox-group>
            </fdp-form-field>

            <fdp-form-field #fl6 [id]="'items'" [label]="'Purchased Items: '" zone="zLeft" rank="1">
                <fdp-checkbox-group
                    [list]="invoiceItems"
                    [name]="'items'"
                    [lookupKey]="'item'"
                    [displayKey]="'itemType'"
                    [formControl]="fl6.formControl"
                ></fdp-checkbox-group>
            </fdp-form-field>
        </fdp-form-group>
    `
})
class TestReactiveCheckboxGroupComponent {
    phoneslist: string[] = ['Samsung', 'Apple', 'OnePlus', 'Redmi'];
    countryVisited = [new Country('Australia', 'Australia'), new Country('India', 'India'), new Country('USA', 'USA')];

    languages = [
        new LanguageKnown('Java', 'java', false),
        new LanguageKnown('Javascript', 'javascript', true),
        new LanguageKnown('Python', 'python', false),
        new LanguageKnown('GoLang', 'go', true)
    ];

    invoiceItems = [
        new Item('1', 'coffee', 'Coffee', 100, 12),
        new Item('2', 'pen', 'Pen', 200, 5),
        new Item('3', 'chair', 'Office chair', 50, 5530)
    ];

    form1 = new FormGroup({
        items: new FormControl(),
        phones: new FormControl(),
        visited: new FormControl(),
        hobbies: new FormControl()
    });
    formData = { phones: ['Samsung', 'OnePlus'], visited: ['India', 'USA'], hobbies: ['coding', 'gardening'] };

    @ViewChildren(CheckboxComponent)
    checkboxGroups: QueryList<CheckboxGroupComponent>;
}

describe('CheckboxGroup component Reactive Form Test', () => {
    let host: TestReactiveCheckboxGroupComponent;
    let fixture: ComponentFixture<TestReactiveCheckboxGroupComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                FdpFormGroupModule,
                FormModule,
                PlatformCheckboxGroupModule,
                PlatformCheckboxModule,
                FormsModule,
                ReactiveFormsModule
            ],
            declarations: [TestReactiveCheckboxGroupComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestReactiveCheckboxGroupComponent);
        host = fixture.componentInstance;
        fixture.detectChanges();
    });

    async function wait(componentFixture: ComponentFixture<any>): Promise<void> {
        componentFixture.detectChanges();
        await componentFixture.whenStable();
    }

    it('should create', () => {
        expect(host).toBeTruthy();
    });

    it('should create checkboxes from list of given string values', async () => {
        await wait(fixture);
        const fdpCheckboxElem = fixture.debugElement.queryAll(By.css('fd-checkbox input'));

        // pre-select test
        expect(host.form1.controls.phones.value).toEqual(['Samsung', 'OnePlus']);

        await wait(fixture);

        // select checkbox on click
        fdpCheckboxElem[1].nativeElement.click();
        await wait(fixture);

        fdpCheckboxElem[3].nativeElement.click();
        await wait(fixture);

        expect(host.form1.controls.phones.value).toEqual(['Samsung', 'OnePlus', 'Apple', 'Redmi']);

        // de-select checked checkbox on click
        fdpCheckboxElem[3].nativeElement.click();
        await wait(fixture);

        fdpCheckboxElem[2].nativeElement.click();
        await wait(fixture);

        expect(host.form1.controls.phones.value).toEqual(['Samsung', 'Apple']);

        fdpCheckboxElem[0].nativeElement.click();
        await wait(fixture);

        fdpCheckboxElem[1].nativeElement.click();
        await wait(fixture);

        expect(host.form1.controls.phones.value).toEqual([]);
    });

    // test cases for checbox group created from list of selectItem Objects.
    it('should create checkboxes from list of given selectItem Objects', async () => {
        await wait(fixture);
        const fdpCheckboxElem = fixture.debugElement.queryAll(By.css('.fd-checkbox__label'));

        // pre-select test
        expect(host.form1.controls.visited.value).toEqual(['India', 'USA']);

        // select checkbox on click
        fdpCheckboxElem[4].nativeElement.click();
        await wait(fixture);

        expect(host.form1.controls.visited.value).toEqual(['India', 'USA', 'Australia']);

        // de-select checked checkbox on click
        fdpCheckboxElem[5].nativeElement.click();
        await wait(fixture);

        fdpCheckboxElem[6].nativeElement.click();
        await wait(fixture);

        expect(host.form1.controls.visited.value).toEqual(['Australia']);
    });

    // checkbox group created from passed checkboxes.
    it('should create checkbox group from passed checkboxes', async () => {
        await wait(fixture);
        const fdpCheckboxElem = fixture.debugElement.queryAll(By.css('.fd-checkbox__label'));

        // pre-select test
        expect(host.form1.controls.hobbies.value).toEqual(['coding', 'gardening']);

        // select checkbox on click
        fdpCheckboxElem[7].nativeElement.click();
        await wait(fixture);

        fdpCheckboxElem[8].nativeElement.click();
        await wait(fixture);

        expect(host.form1.controls.hobbies.value).toEqual(['coding', 'gardening', 'cooking', 'painting']);

        // de-select checked checkbox on click
        fdpCheckboxElem[9].nativeElement.click();
        await wait(fixture);

        fdpCheckboxElem[10].nativeElement.click();
        await wait(fixture);

        expect(host.form1.controls.hobbies.value).toEqual(['cooking', 'painting']);
    });

    it('should create checkbox group with enabled and disabled checkboxes from SelectItem object', async () => {
        await wait(fixture);
        fixture.detectChanges();

        const fdpCheckboxElem = fixture.debugElement.queryAll(By.css('fdp-checkbox'));
        const input11: HTMLInputElement = fdpCheckboxElem[11].nativeElement.querySelector('input[type="checkbox"');
        const input12: HTMLInputElement = fdpCheckboxElem[12].nativeElement.querySelector('input[type="checkbox"');
        const input13: HTMLInputElement = fdpCheckboxElem[13].nativeElement.querySelector('input[type="checkbox"');
        const input14: HTMLInputElement = fdpCheckboxElem[14].nativeElement.querySelector('input[type="checkbox"');
        expect(input11.hasAttribute('disabled')).toBe(false);
        expect(input12.hasAttribute('disabled')).toBe(true);
        expect(input13.hasAttribute('disabled')).toBe(false);
        expect(input14.hasAttribute('disabled')).toBe(true);
    });

    it('should create checkbox group with enabled and disabled checkboxes from passed checkboxes', async () => {
        await wait(fixture);
        fixture.detectChanges();

        const fdpCheckboxElem = fixture.debugElement.queryAll(By.css('fdp-checkbox'));
        const input15: HTMLInputElement = fdpCheckboxElem[15].nativeElement.querySelector('input[type="checkbox"');
        const input16: HTMLInputElement = fdpCheckboxElem[16].nativeElement.querySelector('input[type="checkbox"');
        const input17: HTMLInputElement = fdpCheckboxElem[17].nativeElement.querySelector('input[type="checkbox"');
        const input18: HTMLInputElement = fdpCheckboxElem[18].nativeElement.querySelector('input[type="checkbox"');
        expect(input15.hasAttribute('disabled')).toBe(true);
        expect(input16.hasAttribute('disabled')).toBe(false);
        expect(input17.hasAttribute('disabled')).toBe(true);
        expect(input18.hasAttribute('disabled')).toBe(false);
    });

    it('should create checkboxes with any type of objects with lookupKey and displayKey given', async () => {
        await wait(fixture);

        const fdpCheckboxElem = fixture.debugElement.queryAll(By.css('.fd-checkbox__label'));

        fdpCheckboxElem[19].nativeElement.click();
        await wait(fixture);

        fdpCheckboxElem[20].nativeElement.click();
        await wait(fixture);

        fdpCheckboxElem[21].nativeElement.click();
        await wait(fixture);

        expect(host.form1.controls.items.value?.sort()).toEqual(['chair', 'coffee', 'pen']);

        // uncheck checkbox 20
        fdpCheckboxElem[20].nativeElement.click();
        await wait(fixture);

        expect(host.form1.controls.items.value?.sort()).toEqual(['chair', 'coffee']);
    });
});

@Component({
    selector: 'fdp-cbg-template-driven-test',
    template: `
        <fdp-form-group>
            <fdp-form-field [id]="'phonest'" [label]="'Phones interested in:'" zone="zLeft" rank="1">
                <fdp-checkbox-group [list]="phoneslist" [name]="'brands'" [(ngModel)]="phones"></fdp-checkbox-group>
            </fdp-form-field>

            <fdp-form-field [id]="'visitedt'" [label]="'Country visited: '" zone="zLeft" rank="1">
                <fdp-checkbox-group
                    [list]="countryVisited"
                    [name]="'visited'"
                    [(ngModel)]="visited"
                ></fdp-checkbox-group>
            </fdp-form-field>

            <fdp-form-field [id]="'hobbiest'" [label]="'My Hobbies:'" zone="zLeft" rank="1">
                <fdp-checkbox-group [name]="'hobby'" [(ngModel)]="hobbies">
                    <fdp-checkbox [values]="{ trueValue: 'cooking' }" [label]="'Cooking'"></fdp-checkbox>
                    <fdp-checkbox [values]="{ trueValue: 'painting' }" [label]="'Painting'"></fdp-checkbox>
                    <fdp-checkbox [values]="{ trueValue: 'coding' }" [label]="'Coding'"></fdp-checkbox>
                    <fdp-checkbox [values]="{ trueValue: 'gardening' }" [label]="'Gardening'"></fdp-checkbox>
                </fdp-checkbox-group>
            </fdp-form-field>

            <fdp-form-field [id]="'languaget'" [label]="'Languages Known: '" zone="zLeft" rank="1">
                <fdp-checkbox-group [list]="languages" [name]="'language'" [(ngModel)]="language"></fdp-checkbox-group>
            </fdp-form-field>

            <fdp-form-field [id]="'fruitst'" [label]="'Fruits:'" zone="zLeft" rank="1">
                <fdp-checkbox-group [name]="'fruits'" [(ngModel)]="fruits">
                    <fdp-checkbox [values]="{ trueValue: 'apple' }" [label]="'Apple'" [disabled]="true"></fdp-checkbox>
                    <fdp-checkbox [values]="{ trueValue: 'banana' }" [label]="'Banana'"></fdp-checkbox>
                    <fdp-checkbox [values]="{ trueValue: 'guava' }" [label]="'Guava'" [disabled]="true"></fdp-checkbox>
                    <fdp-checkbox [values]="{ trueValue: 'papaya' }" [label]="'Papaya'"></fdp-checkbox>
                </fdp-checkbox-group>
            </fdp-form-field>

            <fdp-form-field [id]="'itemst'" [label]="'Purchased Items: '" zone="zLeft" rank="1">
                <fdp-checkbox-group
                    [list]="invoiceItems"
                    [name]="'items'"
                    [lookupKey]="'item'"
                    [displayKey]="'itemType'"
                    [(ngModel)]="itemsData"
                ></fdp-checkbox-group>
            </fdp-form-field>
        </fdp-form-group>
    `
})
class TestTemplateDrivenCheckboxGroupComponent {
    phoneslist: string[] = ['Samsung', 'Apple', 'OnePlus', 'Redmi'];
    countryVisited = [new Country('Australia', 'Australia'), new Country('India', 'India'), new Country('USA', 'USA')];
    phones = ['Samsung', 'OnePlus'];
    visited = ['India', 'USA'];
    hobbies = ['coding', 'gardening'];

    fruits = '';
    languages = [
        new LanguageKnown('Java', 'java', false),
        new LanguageKnown('Javascript', 'javascript', true),
        new LanguageKnown('Python', 'python', false),
        new LanguageKnown('GoLang', 'go', true)
    ];
    language: LanguageKnown;

    invoiceItems = [
        new Item('1', 'coffee', 'Coffee', 100, 12),
        new Item('2', 'pen', 'Pen', 200, 5),
        new Item('3', 'chair', 'Office chair', 50, 5530)
    ];

    itemsData = ['pen'];
}

describe('Checkbox Group Component Template driven Form Tests', () => {
    let host: TestTemplateDrivenCheckboxGroupComponent;
    let fixture: ComponentFixture<TestTemplateDrivenCheckboxGroupComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [FdpFormGroupModule, FormModule, PlatformCheckboxGroupModule, PlatformCheckboxModule, FormsModule],
            declarations: [TestTemplateDrivenCheckboxGroupComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestTemplateDrivenCheckboxGroupComponent);
        host = fixture.componentInstance;
        fixture.detectChanges();
    });

    async function wait(componentFixture: ComponentFixture<any>): Promise<void> {
        componentFixture.detectChanges();
        await componentFixture.whenStable();
    }

    it('should create', () => {
        expect(host).toBeTruthy();
    });

    it('should create checkboxes from list of given string values', async () => {
        await wait(fixture);
        const fdpCheckboxElem = fixture.debugElement.queryAll(By.css('.fd-checkbox__label'));

        // pre-select test
        await wait(fixture);

        expect(host.phones).toEqual(['Samsung', 'OnePlus']);

        // select checkbox on click
        fdpCheckboxElem[1].nativeElement.click();
        await wait(fixture);

        fdpCheckboxElem[3].nativeElement.click();
        fixture.detectChanges();

        expect(host.phones.sort()).toEqual(['Apple', 'OnePlus', 'Redmi', 'Samsung']);

        // de-select checked checkbox on click
        fdpCheckboxElem[3].nativeElement.click();
        await wait(fixture);

        fdpCheckboxElem[2].nativeElement.click();
        await wait(fixture);

        expect(host.phones.sort()).toEqual(['Apple', 'Samsung']);

        fdpCheckboxElem[0].nativeElement.click();
        await wait(fixture);

        fdpCheckboxElem[1].nativeElement.click();
        await wait(fixture);

        expect(host.phones).toEqual([]);
    });

    // test cases for checbox group created from list of selectItem Objects.
    it('should create checkboxes from list of given selectItem Objects', async () => {
        await wait(fixture);
        const fdpCheckboxElem = fixture.debugElement.queryAll(By.css('.fd-checkbox__label'));
        await wait(fixture);

        // pre-select test
        expect(host.visited).toEqual(['India', 'USA']);

        // select checkbox on click
        fdpCheckboxElem[4].nativeElement.click();
        await wait(fixture);

        expect(host.visited.sort()).toEqual(['Australia', 'India', 'USA']);

        // de-select checked checkbox on click
        fdpCheckboxElem[5].nativeElement.click();
        await wait(fixture);

        fdpCheckboxElem[6].nativeElement.click();
        await wait(fixture);

        expect(host.visited).toEqual(['Australia']);

        fdpCheckboxElem[4].nativeElement.click();
        await wait(fixture);

        expect(host.visited).toEqual([]);
    });

    // checkbox group created from passed checkboxes.
    it('should create checkbox group from passed checkboxes', async () => {
        await wait(fixture);
        const fdpCheckboxElem = fixture.debugElement.queryAll(By.css('.fd-checkbox__label'));
        await wait(fixture);
        // pre-select test
        expect(host.hobbies.sort()).toEqual(['coding', 'gardening']);

        // select checkbox on click
        fdpCheckboxElem[7].nativeElement.click();
        await wait(fixture);

        fdpCheckboxElem[8].nativeElement.click();
        await wait(fixture);

        expect(host.hobbies.sort()).toEqual(['coding', 'cooking', 'gardening', 'painting']);

        // de-select checked checkbox on click
        fdpCheckboxElem[9].nativeElement.click();
        await wait(fixture);

        fdpCheckboxElem[10].nativeElement.click();
        await wait(fixture);

        expect(host.hobbies.sort()).toEqual(['cooking', 'painting']);
    });

    it('should create checkbox group with enabled and disabled checkboxes from SelectItem object', async () => {
        await wait(fixture);
        fixture.detectChanges();

        const fdpCheckboxElem = fixture.debugElement.queryAll(By.css('fdp-checkbox'));
        const input11: HTMLInputElement = fdpCheckboxElem[11].nativeElement.querySelector('input[type="checkbox"');
        const input12: HTMLInputElement = fdpCheckboxElem[12].nativeElement.querySelector('input[type="checkbox"');
        const input13: HTMLInputElement = fdpCheckboxElem[13].nativeElement.querySelector('input[type="checkbox"');
        const input14: HTMLInputElement = fdpCheckboxElem[14].nativeElement.querySelector('input[type="checkbox"');
        expect(input11.hasAttribute('disabled')).toBe(false);
        expect(input12.hasAttribute('disabled')).toBe(true);
        expect(input13.hasAttribute('disabled')).toBe(false);
        expect(input14.hasAttribute('disabled')).toBe(true);
    });

    it('should create checkbox group with enabled and disabled checkboxes from passed checkboxes', async () => {
        await wait(fixture);
        fixture.detectChanges();

        const fdpCheckboxElem = fixture.debugElement.queryAll(By.css('fdp-checkbox'));
        const input15: HTMLInputElement = fdpCheckboxElem[15].nativeElement.querySelector('input[type="checkbox"');
        const input16: HTMLInputElement = fdpCheckboxElem[16].nativeElement.querySelector('input[type="checkbox"');
        const input17: HTMLInputElement = fdpCheckboxElem[17].nativeElement.querySelector('input[type="checkbox"');
        const input18: HTMLInputElement = fdpCheckboxElem[18].nativeElement.querySelector('input[type="checkbox"');
        expect(input15.hasAttribute('disabled')).toBe(true);
        expect(input16.hasAttribute('disabled')).toBe(false);
        expect(input17.hasAttribute('disabled')).toBe(true);
        expect(input18.hasAttribute('disabled')).toBe(false);
    });

    it('should create checkboxes with any type of objects with lookupKey and displayKey given', async () => {
        await wait(fixture);

        const fdpCheckboxElem = fixture.debugElement.queryAll(By.css('.fd-checkbox__label'));
        await wait(fixture);

        expect(host.itemsData.sort()).toEqual(['pen']);

        fdpCheckboxElem[19].nativeElement.click();
        await wait(fixture);

        fdpCheckboxElem[20].nativeElement.click();
        await wait(fixture);

        fdpCheckboxElem[21].nativeElement.click();
        await wait(fixture);

        expect(host.itemsData.sort()).toEqual(['chair', 'coffee']);

        // uncheck checkbox 21
        fdpCheckboxElem[19].nativeElement.click();
        await wait(fixture);

        expect(host.itemsData.sort()).toEqual(['chair']);
    });
});

@Component({
    selector: 'fdp-cbg-reactive-formgroup-data',
    template: `
        <fdp-form-group [formGroup]="form2">
            <fdp-form-field #fl1 [id]="'phones'" [label]="'Phones interested in:'" zone="zLeft" rank="1">
                <fdp-checkbox-group [list]="phoneslist" [name]="'brands'" formControlName="phones"></fdp-checkbox-group>
            </fdp-form-field>

            <fdp-form-field #fl2 [id]="'visited'" [label]="'Country visited: '" zone="zLeft" rank="1">
                <fdp-checkbox-group
                    [list]="countryVisited"
                    [name]="'visited'"
                    formControlName="visited"
                ></fdp-checkbox-group>
            </fdp-form-field>

            <fdp-form-field #fl3 [id]="'hobbies'" [label]="'My Hobbies:'" zone="zLeft" rank="1">
                <fdp-checkbox-group [name]="'hobby'" formControlName="hobbies">
                    <fdp-checkbox [values]="{ trueValue: 'cooking' }" [label]="'Cooking'"></fdp-checkbox>
                    <fdp-checkbox [values]="{ trueValue: 'painting' }" [label]="'Painting'"></fdp-checkbox>
                    <fdp-checkbox [values]="{ trueValue: 'coding' }" [label]="'Coding'"></fdp-checkbox>
                    <fdp-checkbox [values]="{ trueValue: 'gardening' }" [label]="'Gardening'"></fdp-checkbox>
                </fdp-checkbox-group>
            </fdp-form-field>

            <fdp-form-field #fl4 [id]="'language'" [label]="'Languages Known: '" zone="zLeft" rank="1">
                <fdp-checkbox-group
                    [list]="languages"
                    [name]="'language'"
                    formControlName="languages"
                ></fdp-checkbox-group>
            </fdp-form-field>

            <fdp-form-field #fl5 [id]="'fruits'" [label]="'Fruits:'" zone="zLeft" rank="1">
                <fdp-checkbox-group [name]="'fruits'" formControlName="fruits">
                    <fdp-checkbox [values]="{ trueValue: 'apple' }" [label]="'Apple'" [disabled]="true"></fdp-checkbox>
                    <fdp-checkbox [values]="{ trueValue: 'banana' }" [label]="'Banana'"></fdp-checkbox>
                    <fdp-checkbox [values]="{ trueValue: 'guava' }" [label]="'Guava'" [disabled]="true"></fdp-checkbox>
                    <fdp-checkbox [values]="{ trueValue: 'papaya' }" [label]="'Papaya'"></fdp-checkbox>
                </fdp-checkbox-group>
            </fdp-form-field>
        </fdp-form-group>
    `
})
class TestReactiveCheckboxGroupWithDataComponent {
    phoneslist: string[] = ['Samsung', 'Apple', 'OnePlus', 'Redmi'];
    countryVisited = [new Country('Australia', 'Australia'), new Country('India', 'India'), new Country('USA', 'USA')];

    languages = [
        new LanguageKnown('Java', 'java', false),
        new LanguageKnown('Javascript', 'javascript', true),
        new LanguageKnown('Python', 'python', false),
        new LanguageKnown('GoLang', 'go', true)
    ];

    form2 = new FormGroup({
        phones: new FormControl<string[]>(['Samsung', 'Apple']),
        visited: new FormControl<string[]>(['India', 'Australia']),
        hobbies: new FormControl<string[]>(['coding', 'gardening']),
        languages: new FormControl<string[]>(['python']),
        fruits: new FormControl<string[]>(['banana', 'guava'])
    });

    @ViewChildren(CheckboxComponent)
    checkboxGroups: QueryList<CheckboxGroupComponent>;
}

describe('CheckboxGroup component Reactive Form Test With FormGroup Data', () => {
    let host: TestReactiveCheckboxGroupWithDataComponent;
    let fixture: ComponentFixture<TestReactiveCheckboxGroupWithDataComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                FdpFormGroupModule,
                FormModule,
                PlatformCheckboxGroupModule,
                PlatformCheckboxModule,
                FormsModule,
                ReactiveFormsModule
            ],
            declarations: [TestReactiveCheckboxGroupWithDataComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestReactiveCheckboxGroupWithDataComponent);
        host = fixture.componentInstance;
        fixture.detectChanges();
    });

    async function wait(componentFixture: ComponentFixture<any>): Promise<void> {
        componentFixture.detectChanges();
        await componentFixture.whenStable();
    }

    it('should create', () => {
        expect(host).toBeTruthy();
    });

    it('should create checkboxes from list of given string values', async () => {
        await wait(fixture);
        const fdpCheckboxElem = fixture.debugElement.queryAll(By.css('.fd-checkbox__label'));

        // pre-select test
        expect(host.form2.controls.phones.value?.sort()).toEqual(['Apple', 'Samsung']);

        await wait(fixture);

        // select checkbox on click
        fdpCheckboxElem[1].nativeElement.click();
        await wait(fixture);

        fdpCheckboxElem[3].nativeElement.click();
        await wait(fixture);

        expect(host.form2.controls.phones.value?.sort()).toEqual(['Redmi', 'Samsung']);

        // de-select checked checkbox on click
        fdpCheckboxElem[3].nativeElement.click();
        await wait(fixture);

        fdpCheckboxElem[2].nativeElement.click();
        await wait(fixture);

        expect(host.form2.controls.phones.value?.sort()).toEqual(['OnePlus', 'Samsung']);

        fdpCheckboxElem[0].nativeElement.click();
        await wait(fixture);

        fdpCheckboxElem[1].nativeElement.click();
        fixture.detectChanges();

        expect(host.form2.controls.phones.value?.sort()).toEqual(['Apple', 'OnePlus']);
    });

    // test cases for checbox group created from list of selectItem Objects.
    it('should create checkboxes from list of given selectItem Objects', async () => {
        await wait(fixture);
        const fdpCheckboxElem = fixture.debugElement.queryAll(By.css('.fd-checkbox__label'));

        // pre-select test
        expect(host.form2.controls.visited.value?.sort()).toEqual(['Australia', 'India']);

        await wait(fixture);

        // select checkbox on click
        fdpCheckboxElem[4].nativeElement.click();
        await wait(fixture);

        expect(host.form2.controls.visited.value?.sort()).toEqual(['India']);

        // de-select checked checkbox on click
        fdpCheckboxElem[5].nativeElement.click();
        await wait(fixture);

        fdpCheckboxElem[6].nativeElement.click();
        await wait(fixture);

        expect(host.form2.controls.visited.value).toEqual(['USA']);
    });

    // checkbox group created from passed checkboxes.
    it('should create checkbox group from passed checkboxes', async () => {
        await wait(fixture);
        const fdpCheckboxElem = fixture.debugElement.queryAll(By.css('.fd-checkbox__label'));

        // pre-select test
        expect(host.form2.controls.hobbies.value?.sort()).toEqual(['coding', 'gardening']);

        // select checkbox on click
        fdpCheckboxElem[7].nativeElement.click();
        await wait(fixture);

        fdpCheckboxElem[8].nativeElement.click();
        await wait(fixture);

        expect(host.form2.controls.hobbies.value?.sort()).toEqual(['coding', 'cooking', 'gardening', 'painting']);

        // de-select checked checkbox on click
        fdpCheckboxElem[9].nativeElement.click();
        await wait(fixture);

        fdpCheckboxElem[10].nativeElement.click();
        await wait(fixture);

        expect(host.form2.controls.hobbies.value?.sort()).toEqual(['cooking', 'painting']);
    });

    it('should create checkbox group with enabled and disabled checkboxes from SelectItem object', async () => {
        await wait(fixture);
        fixture.detectChanges();

        const fdpCheckboxElem = fixture.debugElement.queryAll(By.css('fdp-checkbox'));
        const input11: HTMLInputElement = fdpCheckboxElem[11].nativeElement.querySelector('input[type="checkbox"');
        const input12: HTMLInputElement = fdpCheckboxElem[12].nativeElement.querySelector('input[type="checkbox"');
        const input13: HTMLInputElement = fdpCheckboxElem[13].nativeElement.querySelector('input[type="checkbox"');
        const input14: HTMLInputElement = fdpCheckboxElem[14].nativeElement.querySelector('input[type="checkbox"');
        expect(input11.hasAttribute('disabled')).toBe(false);
        expect(input12.hasAttribute('disabled')).toBe(true);
        expect(input13.hasAttribute('disabled')).toBe(false);
        expect(input14.hasAttribute('disabled')).toBe(true);
    });

    it('should create checkbox group with enabled and disabled checkboxes from passed checkboxes', async () => {
        await wait(fixture);
        fixture.detectChanges();

        const fdpCheckboxElem = fixture.debugElement.queryAll(By.css('fdp-checkbox'));
        const input15: HTMLInputElement = fdpCheckboxElem[15].nativeElement.querySelector('input[type="checkbox"');
        const input16: HTMLInputElement = fdpCheckboxElem[16].nativeElement.querySelector('input[type="checkbox"');
        const input17: HTMLInputElement = fdpCheckboxElem[17].nativeElement.querySelector('input[type="checkbox"');
        const input18: HTMLInputElement = fdpCheckboxElem[18].nativeElement.querySelector('input[type="checkbox"');
        expect(input15.hasAttribute('disabled')).toBe(true);
        expect(input16.hasAttribute('disabled')).toBe(false);
        expect(input17.hasAttribute('disabled')).toBe(true);
        expect(input18.hasAttribute('disabled')).toBe(false);
    });
});

class Country implements SelectItem {
    constructor(public label: string, public value: string) {}
}

class LanguageKnown implements SelectItem {
    constructor(public label: string, public value: string, public disabled: boolean) {}
}

class Item {
    constructor(
        public itemId: string,
        public item: string,
        public itemType: string,
        public quantity: number,
        public rate: number
    ) {}
}

const CHECKBOX_GROUP_IDENTIFIER = 'platform-checkbox-group-unit-test';

runValueAccessorTests({
    component: CheckboxGroupComponent,
    name: 'Checkbox group',
    testModuleMetadata: {
        imports: [PlatformCheckboxGroupModule]
    },
    additionalSetup: (fixture, done) => {
        fixture.componentInstance.id = CHECKBOX_GROUP_IDENTIFIER;
        fixture.componentInstance.name = CHECKBOX_GROUP_IDENTIFIER;
        done();
    },
    supportsOnBlur: false,
    internalValueChangeSetter: null,
    getComponentValue: (fixture) => fixture.componentInstance.value,
    getValues: () => [['1'], ['1', '2'], ['1']],
    resetCustomValue: { value: [] }
});
