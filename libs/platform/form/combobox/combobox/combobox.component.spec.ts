import { OverlayContainer } from '@angular/cdk/overlay';

import { Component, ViewChild } from '@angular/core';
import {
    ComponentFixture,
    TestBed,
    fakeAsync,
    flush,
    flushMicrotasks,
    inject,
    waitForAsync
} from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { DynamicComponentService, RtlService } from '@fundamental-ngx/cdk/utils';
import { FormModule } from '@fundamental-ngx/core/form';
import { MenuKeyboardService } from '@fundamental-ngx/core/menu';
import { DATA_PROVIDERS, DataProvider, isOptionItem } from '@fundamental-ngx/platform/shared';

import { ContentDensityMode, ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { FdpFormGroupModule } from '../../form-group/fdp-form.module';
import { PlatformComboboxModule } from '../combobox.module';
import { ComboboxComponent, ComboboxSelectionChangeEvent } from './combobox.component';

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
                    [lookupKey]="lookupKey"
                    (selectionChange)="onSelect($event)"
                ></fdp-combobox>
            </fdp-form-field>
        </fdp-form-group>
    `,
    standalone: true,
    imports: [
        PlatformComboboxModule,
        FdpFormGroupModule,
        FormModule,
        FormsModule,
        ReactiveFormsModule,
        ContentDensityModule
    ]
})
class ComboboxStandardComponent {
    @ViewChild(ComboboxComponent)
    combobox: ComboboxComponent;
    dataSource = [
        { name: 'Apple', type: 'Fruits', id: 1 },
        { name: 'Banana', type: 'Fruits', id: 2 },
        { name: 'Pineapple', type: 'Fruits', id: 3 },
        { name: 'Strawberry', type: 'Fruits', id: 4 },
        { name: 'Broccoli', type: 'Vegetables', id: 5 },
        { name: 'Carrot', type: 'Vegetables', id: 6 },
        { name: 'Jalapeño', type: 'Vegetables', id: 7 },
        { name: 'Spinach', type: 'Vegetables', id: 8 },
        { name: 'Apple', type: 'Fruits2', id: 9 }
    ];
    selectedItem: ComboboxSelectionChangeEvent | null = null;
    maxHeight: string;
    autoResize = false;
    contentDensity: ContentDensityMode = ContentDensityMode.COZY;
    group = false;
    groupKey = 'type';
    showSecondaryText = false;
    secondaryKey = 'type';
    lookupKey: 'id';

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
            imports: [ComboboxStandardComponent],
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

        const compact = fixture.debugElement.queryAll(By.css('fdp-combobox.is-compact'));

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

        expect(component.selectedItem instanceof ComboboxSelectionChangeEvent).toBe(true);

        expect(component.selectedItem?.payload).toEqual(component.dataSource[0]);
        expect(combobox.isOpen).toBe(false);

        combobox.onPrimaryButtonClick();
        fixture.detectChanges();

        listItems = overlayContainerEl.querySelectorAll('.fd-list__item');
        item = listItems[2] as HTMLElement;
        item.click();
        fixture.detectChanges();
        expect(component.selectedItem?.payload).toEqual(component.dataSource[2]);
    });

    it('should be able to see Group', async () => {
        component.group = true;

        component.dataSource = [...component.dataSource];
        fixture.detectChanges();

        combobox.onPrimaryButtonClick();
        fixture.detectChanges();

        await fixture.whenRenderingDone();

        const group = overlayContainerEl.querySelectorAll('.fd-list__group-header');

        expect(group.length).toBe(3);
    });

    it('should be able to see Secondary Columns', () => {
        component.showSecondaryText = true;

        component.dataSource = [...component.dataSource];
        fixture.detectChanges();

        combobox.onPrimaryButtonClick();
        fixture.detectChanges();

        const secondaryColumns = overlayContainerEl.querySelectorAll('.fd-list__secondary');
        expect(secondaryColumns.length).toBe(combobox._suggestions.length);
    });

    it('should select the proper item when there are 2 with matching names but different lookup keys', () => {
        combobox.selectOptionItem(combobox._suggestions[8]);

        expect(combobox.value.id).toBe(component.dataSource[8].id);
    });

    it('should focus the combobox input on close', () => {
        jest.spyOn(combobox.searchInputElement.nativeElement, 'focus');
        combobox.isOpen = true;
        combobox.isOpenChangeHandle(false);
        expect(combobox.searchInputElement.nativeElement.focus).toHaveBeenCalledWith({ preventScroll: true });
    });
});
