import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component, ViewChildren, QueryList } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { FormModule } from '@fundamental-ngx/core';
import { FdpFormGroupModule } from './../form-group/fdp-form.module';
import { CheckboxGroupComponent } from './checkbox-group.component';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { SelectItem } from '../../../domain/data-model';
import { PlatformCheckboxModule } from '../checkbox/checkbox.module';
import { By } from '@angular/platform-browser';

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
                    <fdp-checkbox [value]="'cooking'" [label]="'Cooking'"></fdp-checkbox>
                    <fdp-checkbox [value]="'painting'" [label]="'Painting'"></fdp-checkbox>
                    <fdp-checkbox [value]="'coding'" [label]="'Coding'"></fdp-checkbox>
                    <fdp-checkbox [value]="'gardening'" [label]="'Gardening'"></fdp-checkbox>
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
                    <fdp-checkbox [value]="'apple'" [label]="'Apple'" [disabled]="true"></fdp-checkbox>
                    <fdp-checkbox [value]="'banana'" [label]="'Banana'"></fdp-checkbox>
                    <fdp-checkbox [value]="'guava'" [label]="'Guava'" [disabled]="true"></fdp-checkbox>
                    <fdp-checkbox [value]="'papaya'" [label]="'Papaya'"></fdp-checkbox>
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
class TestReactiveCheckboxGroupComponnet {
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

    form1 = new FormGroup({});
    formData = { phones: ['Samsung', 'OnePlus'], visited: ['India', 'USA'], hobbies: ['coding', 'gardening'] };

    @ViewChildren(CheckboxComponent)
    checkboxGroups: QueryList<CheckboxGroupComponent>;
}

describe('CheckboxGroup component Reactive Form Test', () => {
    let host: TestReactiveCheckboxGroupComponnet;
    let fixture: ComponentFixture<TestReactiveCheckboxGroupComponnet>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [FdpFormGroupModule, FormModule, PlatformCheckboxModule, FormsModule, ReactiveFormsModule],
            declarations: [TestReactiveCheckboxGroupComponnet, CheckboxGroupComponent, CheckboxComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestReactiveCheckboxGroupComponnet);
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
        fixture.detectChanges();
        const fdpCheckboxElem = fixture.debugElement.queryAll(By.css('.fd-checkbox__label'));

        // pre-select test
        expect(host.form1.controls.phones.value).toEqual(['Samsung', 'OnePlus']);

        // select checkbox on click
        fdpCheckboxElem[1].nativeElement.click();
        await wait(fixture);
        fixture.detectChanges();

        fdpCheckboxElem[3].nativeElement.click();
        await wait(fixture);
        fixture.detectChanges();

        expect(host.form1.controls.phones.value).toEqual(['Samsung', 'OnePlus', 'Apple', 'Redmi']);

        // de-select checked checkbox on click
        fdpCheckboxElem[3].nativeElement.click();
        await wait(fixture);
        fixture.detectChanges();

        fdpCheckboxElem[2].nativeElement.click();
        await wait(fixture);
        fixture.detectChanges();

        expect(host.form1.controls.phones.value).toEqual(['Samsung', 'Apple']);

        fdpCheckboxElem[0].nativeElement.click();
        await wait(fixture);
        fixture.detectChanges();

        fdpCheckboxElem[1].nativeElement.click();
        fixture.detectChanges();

        expect(host.form1.controls.phones.value).toEqual([]);
    });

    // test cases for checbox group created from list of selectItem Objects.
    it('should create checkboxes from list of given selectItem Objects', async () => {
        await wait(fixture);
        fixture.detectChanges();
        const fdpCheckboxElem = fixture.debugElement.queryAll(By.css('.fd-checkbox__label'));

        // pre-select test
        expect(host.form1.controls.visited.value).toEqual(['India', 'USA']);

        // select checkbox on click
        fdpCheckboxElem[4].nativeElement.click();
        await wait(fixture);
        fixture.detectChanges();

        expect(host.form1.controls.visited.value).toEqual(['India', 'USA', 'Australia']);

        // de-select checked checkbox on click
        fdpCheckboxElem[5].nativeElement.click();
        await wait(fixture);
        fixture.detectChanges();

        fdpCheckboxElem[6].nativeElement.click();
        await wait(fixture);
        fixture.detectChanges();

        expect(host.form1.controls.visited.value).toEqual(['Australia']);
    });

    // checkbox group created from passed checkboxes.
    it('should create checkbox group from passed checkboxes', async () => {
        await wait(fixture);
        fixture.detectChanges();
        const fdpCheckboxElem = fixture.debugElement.queryAll(By.css('.fd-checkbox__label'));

        // pre-select test
        expect(host.form1.controls.hobbies.value).toEqual(['coding', 'gardening']);

        // select checkbox on click
        fdpCheckboxElem[7].nativeElement.click();
        await wait(fixture);
        fixture.detectChanges();

        fdpCheckboxElem[8].nativeElement.click();
        await wait(fixture);
        fixture.detectChanges();

        expect(host.form1.controls.hobbies.value).toEqual(['coding', 'gardening', 'cooking', 'painting']);

        // de-select checked checkbox on click
        fdpCheckboxElem[9].nativeElement.click();
        await wait(fixture);
        fixture.detectChanges();

        fdpCheckboxElem[10].nativeElement.click();
        await wait(fixture);
        fixture.detectChanges();

        expect(host.form1.controls.hobbies.value).toEqual(['cooking', 'painting']);
    });

    it('should create checkbox group with enabled and disabled checkboxes from SelectItem object', async () => {
        await wait(fixture);
        fixture.detectChanges();

        const fdpCheckboxElem = fixture.debugElement.queryAll(By.css('fdp-checkbox'));
        expect(fdpCheckboxElem[11].nativeElement.getAttribute('ng-reflect-is-disabled')).toEqual('false');
        expect(fdpCheckboxElem[12].nativeElement.getAttribute('ng-reflect-is-disabled')).toEqual('true');
        expect(fdpCheckboxElem[13].nativeElement.getAttribute('ng-reflect-is-disabled')).toEqual('false');
        expect(fdpCheckboxElem[14].nativeElement.getAttribute('ng-reflect-is-disabled')).toEqual('true');
    });

    it('should create checkbox group with enabled and disabled checkboxes from passed checkboxes', async () => {
        await wait(fixture);
        fixture.detectChanges();

        const fdpCheckboxElem = fixture.debugElement.queryAll(By.css('fdp-checkbox'));
        expect(fdpCheckboxElem[15].nativeElement.getAttribute('ng-reflect-is-disabled')).toEqual('true');
        expect(fdpCheckboxElem[16].nativeElement.getAttribute('ng-reflect-is-disabled')).toEqual('false');
        expect(fdpCheckboxElem[17].nativeElement.getAttribute('ng-reflect-is-disabled')).toEqual('true');
        expect(fdpCheckboxElem[18].nativeElement.getAttribute('ng-reflect-is-disabled')).toEqual('false');
    });

    it('should create checkboxes with any type of objects with lookupKey and displayKey given', async () => {
        await wait(fixture);
        fixture.detectChanges();

        const fdpCheckboxElem = fixture.debugElement.queryAll(By.css('.fd-checkbox__label'));

        fdpCheckboxElem[19].nativeElement.click();
        await wait(fixture);
        fixture.detectChanges();

        fdpCheckboxElem[20].nativeElement.click();
        await wait(fixture);
        fixture.detectChanges();

        fdpCheckboxElem[21].nativeElement.click();
        await wait(fixture);
        fixture.detectChanges();

        expect(host.form1.controls.items.value.sort()).toEqual(['chair', 'coffee', 'pen']);

        // uncheck checkbox 20
        fdpCheckboxElem[20].nativeElement.click();
        await wait(fixture);
        fixture.detectChanges();

        expect(host.form1.controls.items.value.sort()).toEqual(['chair', 'coffee']);
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
                    <fdp-checkbox [value]="'cooking'" [label]="'Cooking'"></fdp-checkbox>
                    <fdp-checkbox [value]="'painting'" [label]="'Painting'"></fdp-checkbox>
                    <fdp-checkbox [value]="'coding'" [label]="'Coding'"></fdp-checkbox>
                    <fdp-checkbox [value]="'gardening'" [label]="'Gardening'"></fdp-checkbox>
                </fdp-checkbox-group>
            </fdp-form-field>

            <fdp-form-field [id]="'languaget'" [label]="'Languages Known: '" zone="zLeft" rank="1">
                <fdp-checkbox-group [list]="languages" [name]="'language'" [(ngModel)]="language"></fdp-checkbox-group>
            </fdp-form-field>

            <fdp-form-field [id]="'fruitst'" [label]="'Fruits:'" zone="zLeft" rank="1">
                <fdp-checkbox-group [name]="'fruits'" [(ngModel)]="fruits">
                    <fdp-checkbox [value]="'apple'" [label]="'Apple'" [disabled]="true"></fdp-checkbox>
                    <fdp-checkbox [value]="'banana'" [label]="'Banana'"></fdp-checkbox>
                    <fdp-checkbox [value]="'guava'" [label]="'Guava'" [disabled]="true"></fdp-checkbox>
                    <fdp-checkbox [value]="'papaya'" [label]="'Papaya'"></fdp-checkbox>
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
class TestTemplateDrivenCheckboxGroupComponnet {
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
    let host: TestTemplateDrivenCheckboxGroupComponnet;
    let fixture: ComponentFixture<TestTemplateDrivenCheckboxGroupComponnet>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [FdpFormGroupModule, FormModule, PlatformCheckboxModule, FormsModule],
            declarations: [TestTemplateDrivenCheckboxGroupComponnet, CheckboxGroupComponent, CheckboxComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestTemplateDrivenCheckboxGroupComponnet);
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
        fixture.detectChanges();
        const fdpCheckboxElem = fixture.debugElement.queryAll(By.css('.fd-checkbox__label'));

        // pre-select test
        const inputElem = fixture.debugElement.queryAll(By.css('.fd-checkbox'));
        await wait(fixture);
        fixture.detectChanges();

        expect(inputElem[0].nativeElement.getAttribute('ng-reflect-model')).toEqual('true');
        expect(inputElem[1].nativeElement.getAttribute('ng-reflect-model')).toEqual('false');
        expect(inputElem[2].nativeElement.getAttribute('ng-reflect-model')).toEqual('true');
        expect(inputElem[3].nativeElement.getAttribute('ng-reflect-model')).toEqual('false');

        expect(host.phones).toEqual(['Samsung', 'OnePlus']);

        // select checkbox on click
        fdpCheckboxElem[1].nativeElement.click();
        await wait(fixture);
        fixture.detectChanges();

        fdpCheckboxElem[3].nativeElement.click();
        fixture.detectChanges();

        expect(host.phones.sort()).toEqual(['Apple', 'OnePlus', 'Redmi', 'Samsung']);

        // de-select checked checkbox on click
        fdpCheckboxElem[3].nativeElement.click();
        await wait(fixture);
        fixture.detectChanges();

        fdpCheckboxElem[2].nativeElement.click();
        await wait(fixture);
        fixture.detectChanges();

        expect(host.phones.sort()).toEqual(['Apple', 'Samsung']);

        fdpCheckboxElem[0].nativeElement.click();
        await wait(fixture);
        fixture.detectChanges();

        fdpCheckboxElem[1].nativeElement.click();
        await wait(fixture);
        fixture.detectChanges();

        expect(host.phones).toEqual([]);
    });

    // test cases for checbox group created from list of selectItem Objects.
    it('should create checkboxes from list of given selectItem Objects', async () => {
        await wait(fixture);
        fixture.detectChanges();
        const fdpCheckboxElem = fixture.debugElement.queryAll(By.css('.fd-checkbox__label'));
        await wait(fixture);
        fixture.detectChanges();

        // pre-select test
        expect(host.visited).toEqual(['India', 'USA']);

        // select checkbox on click
        fdpCheckboxElem[4].nativeElement.click();
        await wait(fixture);
        fixture.detectChanges();

        expect(host.visited.sort()).toEqual(['Australia', 'India', 'USA']);

        // de-select checked checkbox on click
        fdpCheckboxElem[5].nativeElement.click();
        await wait(fixture);
        fixture.detectChanges();

        fdpCheckboxElem[6].nativeElement.click();
        await wait(fixture);
        fixture.detectChanges();

        expect(host.visited).toEqual(['Australia']);

        fdpCheckboxElem[4].nativeElement.click();
        await wait(fixture);
        fixture.detectChanges();

        expect(host.visited).toEqual([]);
    });

    // checkbox group created from passed checkboxes.
    it('should create checkbox group from passed checkboxes', async () => {
        await wait(fixture);
        fixture.detectChanges();
        const fdpCheckboxElem = fixture.debugElement.queryAll(By.css('.fd-checkbox__label'));
        await wait(fixture);
        fixture.detectChanges();
        // pre-select test
        expect(host.hobbies.sort()).toEqual(['coding', 'gardening']);

        // select checkbox on click
        fdpCheckboxElem[7].nativeElement.click();
        await wait(fixture);
        fixture.detectChanges();

        fdpCheckboxElem[8].nativeElement.click();
        await wait(fixture);
        fixture.detectChanges();

        expect(host.hobbies.sort()).toEqual(['coding', 'cooking', 'gardening', 'painting']);

        // de-select checked checkbox on click
        fdpCheckboxElem[9].nativeElement.click();
        await wait(fixture);
        fixture.detectChanges();

        fdpCheckboxElem[10].nativeElement.click();
        await wait(fixture);
        fixture.detectChanges();

        expect(host.hobbies.sort()).toEqual(['cooking', 'painting']);
    });

    it('should create checkbox group with enabled and disabled checkboxes from SelectItem object', async () => {
        await wait(fixture);
        fixture.detectChanges();

        const fdpCheckboxElem = fixture.debugElement.queryAll(By.css('fdp-checkbox'));
        expect(fdpCheckboxElem[11].nativeElement.getAttribute('ng-reflect-is-disabled')).toEqual('false');
        expect(fdpCheckboxElem[12].nativeElement.getAttribute('ng-reflect-is-disabled')).toEqual('true');
        expect(fdpCheckboxElem[13].nativeElement.getAttribute('ng-reflect-is-disabled')).toEqual('false');
        expect(fdpCheckboxElem[14].nativeElement.getAttribute('ng-reflect-is-disabled')).toEqual('true');
    });

    it('should create checkbox group with enabled and disabled checkboxes from passed checkboxes', async () => {
        await wait(fixture);
        fixture.detectChanges();

        const fdpCheckboxElem = fixture.debugElement.queryAll(By.css('fdp-checkbox'));
        expect(fdpCheckboxElem[15].nativeElement.getAttribute('ng-reflect-is-disabled')).toEqual('true');
        expect(fdpCheckboxElem[16].nativeElement.getAttribute('ng-reflect-is-disabled')).toEqual('false');
        expect(fdpCheckboxElem[17].nativeElement.getAttribute('ng-reflect-is-disabled')).toEqual('true');
        expect(fdpCheckboxElem[18].nativeElement.getAttribute('ng-reflect-is-disabled')).toEqual('false');
    });

    it('should create checkboxes with any type of objects with lookupKey and displayKey given', async () => {
        await wait(fixture);
        fixture.detectChanges();

        const fdpCheckboxElem = fixture.debugElement.queryAll(By.css('.fd-checkbox__label'));
        await wait(fixture);
        fixture.detectChanges();

        expect(host.itemsData.sort()).toEqual(['pen']);

        fdpCheckboxElem[19].nativeElement.click();
        await wait(fixture);
        fixture.detectChanges();

        fdpCheckboxElem[20].nativeElement.click();
        await wait(fixture);
        fixture.detectChanges();

        fdpCheckboxElem[21].nativeElement.click();
        await wait(fixture);
        fixture.detectChanges();

        expect(host.itemsData.sort()).toEqual(['chair', 'coffee']);

        // uncheck checkbox 21
        fdpCheckboxElem[19].nativeElement.click();
        await wait(fixture);
        fixture.detectChanges();

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
                    <fdp-checkbox [value]="'cooking'" [label]="'Cooking'"></fdp-checkbox>
                    <fdp-checkbox [value]="'painting'" [label]="'Painting'"></fdp-checkbox>
                    <fdp-checkbox [value]="'coding'" [label]="'Coding'"></fdp-checkbox>
                    <fdp-checkbox [value]="'gardening'" [label]="'Gardening'"></fdp-checkbox>
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
                    <fdp-checkbox [value]="'apple'" [label]="'Apple'" [disabled]="true"></fdp-checkbox>
                    <fdp-checkbox [value]="'banana'" [label]="'Banana'"></fdp-checkbox>
                    <fdp-checkbox [value]="'guava'" [label]="'Guava'" [disabled]="true"></fdp-checkbox>
                    <fdp-checkbox [value]="'papaya'" [label]="'Papaya'"></fdp-checkbox>
                </fdp-checkbox-group>
            </fdp-form-field>
        </fdp-form-group>
    `
})
class TestReactiveCheckboxGroupWithData {
    phoneslist: string[] = ['Samsung', 'Apple', 'OnePlus', 'Redmi'];
    countryVisited = [new Country('Australia', 'Australia'), new Country('India', 'India'), new Country('USA', 'USA')];

    languages = [
        new LanguageKnown('Java', 'java', false),
        new LanguageKnown('Javascript', 'javascript', true),
        new LanguageKnown('Python', 'python', false),
        new LanguageKnown('GoLang', 'go', true)
    ];

    form2 = new FormGroup({
        phones: new FormControl(['Samsung', 'Apple']),
        visited: new FormControl(['India', 'Australia']),
        hobbies: new FormControl(['coding', 'gardening']),
        languages: new FormControl(['python']),
        fruits: new FormControl(['banana', 'guava'])
    });

    @ViewChildren(CheckboxComponent)
    checkboxGroups: QueryList<CheckboxGroupComponent>;
}

describe('CheckboxGroup component Reactive Form Test With FormGroup Data', () => {
    let host: TestReactiveCheckboxGroupWithData;
    let fixture: ComponentFixture<TestReactiveCheckboxGroupWithData>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [FdpFormGroupModule, FormModule, PlatformCheckboxModule, FormsModule, ReactiveFormsModule],
            declarations: [TestReactiveCheckboxGroupWithData, CheckboxGroupComponent, CheckboxComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestReactiveCheckboxGroupWithData);
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
        fixture.detectChanges();
        const fdpCheckboxElem = fixture.debugElement.queryAll(By.css('.fd-checkbox__label'));

        // pre-select test
        expect(host.form2.controls.phones.value.sort()).toEqual(['Apple', 'Samsung']);

        // select checkbox on click
        fdpCheckboxElem[1].nativeElement.click();
        await wait(fixture);
        fixture.detectChanges();

        fdpCheckboxElem[3].nativeElement.click();
        await wait(fixture);
        fixture.detectChanges();

        expect(host.form2.controls.phones.value.sort()).toEqual(['Redmi', 'Samsung']);

        // de-select checked checkbox on click
        fdpCheckboxElem[3].nativeElement.click();
        await wait(fixture);
        fixture.detectChanges();

        fdpCheckboxElem[2].nativeElement.click();
        await wait(fixture);
        fixture.detectChanges();

        expect(host.form2.controls.phones.value.sort()).toEqual(['OnePlus', 'Samsung']);

        fdpCheckboxElem[0].nativeElement.click();
        await wait(fixture);
        fixture.detectChanges();

        fdpCheckboxElem[1].nativeElement.click();
        fixture.detectChanges();

        expect(host.form2.controls.phones.value.sort()).toEqual(['Apple', 'OnePlus']);
    });

    // test cases for checbox group created from list of selectItem Objects.
    it('should create checkboxes from list of given selectItem Objects', async () => {
        await wait(fixture);
        fixture.detectChanges();
        const fdpCheckboxElem = fixture.debugElement.queryAll(By.css('.fd-checkbox__label'));

        // pre-select test
        expect(host.form2.controls.visited.value.sort()).toEqual(['Australia', 'India']);

        // select checkbox on click
        fdpCheckboxElem[4].nativeElement.click();
        await wait(fixture);
        fixture.detectChanges();

        expect(host.form2.controls.visited.value.sort()).toEqual(['India']);

        // de-select checked checkbox on click
        fdpCheckboxElem[5].nativeElement.click();
        await wait(fixture);
        fixture.detectChanges();

        fdpCheckboxElem[6].nativeElement.click();
        await wait(fixture);
        fixture.detectChanges();

        expect(host.form2.controls.visited.value).toEqual(['USA']);
    });

    // checkbox group created from passed checkboxes.
    it('should create checkbox group from passed checkboxes', async () => {
        await wait(fixture);
        fixture.detectChanges();
        const fdpCheckboxElem = fixture.debugElement.queryAll(By.css('.fd-checkbox__label'));

        // pre-select test
        expect(host.form2.controls.hobbies.value.sort()).toEqual(['coding', 'gardening']);

        // select checkbox on click
        fdpCheckboxElem[7].nativeElement.click();
        await wait(fixture);
        fixture.detectChanges();

        fdpCheckboxElem[8].nativeElement.click();
        await wait(fixture);
        fixture.detectChanges();

        expect(host.form2.controls.hobbies.value.sort()).toEqual(['coding', 'cooking', 'gardening', 'painting']);

        // de-select checked checkbox on click
        fdpCheckboxElem[9].nativeElement.click();
        await wait(fixture);
        fixture.detectChanges();

        fdpCheckboxElem[10].nativeElement.click();
        await wait(fixture);
        fixture.detectChanges();

        expect(host.form2.controls.hobbies.value.sort()).toEqual(['cooking', 'painting']);
    });

    it('should create checkbox group with enabled and disabled checkboxes from SelectItem object', async () => {
        await wait(fixture);
        fixture.detectChanges();

        const fdpCheckboxElem = fixture.debugElement.queryAll(By.css('fdp-checkbox'));
        expect(fdpCheckboxElem[11].nativeElement.getAttribute('ng-reflect-is-disabled')).toEqual('false');
        expect(fdpCheckboxElem[12].nativeElement.getAttribute('ng-reflect-is-disabled')).toEqual('true');
        expect(fdpCheckboxElem[13].nativeElement.getAttribute('ng-reflect-is-disabled')).toEqual('false');
        expect(fdpCheckboxElem[14].nativeElement.getAttribute('ng-reflect-is-disabled')).toEqual('true');
    });

    it('should create checkbox group with enabled and disabled checkboxes from passed checkboxes', async () => {
        await wait(fixture);
        fixture.detectChanges();

        const fdpCheckboxElem = fixture.debugElement.queryAll(By.css('fdp-checkbox'));
        expect(fdpCheckboxElem[15].nativeElement.getAttribute('ng-reflect-is-disabled')).toEqual('true');
        expect(fdpCheckboxElem[16].nativeElement.getAttribute('ng-reflect-is-disabled')).toEqual('false');
        expect(fdpCheckboxElem[17].nativeElement.getAttribute('ng-reflect-is-disabled')).toEqual('true');
        expect(fdpCheckboxElem[18].nativeElement.getAttribute('ng-reflect-is-disabled')).toEqual('false');
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
