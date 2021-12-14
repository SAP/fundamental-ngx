import {
    AfterViewChecked,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Host,
    Input,
    isDevMode,
    Optional,
    Output,
    Self,
    SkipSelf,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { NgControl, NgForm } from '@angular/forms';

import { FdSelectChange, SelectComponent as CoreSelect } from '@fundamental-ngx/core/select';
import { DynamicComponentService } from '@fundamental-ngx/core/utils';
import { ControlState, FormField, FormFieldControl, OptionItem } from '@fundamental-ngx/platform/shared';
import { BaseSelect, FdpSelectionChangeEvent } from '../commons/base-select';
import { SelectConfig } from '../select.config';

@Component({
    selector: 'fdp-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [{ provide: FormFieldControl, useExisting: SelectComponent, multi: true }]
})
export class SelectComponent extends BaseSelect implements AfterViewInit, AfterViewChecked {
    /**
     * @deprecated
     * Holds the control state of select
     */
    @Input()
    get selectState(): ControlState {
        if (isDevMode()) {
            console.warn('"selectState" is deprecated. Use "state" instead');
        }
        return super.state;
    }
    set selectState(state: ControlState) {
        if (isDevMode()) {
            console.warn('"selectState" is deprecated. Use "state" instead');
        }
        super.state = state;
    }

    /**
     * Directly sets value to the component that at the ends up at writeValue as well fires
     * change detections
     *
     */
    @Input()
    get value(): any {
        return this._value;
    }

    set value(newValue: any) {
        if (newValue !== this._value) {
            this._value = newValue;
            this.onChange(newValue);
            this.onTouched();
            this.valueChange.emit(newValue);
            this.cd.markForCheck();
        }
    }

    /** Event emitted when the selected value of the select changes. */
    @Output()
    readonly valueChange: EventEmitter<FdSelectChange> = new EventEmitter<FdSelectChange>();

    @ViewChild(CoreSelect, { static: true })
    select: CoreSelect;

    /** @hidden */
    selected?: OptionItem;

    constructor(
        readonly cd: ChangeDetectorRef,
        readonly elementRef: ElementRef,
        @Optional() @Self() readonly ngControl: NgControl,
        @Optional() @Self() readonly ngForm: NgForm,
        readonly _dynamicComponentService: DynamicComponentService,
        readonly _selectConfig: SelectConfig,
        @Optional() @SkipSelf() @Host() formField: FormField,
        @Optional() @SkipSelf() @Host() formControl: FormFieldControl<any>
    ) {
        super(cd, elementRef, ngControl, ngForm, _selectConfig, formField, formControl);
    }

    /** @hidden */
    ngAfterViewInit(): void {
        super.ngAfterViewInit();

        // set columns ratio for 2
        if (this.firstColumnRatio && this.secondColumnRatio) {
            this._setColumnsRatio(this.firstColumnRatio, this.secondColumnRatio);
        }

        // set width to avoid resize
        if (this.width) {
            const controlItem = this.elementRef.nativeElement.querySelector('.fd-select__text-content') as HTMLElement;
            controlItem.style.width = this.width;
        }

        // setting option items
        this.select._options.forEach((option) => {
            const optionItem = option._getHtmlElement();
            // set maxWidth default is 40rem
            if (this.maxWidth) {
                optionItem.setAttribute('style', 'max-width: ' + this.maxWidth + 'px');
            }
            // by default text will be overlapped, below it will help to truncate
            if (this.noWrapText) {
                const listTitle = optionItem.querySelector('.fd-list__title');
                const listTitleInnerHTML = listTitle.innerHTML;
                listTitle.setAttribute('title', listTitleInnerHTML);
                listTitle.setAttribute('aria-label', listTitleInnerHTML);
                listTitle.classList.add('fd-list__title--no-wrap');
            }
        });
    }

    /** @hidden */
    ngAfterViewChecked(): void {
        this._cd.detectChanges();
    }

    /**
     * Method to emit change event
     * @hidden
     */
    _emitChangeEvent<T>(modelValue: T): void {
        const event = new FdpSelectionChangeEvent(this, modelValue);
        this.selectionChange.emit(event);
    }

    /**
     * Method to set selected item
     * @hidden
     */
    _selectOptionItem(item: OptionItem): void {
        if (this.mobile) {
            this.selected = item;
            this.value = item.label;
            this.cd.detectChanges();

            return;
        }

        this.value = item.label;
        this._checkAndUpdate(item);
        this.showList(false);
    }

    /**
     * Method to set as selected
     *  @hidden
     */
    _setAsSelected(item: OptionItem[]): void {
        const selectedItem = item[0];

        if (this._isSelectedOptionItem(selectedItem)) {
            return;
        }

        this.selected = selectedItem;
        this.value = this.displayValue(this.selected);
    }

    /**
     * Define is selected item selected
     * @hidden
     */
    _isSelectedOptionItem(selectedItem: any): boolean {
        return (
            (this.lookupKey && this.lookupValue(this.selected) === this.lookupValue(selectedItem)) ||
            this.displayValue(this.selected) === this.displayValue(selectedItem)
        );
    }

    /** @hidden */
    _onSelection(value: any): void {
        this.value = value;
        this._updateModel(this.value);
        this.cd.markForCheck();
    }

    /**
     * if not selected update model
     *  @hidden
     */
    private _checkAndUpdate(modelValue: OptionItem): void {
        if (this._isSelectedOptionItem(modelValue)) {
            return;
        }
        const optionItem = this._getSelectedOptionItem(this.value);

        this._updateModel(optionItem ? optionItem.value : this.value);
    }

    /**
     * Update model
     *  @hidden
     */
    private _updateModel(value: any): void {
        // setting value, it will call setValue()
        this.value = value;
        this._emitChangeEvent(value ? value : null);
    }

    /** @hidden */
    private _getSelectedOptionItem(text: string): OptionItem | undefined {
        return this._optionItems.find((item) => item.label === text);
    }

    /** @hidden */
    private _setColumnsRatio(firstColumnRatio: number, secondColumnRatio: number): void {
        const totalProportions = firstColumnRatio + secondColumnRatio;
        const firstColumnProportion = Math.round((firstColumnRatio / totalProportions) * 100);
        const secondColumnProportion = 100 - firstColumnProportion;

        // setting option items
        this.select._options.forEach((option) => {
            const optionItem = option._getHtmlElement();
            const titleElement = <HTMLElement>optionItem.querySelector('.fd-list__title');
            this._setOptionAttribute(titleElement, firstColumnProportion);

            const secondaryElement = <HTMLElement>optionItem.querySelector('.fd-list__secondary');
            this._setOptionAttribute(secondaryElement, secondColumnProportion);
        });
    }

    /** @hidden */
    private _setOptionAttribute(element: HTMLElement, proportion: number): void {
        element.setAttribute('style', 'width: ' + proportion + '%; max-width: ' + proportion + '%');
    }
}
