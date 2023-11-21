import { SelectionModel } from '@angular/cdk/collections';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    forwardRef,
    Host,
    Inject,
    Input,
    Optional,
    Output,
    QueryList,
    Self,
    SkipSelf,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import { ControlContainer, FormsModule, NgControl, NgForm } from '@angular/forms';
import { FD_FORM_FIELD, FD_FORM_FIELD_CONTROL } from '@fundamental-ngx/cdk/forms';
import { RangeSelector } from '@fundamental-ngx/cdk/utils';

import { NgTemplateOutlet } from '@angular/common';
import { FormGroupComponent } from '@fundamental-ngx/core/form';
import {
    coerceArraySafe,
    InLineLayoutCollectionBaseInput,
    PlatformFormField,
    PlatformFormFieldControl,
    RESPONSIVE_BREAKPOINTS_CONFIG,
    ResponsiveBreakPointConfig,
    ResponsiveBreakpointsService,
    SelectItem
} from '@fundamental-ngx/platform/shared';
import { CheckboxComponent } from '../checkbox/checkbox.component';

/**
 * Checkbox group implementation based on the
 * https://github.com/SAP/fundamental-ngx/wiki/Platform:-CheckboxGroup-Technical-Design
 * documents.
 */
@Component({
    selector: 'fdp-checkbox-group',
    templateUrl: './checkbox-group.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [{ provide: FD_FORM_FIELD_CONTROL, useExisting: forwardRef(() => CheckboxGroupComponent), multi: true }],
    standalone: true,
    imports: [FormGroupComponent, NgTemplateOutlet, CheckboxComponent, FormsModule]
})
export class CheckboxGroupComponent extends InLineLayoutCollectionBaseInput {
    /**
     * value for selected checkboxes.
     */
    @Input()
    set value(selectedValue: any[]) {
        this.setValue(selectedValue);
        this._updateSelectionModelByValue();
    }
    get value(): any[] {
        return this.getValue();
    }

    /**
     * To Display multiple checkboxes in a line
     */
    @Input()
    set isInline(inline: boolean) {
        this._inlineCurrentValue$.next(inline);
    }
    get isInline(): boolean {
        return this._inlineCurrentValue$.value;
    }

    /** Children checkboxes passed as content */
    @ContentChildren(CheckboxComponent)
    contentCheckboxes: QueryList<CheckboxComponent>;

    /** Children checkboxes created from passed list values. */
    @ViewChildren(CheckboxComponent)
    viewCheckboxes: QueryList<CheckboxComponent>;

    /** Emits checked change event */
    @Output()
    readonly valueChange: EventEmitter<string[]> = new EventEmitter<string[]>();

    /** @hidden */
    readonly _selectionModel = new SelectionModel(true);

    /** @hidden */
    private readonly _rangeSelector = new RangeSelector();

    /** @hidden */
    constructor(
        cd: ChangeDetectorRef,
        elementRef: ElementRef,
        readonly _responsiveBreakpointsService: ResponsiveBreakpointsService,
        @Optional() @Self() ngControl: NgControl,
        @Optional() @SkipSelf() controlContainer: ControlContainer,
        @Optional() @SkipSelf() ngForm: NgForm,
        @Optional() @SkipSelf() @Host() @Inject(FD_FORM_FIELD) formField: PlatformFormField,
        @Optional()
        @SkipSelf()
        @Host()
        @Inject(FD_FORM_FIELD_CONTROL)
        @Inject(FD_FORM_FIELD_CONTROL)
        formControl: PlatformFormFieldControl,
        @Optional()
        @Inject(RESPONSIVE_BREAKPOINTS_CONFIG)
        readonly _defaultResponsiveBreakPointConfig: ResponsiveBreakPointConfig
    ) {
        super(
            cd,
            elementRef,
            _responsiveBreakpointsService,
            ngControl,
            controlContainer,
            ngForm,
            formField,
            formControl,
            _defaultResponsiveBreakPointConfig
        );
    }

    /**
     * @hidden
     * @param selectionState actual value of the checkbox
     * @param checkboxTrueValue thuthy value to compare the "selectionState" with
     */
    onModelChanged(selectionState: any, checkboxTrueValue: any): void {
        const isSelected = selectionState === checkboxTrueValue;
        if (isSelected) {
            this._selectionModel.select(checkboxTrueValue);
        } else {
            this._selectionModel.deselect(checkboxTrueValue);
        }
        this._setValueBySelectionModel();
        this.onTouched();
        this.valueChange.emit(this.value);
    }

    /** @hidden */
    onCheckboxClick(index: number, source: 'contentChildren' | 'list', event?: MouseEvent): void {
        // this handler will be invoked after "valueChange"
        const queryList = source === 'list' ? this.viewCheckboxes : this.contentCheckboxes;
        const target = queryList.get(index);

        const isChecked = this._selectionModel.isSelected(target?.values.trueValue);
        this._rangeSelector.onRangeElementToggled(index, event);

        if (!this._rangeSelector.lastRangeSelectionState?.isRangeSelection) {
            // no need to proceed, if it's not a range selection - current checkbox is already updated
            return;
        }

        this._rangeSelector.applyValueToEachInRange((idx) => {
            const checkbox = queryList.get(idx);
            if (checkbox?.disabled) {
                return;
            }
            const checkboxValue = checkbox?.values.trueValue;
            if (isChecked) {
                this._selectionModel.select(checkboxValue);
            } else {
                this._selectionModel.deselect(checkboxValue);
            }
        });
        this._setValueBySelectionModel();
        this.valueChange.emit(this.value);
    }

    /** @hidden */
    writeValue(selectedValue: any): void {
        super.writeValue(coerceArraySafe(selectedValue));
        this._updateSelectionModelByValue();
    }

    /**
     * access display value for objects, acts as checkbox label.
     */
    getDisplayValue(item: any): string {
        return this.displayValue(item);
    }

    /**
     * access lookup value for objects, acts as checkbox value.
     */
    getLookupValue(item: any): string {
        return this.lookupValue(item);
    }

    /** @hidden */
    getListItemDisabledValue(item: CheckboxGroupComponent['list'][number]): boolean {
        return this.disabled || !!(<SelectItem>item)?.disabled;
    }

    /** @inheritdoc */
    protected setValue(value: any, emitOnChange = true): void {
        super.setValue(coerceArraySafe(value), emitOnChange);
    }

    /** @hidden */
    private _setValueBySelectionModel(): void {
        super.setValue(this._selectionModel.selected);
        this._cd.markForCheck();
    }

    /** @hidden */
    private _updateSelectionModelByValue(): void {
        this._selectionModel.clear();
        this.value.forEach((v) => this._selectionModel.select(v));
        this._cd.markForCheck();
    }
}
