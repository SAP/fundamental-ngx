import { JsonPipe } from '@angular/common';
import { Component, ViewChild, input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DynamicComponentService } from '@fundamental-ngx/cdk/utils';
import { ContentDensityMode, ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { FormModule } from '@fundamental-ngx/core/form';
import { MenuKeyboardService } from '@fundamental-ngx/core/menu';
import { OptionItem, isOptionItem } from '@fundamental-ngx/platform/shared';
import { runValueAccessorTests } from 'ngx-cva-test-suite';
import { FdpFormGroupModule } from '../../form-group/fdp-form.module';
import { FdpSelectionChangeEvent } from '../commons/base-select';
import { PlatformSelectModule } from '../select.module';
import { SelectComponent } from '../select/select.component';

@Component({
    selector: 'fdp-select-test',
    template: `
        <fdp-form-group [noLabelLayout]="false" [formGroup]="customForm">
            <fdp-form-field id="field" rank="4">
                <fdp-select
                    width="7rem"
                    name="field"
                    placeholder="Select an option"
                    [maxHeight]="maxHeight"
                    [fdContentDensity]="contentDensity"
                    [list]="fromData"
                    [value]="selectedItem"
                    (selectionChange)="onSelect($event)"
                    formControlName="field"
                ></fdp-select>
                <p>Selected Item: {{ selectedItem | json }}</p>
                <p>Form Selected Item: {{ customForm.getRawValue() | json }}</p>
            </fdp-form-field>
        </fdp-form-group>
    `,
    standalone: true,
    imports: [ReactiveFormsModule, FdpFormGroupModule, FormModule, PlatformSelectModule, ContentDensityModule, JsonPipe]
})
class SelectStandardComponent {
    @ViewChild(SelectComponent)
    select: SelectComponent;

    fromData: OptionItem[] = [
        { label: 'Apple', value: 'A' },
        { label: 'Banana', value: 'B' },
        { label: 'Pineapple', value: 'C' },
        { label: 'Strawberry', value: 'D' },
        { label: 'Broccoli', value: 'E' },
        { label: 'Carrot', value: 'F' },
        { label: 'Jalapeño', value: 'G' },
        { label: 'Spinach', value: 'H' }
    ];

    selectedItem = null;
    maxHeight: string;
    autoResize = false;
    contentDensity: ContentDensityMode = ContentDensityMode.COZY;

    customForm = new FormGroup({
        field: new FormControl()
    });

    onSelect(item: FdpSelectionChangeEvent): void {
        this.selectedItem = item.payload;
    }
}

describe('Select Component default values', () => {
    let component: SelectStandardComponent;
    let fixture: ComponentFixture<SelectStandardComponent>;
    let select: SelectComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [SelectStandardComponent],
            providers: [DynamicComponentService, MenuKeyboardService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SelectStandardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        select = component.select;
    });

    it('Select items should be converted to OptionItem', () => {
        const item = select._optionItems[0];

        expect(isOptionItem(item)).toBeTruthy();
    });

    it('Select should have compact display', () => {
        component.contentDensity = ContentDensityMode.COMPACT;

        fixture.detectChanges();

        const compact = fixture.debugElement.queryAll(By.css('.fd-select.is-compact'));

        expect(compact.length).toBeGreaterThan(0);
    });

    it('max height should set the select popover height', () => {
        expect(component.maxHeight).toBeFalsy();
        component.maxHeight = '320px';
        fixture.detectChanges();
        expect(select.maxHeight).toBe('320px');
    });

    it('should select the options with label', waitForAsync(() => {
        fixture.detectChanges();
        fixture.whenRenderingDone().then(() => {
            const fdpOptionElems = select._optionItems;
            expect(fdpOptionElems[0].label).toEqual('Apple');
            expect(fdpOptionElems[0].value).toEqual('A');
            expect(fdpOptionElems[1].label).toEqual('Banana');
            expect(fdpOptionElems[1].value).toEqual('B');
            expect(fdpOptionElems[2].label).toEqual('Pineapple');
            expect(fdpOptionElems[2].value).toEqual('C');
        });
    }));
});

@Component({
    selector: 'fdp-select-reactive-test',
    template: `
        <fdp-form-group [noLabelLayout]="false">
            <fdp-form-field id="columns" label="Two Columns" rank="4">
                <fdp-select
                    name="columns"
                    [autoResize]="autoResize"
                    width="7rem"
                    firstColumnRatio="2"
                    secondColumnRatio="4"
                    placeholder="Select an option"
                    [list]="option"
                    displayKey="label"
                    secondaryKey="secondaryText"
                    showSecondaryText="true"
                    secondaryTextAlignment="right"
                    (selectionChange)="onSelect($event)"
                ></fdp-select>
                <p>Selected Item: {{ selectedItem }}</p>
            </fdp-form-field>
        </fdp-form-group>
    `,
    standalone: true,
    imports: [FdpFormGroupModule, FormModule, FormsModule, ReactiveFormsModule, PlatformSelectModule]
})
class TestReactiveSelectComponent {
    @ViewChild(SelectComponent)
    select: SelectComponent;

    option: OptionItem[] = [
        { label: 'Apple', secondaryText: 'Fruits', value: 'Apple' },
        { label: 'Banana', secondaryText: 'Fruits', value: 'Banana' },
        { label: 'Lorem ipsum dolor sit, amet', secondaryText: 'Fruits', value: 'Pineapple' },
        { label: 'Strawberry', secondaryText: 'Fruits', value: 'Strawberry' },
        {
            label: 'et tempore cum. Corporis,Lorem ipsum dolor sit, amet nobis',
            secondaryText: 'Vegetables',
            value: 'Broccoli'
        },
        { label: 'Carrot', secondaryText: 'Vegetables', value: 'Carrot' },
        { label: 'Jalapeño', secondaryText: 'Vegetables', value: 'Jalapeño' },
        {
            label: 'Lorem Lorem ipsum dolor sit, ametipsum dolor sit, amet',
            secondaryText: 'Vegetables',
            value: 'Spinach'
        }
    ];

    selectedItem = null;
    autoResize = false;
    showSecondaryText = true;
    secondaryKey = 'type';

    onSelect(item: FdpSelectionChangeEvent): void {
        this.selectedItem = item.payload;
    }
}

describe('Select component Reactive Form Test', () => {
    let host: TestReactiveSelectComponent;
    let fixture: ComponentFixture<TestReactiveSelectComponent>;
    let select: SelectComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestReactiveSelectComponent],
            providers: [DynamicComponentService, MenuKeyboardService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestReactiveSelectComponent);
        host = fixture.componentInstance;
        fixture.detectChanges();
        select = host.select;
    });

    it('should create', () => {
        expect(host).toBeTruthy();
    });

    it('Select items should be converted to OptionItem', () => {
        const item = select._optionItems[0];

        expect(isOptionItem(item)).toBeTruthy();
    });

    it('Select items should be display 8 list of OptionItems', () => {
        const items = select._optionItems;
        expect(items.length).toEqual(8);
    });

    it('Select display primary and secondary texts', () => {
        const items = select._optionItems;
        expect(items.length).toEqual(8);

        expect(items[0].label).toEqual('Apple');
        expect(items[0].secondaryText).toEqual('Fruits');
        expect(items[7].label).toEqual('Lorem Lorem ipsum dolor sit, ametipsum dolor sit, amet');
        expect(items[7].secondaryText).toEqual('Vegetables');
        expect(items[7].value).toEqual('Spinach');
    });
});

interface Country {
    id: number;
    name: string;
    region: string;
}

@Component({
    selector: 'fdp-select-lookup-key-test',
    template: `
        <fdp-form-group [noLabelLayout]="false">
            <fdp-form-field id="country" label="Country" rank="4">
                <fdp-select
                    name="country"
                    placeholder="Select a country"
                    [list]="countries"
                    displayKey="name"
                    lookupKey="id"
                    [ngModel]="selectedCountry()"
                ></fdp-select>
            </fdp-form-field>
        </fdp-form-group>
    `,
    standalone: true,
    imports: [FormsModule, FdpFormGroupModule, FormModule, PlatformSelectModule]
})
class SelectLookupKeyTestComponent {
    @ViewChild(SelectComponent)
    select: SelectComponent;

    countries: Country[] = [
        { id: 1, name: 'Germany', region: 'Europe' },
        { id: 2, name: 'France', region: 'Europe' },
        { id: 3, name: 'Japan', region: 'Asia' },
        { id: 4, name: 'Brazil', region: 'Americas' }
    ];

    readonly selectedCountry = input<Country | null>(null);
}

describe('Select Component with lookupKey', () => {
    let component: SelectLookupKeyTestComponent;
    let fixture: ComponentFixture<SelectLookupKeyTestComponent>;
    let select: SelectComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [SelectLookupKeyTestComponent],
            providers: [DynamicComponentService, MenuKeyboardService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SelectLookupKeyTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        select = component.select;
    });

    it('should identify selected item when ngModel is set to a separate object reference with same lookupKey value', async () => {
        // Set ngModel to a DIFFERENT object reference that has the same id
        fixture.componentRef.setInput('selectedCountry', { id: 2, name: 'France', region: 'Europe' });
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();

        // The option item for France (id=2) should be recognized as selected
        const franceOptionItem = select._optionItems[1]; // { label: 'France', value: {id:2, ...} }
        expect(select._isSelectedOptionItem(franceOptionItem)).toBe(true);
    });

    it('should not identify non-matching item as selected when using lookupKey', async () => {
        fixture.componentRef.setInput('selectedCountry', { id: 2, name: 'France', region: 'Europe' });
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();

        const germanyOptionItem = select._optionItems[0]; // { label: 'Germany', value: {id:1, ...} }
        expect(select._isSelectedOptionItem(germanyOptionItem)).toBe(false);
    });
});

@Component({
    selector: 'fdp-select-lookup-key-reactive-test',
    template: `
        <fdp-form-group [noLabelLayout]="false">
            <fdp-form-field id="country" label="Country" rank="4">
                <fdp-select
                    name="country"
                    placeholder="Select a country"
                    [list]="countries"
                    displayKey="name"
                    lookupKey="id"
                    [formControl]="countryControl"
                ></fdp-select>
            </fdp-form-field>
        </fdp-form-group>
    `,
    standalone: true,
    imports: [ReactiveFormsModule, FdpFormGroupModule, FormModule, PlatformSelectModule]
})
class SelectLookupKeyReactiveTestComponent {
    @ViewChild(SelectComponent)
    select: SelectComponent;

    countries: Country[] = [
        { id: 1, name: 'Germany', region: 'Europe' },
        { id: 2, name: 'France', region: 'Europe' },
        { id: 3, name: 'Japan', region: 'Asia' },
        { id: 4, name: 'Brazil', region: 'Americas' }
    ];

    countryControl = new FormControl<Country | null>(null);
}

describe('Select Component with lookupKey and reactive forms', () => {
    let component: SelectLookupKeyReactiveTestComponent;
    let fixture: ComponentFixture<SelectLookupKeyReactiveTestComponent>;
    let select: SelectComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [SelectLookupKeyReactiveTestComponent],
            providers: [DynamicComponentService, MenuKeyboardService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SelectLookupKeyReactiveTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        select = component.select;
    });

    it('should display selected option when FormControl is set to a different object reference with matching lookupKey', async () => {
        component.countryControl.setValue({ id: 3, name: 'Japan', region: 'Asia' });
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();

        const triggerText = fixture.nativeElement.querySelector('.fd-select__text-content')?.textContent?.trim();
        expect(triggerText).toBe('Japan');
    });

    it('should update displayed value when FormControl value changes', async () => {
        component.countryControl.setValue({ id: 1, name: 'Germany', region: 'Europe' });
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();

        let triggerText = fixture.nativeElement.querySelector('.fd-select__text-content')?.textContent?.trim();
        expect(triggerText).toBe('Germany');

        component.countryControl.setValue({ id: 4, name: 'Brazil', region: 'Americas' });
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();

        triggerText = fixture.nativeElement.querySelector('.fd-select__text-content')?.textContent?.trim();
        expect(triggerText).toBe('Brazil');
    });

    it('should show placeholder when FormControl value is null', async () => {
        component.countryControl.setValue(null);
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();

        const triggerText = fixture.nativeElement.querySelector('.fd-select__text-content')?.textContent?.trim();
        expect(triggerText).toBe('Select a country');
    });
});

@Component({
    selector: 'fdp-select-lookup-key-secondary-test',
    template: `
        <fdp-form-group [noLabelLayout]="false">
            <fdp-form-field id="country" label="Country" rank="4">
                <fdp-select
                    name="country"
                    placeholder="Select a country"
                    [list]="countries"
                    displayKey="name"
                    secondaryKey="region"
                    showSecondaryText="true"
                    lookupKey="id"
                    [(ngModel)]="selectedCountry"
                ></fdp-select>
            </fdp-form-field>
        </fdp-form-group>
    `,
    standalone: true,
    imports: [FormsModule, FdpFormGroupModule, FormModule, PlatformSelectModule]
})
class SelectLookupKeySecondaryTextTestComponent {
    @ViewChild(SelectComponent)
    select: SelectComponent;

    countries: Country[] = [
        { id: 1, name: 'Germany', region: 'Europe' },
        { id: 2, name: 'France', region: 'Europe' },
        { id: 3, name: 'Japan', region: 'Asia' },
        { id: 4, name: 'Brazil', region: 'Americas' }
    ];

    selectedCountry: Country | null = null;
}

describe('Select Component with lookupKey and showSecondaryText', () => {
    let component: SelectLookupKeySecondaryTextTestComponent;
    let fixture: ComponentFixture<SelectLookupKeySecondaryTextTestComponent>;
    let select: SelectComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [SelectLookupKeySecondaryTextTestComponent],
            providers: [DynamicComponentService, MenuKeyboardService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SelectLookupKeySecondaryTextTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        select = component.select;
    });

    it('should build option items with secondary text', () => {
        expect(select._optionItems.length).toBe(4);
        expect(select._optionItems[0].label).toBe('Germany');
        expect(select._optionItems[0].secondaryText).toBe('Europe');
    });

    it('should extract lookupKey value into option item value when showSecondaryText is true', () => {
        expect(select._optionItems[0].value).toBe(1);
        expect(select._optionItems[2].value).toBe(3);
    });

    it('should not break when lookupKey is used with showSecondaryText (known limitation)', async () => {
        // When showSecondaryText=true, option values are pre-extracted to the lookupKey value (e.g., id: 2 → value: 2).
        // The compareOptionValues fallback handles this by falling back to === when lookupValue returns null.
        // Full lookupKey matching with showSecondaryText is a separate issue.
        component.selectedCountry = { id: 2, name: 'France', region: 'Europe' };
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();

        // Verify no errors thrown and component is stable
        expect(select._optionItems.length).toBe(4);
    });
});

@Component({
    selector: 'fdp-select-simple-values-test',
    template: `
        <fdp-form-group [noLabelLayout]="false">
            <fdp-form-field id="fruit" label="Fruit" rank="4">
                <fdp-select
                    name="fruit"
                    placeholder="Select a fruit"
                    [list]="fruits"
                    [ngModel]="selectedFruit()"
                ></fdp-select>
            </fdp-form-field>
        </fdp-form-group>
    `,
    standalone: true,
    imports: [FormsModule, FdpFormGroupModule, FormModule, PlatformSelectModule]
})
class SelectSimpleValuesTestComponent {
    @ViewChild(SelectComponent)
    select: SelectComponent;

    fruits: string[] = ['Apple', 'Banana', 'Cherry', 'Date'];

    readonly selectedFruit = input<string | null>(null);
}

describe('Select Component with simple string values (no lookupKey)', () => {
    let component: SelectSimpleValuesTestComponent;
    let fixture: ComponentFixture<SelectSimpleValuesTestComponent>;
    let select: SelectComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [SelectSimpleValuesTestComponent],
            providers: [DynamicComponentService, MenuKeyboardService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SelectSimpleValuesTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        select = component.select;
    });

    it('should convert string items to OptionItems', () => {
        expect(select._optionItems.length).toBe(4);
        expect(select._optionItems[0].label).toBe('Apple');
        expect(select._optionItems[0].value).toBe('Apple');
    });

    it('should display selected string value in trigger', async () => {
        fixture.componentRef.setInput('selectedFruit', 'Cherry');
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();

        const triggerText = fixture.nativeElement.querySelector('.fd-select__text-content')?.textContent?.trim();
        expect(triggerText).toBe('Cherry');
    });

    it('should update trigger when selection changes between string values', async () => {
        fixture.componentRef.setInput('selectedFruit', 'Apple');
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();

        let triggerText = fixture.nativeElement.querySelector('.fd-select__text-content')?.textContent?.trim();
        expect(triggerText).toBe('Apple');

        fixture.componentRef.setInput('selectedFruit', 'Date');
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();

        triggerText = fixture.nativeElement.querySelector('.fd-select__text-content')?.textContent?.trim();
        expect(triggerText).toBe('Date');
    });
});

describe('Select Component with lookupKey — selection changes', () => {
    let component: SelectLookupKeyTestComponent;
    let fixture: ComponentFixture<SelectLookupKeyTestComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [SelectLookupKeyTestComponent],
            providers: [DynamicComponentService, MenuKeyboardService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SelectLookupKeyTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should display correct country when ngModel changes from one to another', async () => {
        fixture.componentRef.setInput('selectedCountry', { id: 1, name: 'Germany', region: 'Europe' });
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();

        let triggerText = fixture.nativeElement.querySelector('.fd-select__text-content')?.textContent?.trim();
        expect(triggerText).toBe('Germany');

        fixture.componentRef.setInput('selectedCountry', { id: 3, name: 'Japan', region: 'Asia' });
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();

        triggerText = fixture.nativeElement.querySelector('.fd-select__text-content')?.textContent?.trim();
        expect(triggerText).toBe('Japan');
    });

    it('should clear displayed value when ngModel is set to null', async () => {
        fixture.componentRef.setInput('selectedCountry', { id: 2, name: 'France', region: 'Europe' });
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();

        let triggerText = fixture.nativeElement.querySelector('.fd-select__text-content')?.textContent?.trim();
        expect(triggerText).toBe('France');

        fixture.componentRef.setInput('selectedCountry', null);
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();

        triggerText = fixture.nativeElement.querySelector('.fd-select__text-content')?.textContent?.trim();
        expect(triggerText).toBe('Select a country');
    });

    it('should display correct value when ngModel is set before first detection cycle', async () => {
        fixture.componentRef.setInput('selectedCountry', { id: 4, name: 'Brazil', region: 'Americas' });
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();

        const triggerText = fixture.nativeElement.querySelector('.fd-select__text-content')?.textContent?.trim();
        expect(triggerText).toBe('Brazil');
    });
});

const SELECT_IDENTIFIER = 'platform-select-unit-test';

runValueAccessorTests({
    component: SelectComponent,
    name: 'Select',
    testModuleMetadata: {
        imports: [PlatformSelectModule]
    },
    additionalSetup: (fixture, done) => {
        fixture.componentInstance.id = SELECT_IDENTIFIER;
        fixture.componentInstance.name = SELECT_IDENTIFIER;
        done();
    },
    supportsOnBlur: false,
    internalValueChangeSetter: (fixture, value) => {
        fixture.componentInstance.value = value;
    },
    getComponentValue: (fixture) => fixture.componentInstance.value
});
