import { Component, ChangeDetectorRef, Input, ElementRef } from '@angular/core';
import { BaseComponent } from '@fundamental-ngx/platform/shared';
import { ControlValueAccessor } from '@angular/forms';

@Component({
    selector: 'fdp-color-picker',
    templateUrl: './color-picker.component.html'
})
export class ColorPickerComponent extends BaseComponent implements ControlValueAccessor {
    /** @hidden */
    _colorValue: string;

    /** @hidden */
    onChange: any = () => {};

    /** @hidden */
    onTouched: any = () => {};

    /** Get the value of the text input. */
    @Input()
    get color(): string {
        return this._colorValue;
    }

    /** Set the value of the text input. */
    set color(value) {
        this._colorValue = value;
        this.onChange(value);
        this.onTouched();
    }

    constructor(_cd: ChangeDetectorRef, private _elementRef: ElementRef) {
        super(_cd);
    }

    /** @hidden */
    elementRef(): ElementRef {
        return this._elementRef;
    }

    /** @hidden */
    writeValue(value: any): void {
        this._colorValue = value;
        this._cd.markForCheck();
    }

    /** @hidden */
    registerOnChange(fn): void {
        this.onChange = fn;
    }

    /** @hidden */
    registerOnTouched(fn): void {
        this.onTouched = fn;
    }
}
