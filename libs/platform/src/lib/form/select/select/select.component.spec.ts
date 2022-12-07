import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicComponentService } from '@fundamental-ngx/core/utils';
import { FormModule } from '@fundamental-ngx/core/form';
import { MenuKeyboardService } from '@fundamental-ngx/core/menu';
import { isOptionItem, OptionItem } from '@fundamental-ngx/platform/shared';
import { FdpFormGroupModule } from '../../form-group/fdp-form.module';
import { PlatformSelectModule } from '../select.module';
import { SelectComponent } from '../select/select.component';
import { FdpSelectionChangeEvent } from '../commons/base-select';
import { runValueAccessorTests } from 'ngx-cva-test-suite';
import { ContentDensityMode } from '@fundamental-ngx/core/content-density';

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
    `
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

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FdpFormGroupModule,
                FormModule,
                FormsModule,
                ReactiveFormsModule,
                CommonModule,
                PlatformSelectModule
            ],
            declarations: [SelectStandardComponent],
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

        const compact = fixture.debugElement.queryAll(By.css('.fd-select--compact'));

        expect(compact.length).toBeGreaterThan(0);
    });

    it('max height should set the select popover height', () => {
        expect(component.maxHeight).toBeFalsy();
        component.maxHeight = '320px';
        fixture.detectChanges();
        expect(select.maxHeight).toBe('320px');
    });

    it('should select the options with label', async () => {
        fixture.detectChanges();
        const fdpOptionElems = select._optionItems;
        expect(fdpOptionElems[0].label).toEqual('Apple');
        expect(fdpOptionElems[0].value).toEqual('A');
        expect(fdpOptionElems[1].label).toEqual('Banana');
        expect(fdpOptionElems[1].value).toEqual('B');
        expect(fdpOptionElems[2].label).toEqual('Pineapple');
        expect(fdpOptionElems[2].value).toEqual('C');
    });
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
    `
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

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FdpFormGroupModule,
                FormModule,
                FormsModule,
                ReactiveFormsModule,
                CommonModule,
                PlatformSelectModule
            ],
            providers: [DynamicComponentService, MenuKeyboardService],
            declarations: [TestReactiveSelectComponent]
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

const SELECT_IDENTIFIER = 'platform-select-unit-test';

runValueAccessorTests({
    component: SelectComponent,
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
