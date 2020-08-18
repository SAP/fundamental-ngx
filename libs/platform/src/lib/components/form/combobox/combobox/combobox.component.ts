import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Inject,
    OnInit,
    Optional,
    Self,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { NgControl, NgForm } from '@angular/forms';

import {
    DIALOG_CONFIG,
    DialogConfig,
    DynamicComponentService,
    MenuKeyboardService
} from '@fundamental-ngx/core';
import { ComboBoxDataSource, DATA_PROVIDERS, DataProvider } from '../../../../domain/data-source';
import { FormFieldControl } from '../../form-control';
import { BaseCombobox, ComboboxSelectionChangeEvent } from '../commons/base-combobox';
import { ComboboxConfig } from '../combobox.config';
import { OptionItem } from '../../../../domain';

@Component({
    selector: 'fdp-combobox',
    templateUrl: './combobox.component.html',
    styleUrls: ['./combobox.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [{ provide: FormFieldControl, useExisting: ComboboxComponent, multi: true }]
})
export class ComboboxComponent extends BaseCombobox implements OnInit {
    /** @hidden */
    @ViewChild('searchInputElement')
    searchInputElement: ElementRef;

    /** @hidden */
    @ViewChild('controlTemplate')
    controlTemplate: TemplateRef<any>;

    /** @hidden */
    @ViewChild('listTemplate')
    listTemplate: TemplateRef<any>;

    /** @hidden */
    selected = '';

    get isGroup(): boolean {
        return !!(this.group && this.groupKey);
    }

    constructor(
        readonly _cd: ChangeDetectorRef,
        readonly elementRef: ElementRef,
        @Optional() @Self() readonly ngControl: NgControl,
        @Optional() @Self() readonly ngForm: NgForm,
        @Optional() @Inject(DIALOG_CONFIG) readonly dialogConfig: DialogConfig,
        readonly _dynamicComponentService: DynamicComponentService,
        @Inject(DATA_PROVIDERS) private providers: Map<string, DataProvider<any>>,
        protected _menuKeyboardService: MenuKeyboardService,
        readonly _comboboxConfig: ComboboxConfig
    ) {
        super(_cd, elementRef, ngControl, ngForm, dialogConfig, _dynamicComponentService, _menuKeyboardService, _comboboxConfig);
    }

    /** @hidden */
    ngOnInit(): void {
        const providers = this.providers.size === 0 ? this._comboboxConfig.providers : this.providers;
        // if we have both prefer dataSource
        if (!this.dataSource && this.entityClass && providers.has(this.entityClass)) {
            this.dataSource = new ComboBoxDataSource(providers.get(this.entityClass));
        }
    }

    /** @hidden
     * Method to emit change event
     */
    emitChangeEvent<T>(modelValue: T): void {
        const event = new ComboboxSelectionChangeEvent(this, modelValue);
        event.source = this;
        event.payload = modelValue;

        this.selectionChange.emit(event);
    }

    /** @hidden
     * Method to set selected item
     */
    selectOptionItem(item: OptionItem): void {
        this.showList(false);

        this._checkAndUpdate(item);
    }

    /** @hidden
     * Method to set as selected
     */
    setAsSelected(item: any[]): void {
        const selectedItem = item[0];

        if (this.isSelectedOptionItem(selectedItem)) {
            return;
        }

        this.inputTextValue = this.displayValue(selectedItem);
        this.selected = this.lookupValue(selectedItem) || this.inputTextValue;

        this._updateModel(selectedItem);
    }

    /** @hidden
     * Define is selected item selected
     */
    isSelectedOptionItem(selectedItem: any): boolean {
        return this.selected === this.lookupValue(selectedItem) || this.selected === this.displayValue(selectedItem);
    }

    /** @hidden
     * if not selected update model
     */
    private _checkAndUpdate(modelValue: OptionItem): void {
        if (this.isSelectedOptionItem(modelValue)) {
            return;
        }

        this._updateModel(modelValue.value);
    }

    /** @hidden
     * Update model
     */
    private _updateModel(value: any): void {
        // setting value, it will call setValue()
        this.value = value;

        this.emitChangeEvent(value);
    }
}
