import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { Component, ViewChild } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    ComponentFixture,
    fakeAsync,
    flush,
    flushMicrotasks,
    inject,
    TestBed,
    waitForAsync
} from '@angular/core/testing';

import { MenuKeyboardService } from '@fundamental-ngx/core/menu';
import { FormModule } from '@fundamental-ngx/core/form';
import { DynamicComponentService, RtlService } from '@fundamental-ngx/cdk/utils';
import { DATA_PROVIDERS, DataProvider, isOptionItem } from '@fundamental-ngx/platform/shared';

import { FdpFormGroupModule } from '../../form-group/fdp-form.module';
import { PlatformComboboxModule } from '../combobox.module';
import { ComboboxSelectionChangeEvent } from '../commons/base-combobox';
import { ComboboxComponent } from './combobox.component';
import { ContentDensityMode } from '@fundamental-ngx/core/content-density';

@Component({
    selector: 'fdp-combobox-test',
    template: `
        <fdp-form-group>
            <fdp-form-field id="standard" placeholder="Type some text..." label="Standard" zone="zLeft" rank="4">
                <fdp-combobox
                    name="standard"
                    displayKey="name"
                    [autoResize]="autoResize"
                    [group]="group"
                    [groupKey]="groupKey"
                    [showSecondaryText]="showSecondaryText"
                    [secondaryKey]="secondaryKey"
                    [fdContentDensity]="contentDensity"
                    [dataSource]="dataSource"
                    [maxHeight]="maxHeight"
                    (selectionChange)="onSelect($event)"
                ></fdp-combobox>
            </fdp-form-field>
        </fdp-form-group>
    `
})
class ComboboxStandardComponent {
    @ViewChild(ComboboxComponent)
    combobox: ComboboxComponent;
    dataSource = [
        { name: 'Apple', type: 'Fruits' },
        { name: 'Banana', type: 'Fruits' },
        { name: 'Pineapple', type: 'Fruits' },
        { name: 'Strawberry', type: 'Fruits' },
        { name: 'Broccoli', type: 'Vegetables' },
        { name: 'Carrot', type: 'Vegetables' },
        { name: 'Jalapeño', type: 'Vegetables' },
        { name: 'Spinach', type: 'Vegetables' }
    ];
    selectedItem: ComboboxSelectionChangeEvent | null = null;
    maxHeight: string;
    autoResize = false;
    contentDensity: ContentDensityMode = ContentDensityMode.COZY;
    group = false;
    groupKey = 'type';
    showSecondaryText = false;
    secondaryKey = 'type';

    onSelect(item: ComboboxSelectionChangeEvent): void {
        this.selectedItem = item;
    }
}

describe('ComboboxComponent default values', () => {
    let component: ComboboxStandardComponent;
    let fixture: ComponentFixture<ComboboxStandardComponent>;
    let combobox: ComboboxComponent;
    let overlayContainerEl: HTMLElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                FdpFormGroupModule,
                FormModule,
                FormsModule,
                ReactiveFormsModule,
                CommonModule,
                PlatformComboboxModule
            ],
            declarations: [ComboboxStandardComponent],
            providers: [
                DynamicComponentService,
                MenuKeyboardService,
                RtlService,
                { provide: DATA_PROVIDERS, useClass: DataProvider as any }
            ]
        }).compileComponents();

        inject([OverlayContainer], (overlayContainer: OverlayContainer) => {
            overlayContainerEl = overlayContainer.getContainerElement();
        })();
    }));

    beforeEach(fakeAsync(() => {
        fixture = TestBed.createComponent(ComboboxStandardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        combobox = component.combobox;
        flushMicrotasks();
        flush();
    }));

    it('dataSource items should be converted to OptionItem', () => {
        const item = combobox._suggestions[0];

        expect(isOptionItem(item)).toBeTruthy();
    });

    it('should be able to change the contentDensity to "compact"', () => {
        component.contentDensity = ContentDensityMode.COMPACT;

        fixture.detectChanges();

        const compact = fixture.debugElement.queryAll(By.css('.fd-input--compact'));

        expect(compact.length).toBeGreaterThan(0);
    });

    it('should be able to fix the height of the combobox list via the maxHeight property', () => {
        expect(component.maxHeight).toBeFalsy();
        component.maxHeight = '320px';
        fixture.detectChanges();
        expect(combobox.maxHeight).toBe('320px');
    });

    it('should be able to expand/collapse list if click on onPrimaryButtonClick', () => {
        combobox.onPrimaryButtonClick();
        fixture.detectChanges();

        let toggleButton = overlayContainerEl.querySelectorAll('.fd-list__item');
        expect(toggleButton.length).toBe(combobox._suggestions.length);

        combobox.onPrimaryButtonClick();
        fixture.detectChanges();

        toggleButton = overlayContainerEl.querySelectorAll('.fd-list__item');
        expect(toggleButton.length).toBe(0);
    });

    it('should emit a onSelect event when click on a item', () => {
        combobox.onPrimaryButtonClick();
        fixture.detectChanges();

        let listItems = overlayContainerEl.querySelectorAll('.fd-list__item');
        let item = listItems[0] as HTMLElement;
        item.click();
        fixture.detectChanges();

        expect(component.selectedItem instanceof ComboboxSelectionChangeEvent).toBeTrue();

        expect(component.selectedItem?.payload).toEqual(component.dataSource[0]);
        expect(combobox.isOpen).toBeFalse();

        combobox.onPrimaryButtonClick();
        fixture.detectChanges();

        listItems = overlayContainerEl.querySelectorAll('.fd-list__item');
        item = listItems[2] as HTMLElement;
        item.click();
        fixture.detectChanges();
        expect(component.selectedItem?.payload).toEqual(component.dataSource[2]);
    });

    it('should be able to see Group', fakeAsync(() => {
        component.group = true;

        component.dataSource = [...component.dataSource];
        fixture.detectChanges();
        flushMicrotasks();

        combobox.onPrimaryButtonClick();
        fixture.detectChanges();
        flushMicrotasks();

        const group = overlayContainerEl.querySelectorAll('.fd-list__group-header');
        expect(group.length).toBe(2);

        flush();
    }));

    it('should be able to see Secondary Columns', () => {
        component.showSecondaryText = true;

        component.dataSource = [...component.dataSource];
        fixture.detectChanges();

        combobox.onPrimaryButtonClick();
        fixture.detectChanges();

        const secondaryColumns = overlayContainerEl.querySelectorAll('.fd-list__secondary');
        expect(secondaryColumns.length).toBe(combobox._suggestions.length);
    });
});
