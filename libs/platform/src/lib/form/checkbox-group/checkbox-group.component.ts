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
    Optional,
    Output,
    QueryList,
    Self,
    SkipSelf,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import { NgControl, NgForm } from '@angular/forms';
import { distinctUntilChanged } from 'rxjs/operators';

import {
    FormField,
    FormFieldControl,
    InLineLayoutCollectionBaseInput,
    RESPONSIVE_BREAKPOINTS_CONFIG,
    ResponsiveBreakPointConfig,
    ResponsiveBreakpointsService
} from '@fundamental-ngx/platform/shared';
import { CheckboxComponent, PlatformCheckboxChange } from '../checkbox/checkbox.component';

/**
 * Checkbox group implementation based on the
 * https://github.com/SAP/fundamental-ngx/wiki/Platform:-CheckboxGroup-Technical-Design
 * documents.
 *
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
    get value(): any {
        return super.getValue();
    }
    set value(selectedValue: any) {
        super.setValue(selectedValue);
    }

    /**
     * To Display multiple checkboxes in a line
     */
    @Input()
    get isInline(): boolean {
        return this._isInline;
    }

    set isInline(inline: boolean) {
        this._isInline = inline;
        this._cd.markForCheck();
    }

    /**
     * Establishes two way binding, when checkbox group used outside form.
     */
    @Input()
    get checked(): string[] {
        return this._checked;
    }
    set checked(checkedValues: string[]) {
        this._checked = checkedValues;
        this.value = checkedValues;
    }

    /** Children checkboxes passed as content */
    @ContentChildren(CheckboxComponent)
    contentCheckboxes: QueryList<CheckboxComponent>;

    /** Children checkboxes created from passed list values. */
    @ViewChildren(CheckboxComponent)
    viewCheckboxes: QueryList<CheckboxComponent>;

    @Output()
    readonly valueChange: EventEmitter<PlatformCheckboxChange> = new EventEmitter<PlatformCheckboxChange>();

    /** Emits checked change event */
    @Output()
    readonly checkedChange: EventEmitter<string[]> = new EventEmitter<string[]>();

    /** @hidden used for two way binding, when used outside form */
    private _checked: string[];

    /** @hidden */
    private _isInline: boolean;

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

        // subscribe to _inlineCurrentValue in collection-form-field-inline-layout
        this._inlineCurrentValue
            .pipe(distinctUntilChanged())
            .subscribe((currentInline) => (this.isInline = currentInline));
    }

    writeValue(value: any): void {
        if (value) {
            super.writeValue(value);
            this.stateChanges.next('CBG: writevalue');
        }
    }

    /**
     * raises event when Checkbox group value changes.
     * @param event: contains checkbox and event in a PlatformCheckboxChange class object.
     */
    public groupValueChanges(event: PlatformCheckboxChange): void {
        if (event instanceof PlatformCheckboxChange) {
            this.checked = event.checked;
            this.onTouched();
            this.valueChange.emit(event);
            this.checkedChange.emit(this.checked);
        }
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
}
