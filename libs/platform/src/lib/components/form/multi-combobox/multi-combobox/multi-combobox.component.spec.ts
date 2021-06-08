import { ComponentFixture, inject, TestBed, waitForAsync } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';
import { By } from '@angular/platform-browser';
import { A } from '@angular/cdk/keycodes';

import { DynamicComponentService, FormModule, RtlService } from '@fundamental-ngx/core';
import {
    ContentDensity,
    DATA_PROVIDERS,
    DataProvider,
    FdpFormGroupModule,
    isSelectableOptionItem,
    MultiComboboxComponent,
    MultiComboboxSelectionChangeEvent,
    PlatformMultiComboboxModule
} from '@fundamental-ngx/platform';

@Component({
    selector: 'fdp-multi-combobox-test',
    template: `
        <fdp-form-group>
            <fdp-form-field id="standard" placeholder="Type some text..." label="Standard" zone="zLeft" rank="4">
                <fdp-multi-combobox
                    name="standard"
                    displayKey="name"
                    [autoResize]="autoResize"
                    [group]="group"
                    [groupKey]="groupKey"
                    [showSecondaryText]="showSecondaryText"
                    [secondaryKey]="secondaryKey"
                    [contentDensity]="contentDensity"
                    [dataSource]="dataSource"
                    [maxHeight]="maxHeight"
                    [selectedItems]="selectedItems"
                    (selectionChange)="onSelect($event)"
                ></fdp-multi-combobox>
            </fdp-form-field>
        </fdp-form-group>
    `
})
class MultiComboboxStandardComponent {
    @ViewChild(MultiComboboxComponent)
    multiCombobox: MultiComboboxComponent;
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
    selectedItems = null;
    maxHeight: string;
    autoResize = false;
    contentDensity: ContentDensity = 'cozy';
    group = false;
    groupKey = 'type';
    showSecondaryText = false;
    secondaryKey = 'type';

    onSelect(event: MultiComboboxSelectionChangeEvent): void {
        this.selectedItems = event.selectedItems;
    }
}

describe('MultiComboboxComponent default values', () => {
    let component: MultiComboboxStandardComponent;
    let fixture: ComponentFixture<MultiComboboxStandardComponent>;
    let multiCombobox: MultiComboboxComponent;
    let overlayContainerEl: HTMLElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [FdpFormGroupModule, FormModule, FormsModule, ReactiveFormsModule, CommonModule, PlatformMultiComboboxModule],
            declarations: [MultiComboboxStandardComponent, MultiComboboxComponent],
            providers: [
                DynamicComponentService,
                RtlService,
                { provide: DATA_PROVIDERS, useClass: DataProvider as any }
            ]
        }).compileComponents();

        inject([OverlayContainer], (overlayContainer: OverlayContainer) => {
            overlayContainerEl = overlayContainer.getContainerElement();
        })();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MultiComboboxStandardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        multiCombobox = component.multiCombobox;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should be able to change the contentDensity to "compact"', () => {
        component.contentDensity = 'compact';

        multiCombobox.onPrimaryButtonClick(multiCombobox.isOpen);
        fixture.detectChanges();

        const compactInput = fixture.debugElement.queryAll(By.css('.fd-input--compact'));
        const compactTokenizer = fixture.debugElement.queryAll(By.css('.fd-tokenizer--compact'));
        const compactList = fixture.debugElement.queryAll(By.css('.fd-list--compact'));

        expect(compactInput.length).toBeGreaterThan(0);
        expect(compactTokenizer.length).toBeGreaterThan(0);
        expect(compactList.length).toBeGreaterThan(0);
    });

    it('should be able to fix the height of the multi-combobox list via the maxHeight property', () => {
        component.maxHeight = '320px';

        fixture.detectChanges();

        expect(multiCombobox.maxHeight).toBe('320px');
    });

    it('should be able to expand/collapse list if click on onPrimaryButtonClick', () => {
        multiCombobox.onPrimaryButtonClick(multiCombobox.isOpen);
        fixture.detectChanges();

        let toggleButton = overlayContainerEl.querySelectorAll('.fd-list__item');
        expect(toggleButton.length).toBe(multiCombobox._suggestions.length);

        multiCombobox.onPrimaryButtonClick(multiCombobox.isOpen);
        fixture.detectChanges();

        toggleButton = overlayContainerEl.querySelectorAll('.fd-list__item');
        expect(toggleButton.length).toBe(0);
    });

    it('should be able to see Group', () => {
        component.group = true;

        component.dataSource = [...component.dataSource];
        fixture.detectChanges();

        multiCombobox.onPrimaryButtonClick(multiCombobox.isOpen);
        fixture.detectChanges();

        const group = overlayContainerEl.querySelectorAll('.fd-list__group-header');
        expect(group.length).toBe(2);
    });

    it('should be able to see Secondary Column', () => {
        component.showSecondaryText = true;

        component.dataSource = [...component.dataSource];
        fixture.detectChanges();

        multiCombobox.onPrimaryButtonClick(multiCombobox.isOpen);
        fixture.detectChanges();

        const secondaryColumns = overlayContainerEl.querySelectorAll('.fd-list__secondary');
        expect(secondaryColumns.length).toBe(multiCombobox._suggestions.length);
    });

    it('dataSource items should be converted to SelectableOptionItem', () => {
        const item = multiCombobox._suggestions[0];

        expect(isSelectableOptionItem(item)).toBeTruthy();
    });

    it('should select and unselect an item', () => {
        const item = multiCombobox._suggestions[0];
        const propagateChangeSpy = spyOn(<any>multiCombobox, '_propagateChange');

        expect(item.selected).toBeFalse();

        multiCombobox.toggleSelection(item);
        fixture.detectChanges();

        expect(item.selected).toBeTrue();
        expect(multiCombobox._selected.length).toEqual(1);
        expect(propagateChangeSpy).toHaveBeenCalled();

        multiCombobox.toggleSelection(item);
        fixture.detectChanges();

        expect(item.selected).toBeFalse();
        expect(multiCombobox._selected.length).toEqual(0);
        expect(propagateChangeSpy).toHaveBeenCalled();
    });

    it('should select and unselect all items', () => {
        const selectEvent = new KeyboardEvent('keydown', {
            keyCode: A,
            ctrlKey: true
        })
        const unselectEvent = new KeyboardEvent('keydown', {
            keyCode: A,
            ctrlKey: true,
            shiftKey: true
        });

        multiCombobox.onPrimaryButtonClick(multiCombobox.isOpen);
        fixture.detectChanges();
        overlayContainerEl.querySelector('.fd-list__item').dispatchEvent(selectEvent);
        fixture.detectChanges();

        expect(multiCombobox._selected.length).toEqual(component.dataSource.length);

        overlayContainerEl.querySelector('.fd-list__item').dispatchEvent(unselectEvent);
        fixture.detectChanges();

        expect(multiCombobox._selected.length).toEqual(0);
    });
});

