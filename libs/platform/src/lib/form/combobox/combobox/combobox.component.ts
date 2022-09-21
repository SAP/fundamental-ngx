import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Host,
    Inject,
    Injector,
    OnInit,
    Optional,
    Self,
    SkipSelf,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import { NgControl, NgForm } from '@angular/forms';

import { DynamicComponentService } from '@fundamental-ngx/core/utils';
import { DialogConfig } from '@fundamental-ngx/core/dialog';
import {
    ComboBoxDataSource,
    DATA_PROVIDERS,
    DataProvider,
    FormField,
    FormFieldControl,
    OptionItem
} from '@fundamental-ngx/platform/shared';

import { BaseCombobox, ComboboxSelectionChangeEvent } from '../commons/base-combobox';
import { ComboboxConfig } from '../combobox.config';
import { ComboboxMobileComponent } from '../combobox-mobile/combobox/combobox-mobile.component';
import { PlatformComboboxMobileModule } from '../combobox-mobile/combobox-mobile.module';
import { COMBOBOX_COMPONENT, ComboboxInterface } from '../combobox.interface';

@Component({
    selector: 'fdp-combobox',
    templateUrl: './combobox.component.html',
    styleUrls: ['./combobox.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [{ provide: FormFieldControl, useExisting: ComboboxComponent, multi: true }]
})
export class ComboboxComponent extends BaseCombobox implements ComboboxInterface, OnInit, AfterViewInit {
    /** @hidden */
    @ViewChild('searchInputElement')
    searchInputElement: ElementRef<HTMLInputElement>;

    /** @hidden */
    @ViewChild('controlTemplate')
    controlTemplate: TemplateRef<any>;

    /** @hidden */
    @ViewChild('listTemplate')
    listTemplate: TemplateRef<any>;

    /** @hidden */
    _selectedElement?: OptionItem;

    constructor(
        readonly cd: ChangeDetectorRef,
        readonly elementRef: ElementRef,
        @Optional() @Self() readonly ngControl: NgControl,
        @Optional() @Self() readonly ngForm: NgForm,
        @Optional() readonly dialogConfig: DialogConfig,
        readonly _dynamicComponentService: DynamicComponentService,
        private readonly _viewContainerRef: ViewContainerRef,
        private readonly _injector: Injector,
        @Optional() @Inject(DATA_PROVIDERS) private providers: Map<string, DataProvider<any>>,
        readonly _comboboxConfig: ComboboxConfig,
        @Optional() @SkipSelf() @Host() formField: FormField,
        @Optional() @SkipSelf() @Host() formControl: FormFieldControl<any>
    ) {
        super(cd, elementRef, ngControl, ngForm, dialogConfig, _comboboxConfig, formField, formControl);
    }
    /** @hidden */
    ngOnInit(): void {
        super.ngOnInit();
        const providers = this.providers?.size === 0 ? this._comboboxConfig.providers : this.providers;
        // if we have both prefer dataSource
        if (!this.dataSource && this.entityClass && providers?.has(this.entityClass)) {
            this.dataSource = new ComboBoxDataSource(providers.get(this.entityClass)!);
        }
    }

    /** @hidden */
    ngAfterViewInit(): void {
        super.ngAfterViewInit();

        if (this.mobile) {
            this._setUpMobileMode();
        }
    }

    /** @hidden */
    _onInputBlur(event: FocusEvent): void {
        if (this.mobile) {
            return;
        }

        const target = event.relatedTarget as HTMLElement;
        if (target) {
            const isList = !!target.closest('.fdp-combobox__list-container');
            if (isList) {
                return;
            }
        }

        if ((!this._selectedElement && !this.inputText) || this._selectedElement?.label === this.inputText) {
            return;
        }

        const optionItem = this._getSelectedOptionItem(this.inputText);

        this._updateModel(optionItem ? optionItem.value : this.inputText);
    }

    /** @hidden Method to emit change event */
    emitChangeEvent<T>(modelValue: T): void {
        const event = new ComboboxSelectionChangeEvent(this, modelValue);

        this.selectionChange.emit(event);
    }

    /** @hidden Method to set selected item */
    selectOptionItem(item: OptionItem): void {
        if (this.mobile) {
            this._selectedElement = item;
            this.inputText = item.label;
            this.cd.detectChanges();

            return;
        }

        this.inputText = item.label;
        this._checkAndUpdate(item);
        this.isOpenChangeHandle(false);
    }

    /** @hidden Method to set as selected */
    setAsSelected(item: OptionItem[]): void {
        const selectedItem = item[0];

        if (this.isSelectedOptionItem(selectedItem)) {
            return;
        }

        this._selectedElement = (this.isGroup && selectedItem?.children?.[0]) || selectedItem;
        this.inputText = this.displayValue(this._selectedElement);
    }

    /** @hidden Define is selected item selected */
    isSelectedOptionItem(selectedItem: any): boolean {
        return (
            (this.lookupKey && this.lookupValue(this._selectedElement) === this.lookupValue(selectedItem)) ||
            this.displayValue(this._selectedElement) === this.displayValue(selectedItem)
        );
    }

    /** @hidden Define is selected item selected by display value */
    isSelectedOptionItemByDisplayValue(selectedItem: any): boolean {
        return this._selectedElement?.label === selectedItem;
    }

    /** Handle dialog dismissing, closes popover and sets backup data. */
    dialogDismiss(term: string): void {
        if (this._selectedElement?.label !== term) {
            this._selectedElement = this._getSelectedOptionItem(term);
        }

        this.inputText = term;
        this.isOpenChangeHandle(false);
    }

    /** Handle dialog approval, closes popover and propagates data changes. */
    dialogApprove(): void {
        if (this._selectedElement?.label === this.inputText) {
            this._updateModel(this._selectedElement.value);
        } else {
            const optionItem = this._getSelectedOptionItem(this.inputText);

            this._updateModel(optionItem ? optionItem.value : this.inputText);
        }

        this.isOpenChangeHandle(false);
    }

    /** @hidden if not selected update model */
    private _checkAndUpdate(modelValue: OptionItem): void {
        if (this.isSelectedOptionItem(modelValue)) {
            return;
        }

        const optionItem = this._getSelectedOptionItem(this.inputText);

        this._updateModel(optionItem ? optionItem.value : this.inputText);
    }

    /** @hidden Update model */
    private _updateModel(value: any): void {
        // setting value, it will call setValue()
        this.value = value;

        this.emitChangeEvent(value ? value : null);
    }

    /** @hidden */
    private async _setUpMobileMode(): Promise<void> {
        const injector = Injector.create({
            providers: [{ provide: COMBOBOX_COMPONENT, useValue: this }],
            parent: this._injector
        });

        await this._dynamicComponentService.createDynamicModule(
            { listTemplate: this.listTemplate, controlTemplate: this.controlTemplate },
            PlatformComboboxMobileModule,
            ComboboxMobileComponent,
            this._viewContainerRef,
            injector
        );
    }

    /** @hidden */
    private _getSelectedOptionItem(text: string): OptionItem | undefined {
        if (!this.isGroup) {
            return this._suggestions.find((item) => item.label === text);
        }

        return this._suggestions
            .reduce((result: OptionItem[], item: OptionItem) => {
                result.push(...(item.children ?? []));

                return result;
            }, [])
            .find((item) => item.label === text);
    }
}
