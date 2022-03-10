import {
    Component,
    ChangeDetectorRef,
    Input,
    Optional,
    Self,
    SkipSelf,
    Host,
    ChangeDetectionStrategy,
    HostListener
} from '@angular/core';
import { BaseInput, FormField, FormFieldControl } from '@fundamental-ngx/platform/shared';
import { NgControl, NgForm } from '@angular/forms';

@Component({
    selector: 'fdp-color-picker',
    templateUrl: './color-picker.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: FormFieldControl, useExisting: PlatformColorPickerComponent, multi: true }]
})
export class PlatformColorPickerComponent extends BaseInput {
    /** @hidden */
    _value: string;

    /** @hidden */
    @HostListener('click')
    onClick(): void {
        this.onTouched();
    }

    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('color')
    get value(): string {
        return this._value;
    }
    set value(colorValue: string) {
        this._value = colorValue;
        this.onChange(colorValue);
        this.onTouched();
    }

    /** @hidden */
    onFocus(): void {
        this.onTouched();
    }

    constructor(
        protected _changeDetectorRef: ChangeDetectorRef,
        @Optional() @Self() public ngControl: NgControl,
        @Optional() @Self() public ngForm: NgForm,
        @Optional() @SkipSelf() @Host() formField: FormField,
        @Optional() @SkipSelf() @Host() formControl: FormFieldControl<any>
    ) {
        super(_changeDetectorRef, ngControl, ngForm, formField, formControl);
    }

    /** @hidden */
    colorChange(event: any): void {
        this.value = event.target.valueOf().color;
    }
}
