import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    EventEmitter,
    forwardRef,
    Host,
    Inject,
    Input,
    isDevMode,
    Optional,
    Output,
    QueryList,
    Self,
    SkipSelf,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import { NgControl, NgForm } from '@angular/forms';
import { RangeSelector } from '@fundamental-ngx/core/utils';
import { SelectionModel } from '@angular/cdk/collections';

import {
    FormField,
    FormFieldControl,
    InLineLayoutCollectionBaseInput,
    RESPONSIVE_BREAKPOINTS_CONFIG,
    ResponsiveBreakPointConfig,
    ResponsiveBreakpointsService,
    coerceArraySafe
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
    providers: [{ provide: FormFieldControl, useExisting: forwardRef(() => CheckboxGroupComponent), multi: true }]
})
export class CheckboxGroupComponent extends InLineLayoutCollectionBaseInput {
    /**
     * value for selected checkboxes.
     */
    @Input()
    get value(): any[] {
        return this.getValue();
    }
    set value(selectedValue: any[]) {
        this.setValue(selectedValue);
        this._updateSelectionModelByValue();
    }

    /**
     * To Display multiple checkboxes in a line
     */
    @Input()
    get isInline(): boolean {
        return this._inlineCurrentValue$.value;
    }

    set isInline(inline: boolean) {
        this._inlineCurrentValue$.next(inline);
    }

    /**
     * @deprecated
     * Establishes two way binding, when checkbox group used outside form.
     */
    @Input()
    get checked(): string[] {
        if (isDevMode()) {
            console.warn('"checked" is deprecated. Use "value" instead');
        }
        return this.value;
    }
    set checked(checkedValues: string[]) {
        if (isDevMode()) {
            console.warn('"checked" is deprecated. Use "value" instead');
        }
        this.value = checkedValues;
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

    /**
     * @deprecated - use "valueChange" instead
     * Emits checked change event
     */
    @Output()
    readonly checkedChange = this.valueChange;

    /** @hidden */
    private readonly _rangeSelector = new RangeSelector();

    /** @hidden */
    readonly _selectionModel = new SelectionModel(true);

    constructor(
        cd: ChangeDetectorRef,
        readonly _responsiveBreakpointsService: ResponsiveBreakpointsService,
        @Optional() @Self() ngControl: NgControl,
        @Optional() @SkipSelf() ngForm: NgForm,
        @Optional() @SkipSelf() @Host() formField: FormField,
        @Optional() @SkipSelf() @Host() formControl: FormFieldControl<any>,
        @Optional()
        @Inject(RESPONSIVE_BREAKPOINTS_CONFIG)
        readonly _defaultResponsiveBreakPointConfig: ResponsiveBreakPointConfig
    ) {
        super(
            cd,
            _responsiveBreakpointsService,
            ngControl,
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
    onCheckboxClick(index: number, source: 'contentChildren' | 'list', event?: PointerEvent): void {
        // this handler will be invoked after "valueChange"
        const queryList = source === 'list' ? this.viewCheckboxes : this.contentCheckboxes;
        const target = queryList.get(index);

        const isChecked = this._selectionModel.isSelected(target.values.trueValue);
        this._rangeSelector.onRangeElementToggled(index, event);

        if (!this._rangeSelector.lastRangeSelectionState.isRangeSelection) {
            // no need to proceed, if it's not a range selection - current checkbox is already updated
            return;
        }

        this._rangeSelector.applyValueToEachInRange((idx) => {
            const checkbox = queryList.get(idx);
            if (checkbox.disabled) {
                return;
            }
            const checkboxValue = checkbox.values.trueValue;
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

    /** @inheritdoc */
    protected setValue(value: any, emitOnChange = true): void {
        super.setValue(coerceArraySafe(value), emitOnChange);
    }

    /**
     * access display value for objects, acts as checkbox label.
     */
    public getDisplayValue(item: any): string {
        return this.displayValue(item);
    }

    /**
     * access lookup value for objects, acts as checkbox value.
     */
    public getLookupValue(item: any): string {
        return this.lookupValue(item);
    }

    /** @hidden */
    public getListItemDisabledValue(item: CheckboxGroupComponent['list'][number]): boolean {
        return this.disabled || typeof item === 'string' ? this.disabled : item.disabled;
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
