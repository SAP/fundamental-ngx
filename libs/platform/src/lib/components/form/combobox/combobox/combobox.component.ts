import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Inject, Injector,
    OnInit,
    Optional,
    Self,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { NgControl, NgForm } from '@angular/forms';
import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import { filter, takeUntil } from 'rxjs/operators';

import {
    DIALOG_CONFIG,
    DialogConfig,
    DynamicComponentService,
    MenuKeyboardService, RtlService
} from '@fundamental-ngx/core';
import { ComboBoxDataSource, DATA_PROVIDERS, DataProvider } from '../../../../domain/data-source';
import { FormFieldControl } from '../../form-control';
import { BaseCombobox, ComboboxSelectionChangeEvent } from '../commons/base-combobox';
import { ComboboxConfig } from '../combobox.config';
import { OptionItem } from '../../../../domain';
import { Direction } from '@angular/cdk/bidi';
import { ComboboxMobileComponent } from '..';
import { COMBOBOX_COMPONENT } from '../combobox.interface';

@Component({
    selector: 'fdp-combobox',
    templateUrl: './combobox.component.html',
    styleUrls: ['./combobox.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [{ provide: FormFieldControl, useExisting: ComboboxComponent, multi: true }]
})
export class ComboboxComponent extends BaseCombobox implements OnInit, AfterViewInit {
    /** @hidden */
    @ViewChild('searchInputElement')
    searchInputElement: ElementRef;

    /** @hidden */
    @ViewChild(CdkConnectedOverlay)
    _connectedOverlay: CdkConnectedOverlay;

    /** @hidden */
    @ViewChild('controlTemplate')
    controlTemplate: TemplateRef<any>;

    /** @hidden */
    @ViewChild('listTemplate')
    listTemplate: TemplateRef<any>;

    /** @hidden */
    selected?: OptionItem;

    /** @hidden */
    private _direction: Direction = 'ltr';

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
        readonly _comboboxConfig: ComboboxConfig,
        private _rtlService: RtlService
    ) {
        super(_cd, elementRef, ngControl, ngForm, dialogConfig, _menuKeyboardService, _comboboxConfig);
    }

    /** @hidden */
    ngOnInit(): void {
        const providers = this.providers.size === 0 ? this._comboboxConfig.providers : this.providers;
        // if we have both prefer dataSource
        if (!this.dataSource && this.entityClass && providers.has(this.entityClass)) {
            this.dataSource = new ComboBoxDataSource(providers.get(this.entityClass));
        }

        this.openChange
            .pipe(
                takeUntil(this._destroyed),
                filter(isOpen => !this.mobile && !isOpen)
            )
            .subscribe(() => {
                if (this.isSelectedOptionItemByDisplayValue(this.inputText)) {
                    return;
                }

                this._reset();
            });
    }

    /** @hidden */
    ngAfterViewInit(): void {
        super.ngAfterViewInit();

        this._rtlService.rtl
            .pipe(takeUntil(this._destroyed))
            .subscribe(isRtl => this._direction = isRtl ? 'rtl' : 'ltr');

        if (this._connectedOverlay) {
            this._connectedOverlay.attach
                .pipe(takeUntil(this._destroyed))
                .subscribe(() => this._connectedOverlay.overlayRef.setDirection(this._direction));
        }


        if (this.mobile) {
            this._setUpMobileMode();
        }
    }

    /** @hidden
     * Method to emit change event
     */
    emitChangeEvent<T>(modelValue: T): void {
        const event = new ComboboxSelectionChangeEvent(this, modelValue);

        this.selectionChange.emit(event);
    }

    /** @hidden
     * Method to set selected item
     */
    selectOptionItem(item: OptionItem): void {
        if (this.mobile) {
            this.selected = item;
            this.inputText = this.displayValue(item);

            return;
        }

        this.inputText = item.label;
        this._checkAndUpdate(item);
        this.showList(false);
    }

    /** @hidden
     * Method to set as selected
     */
    setAsSelected(item: OptionItem[]): void {
        const selectedItem = item[0];

        if (this.isSelectedOptionItem(selectedItem)) {
            return;
        }

        this.inputText = this.displayValue(selectedItem);
        this.selected = selectedItem;
    }

    /** @hidden
     * Define is selected item selected
     */
    isSelectedOptionItem(selectedItem: any): boolean {
        return this.lookupKey && this.lookupValue(this.selected) === this.lookupValue(selectedItem) ||
            this.displayValue(this.selected) === this.displayValue(selectedItem);
    }

    /** @hidden
     * Define is selected item selected by display value
     */
    isSelectedOptionItemByDisplayValue(selectedItem: any): boolean {
        return this.selected && this.selected.label === selectedItem;
    }

    /** Handle dialog dismissing, closes popover and sets backup data. */
    dialogDismiss(term: string): void {
        if (this.selected && term !== this.selected.label) {
            this.selected = this._suggestions.find(item => item.label === term);
        }

        this.inputText = term;
        this.showList(false);
    }

    /** Handle dialog approval, closes popover and propagates data changes. */
    dialogApprove(): void {
        if (this.selected) {
            this.inputText = this.displayValue(this.selected);
            this._updateModel(this.selected.value);
        }
        this.showList(false);
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

    /** @hidden */
    private _setUpMobileMode(): void {
        this._dynamicComponentService.createDynamicComponent(
            { listTemplate: this.listTemplate, controlTemplate: this.controlTemplate },
            ComboboxMobileComponent,
            { container: this.elementRef.nativeElement },
            { injector: Injector.create({ providers: [{ provide: COMBOBOX_COMPONENT, useValue: this }] }) }
        );
    }

    private _reset(): void {
        this.selected = null;
        this.inputText = '';
        this._updateModel(null);
    }
}
