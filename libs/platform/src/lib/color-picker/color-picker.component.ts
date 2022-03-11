import {
    Component,
    ChangeDetectorRef,
    Input,
    Optional,
    Self,
    SkipSelf,
    Host,
    ChangeDetectionStrategy,
    HostListener,
    AfterViewInit,
    ElementRef,
    OnDestroy
} from '@angular/core';
import { BaseInput, FormField, FormFieldControl } from '@fundamental-ngx/platform/shared';
import { NgControl, NgForm } from '@angular/forms';
import { isCompactDensity, RtlService } from '@fundamental-ngx/core/utils';

import applyDirection from '@ui5/webcomponents-base/dist/locale/applyDirection.js';

@Component({
    selector: 'fdp-color-picker',
    templateUrl: './color-picker.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: FormFieldControl, useExisting: PlatformColorPickerComponent, multi: true }]
})
export class PlatformColorPickerComponent extends BaseInput implements AfterViewInit, OnDestroy {
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
        @Optional() @SkipSelf() @Host() formControl: FormFieldControl<any>,
        @Optional() private _rtlService: RtlService,
        private _wcElRef: ElementRef
    ) {
        super(_changeDetectorRef, ngControl, ngForm, formField, formControl);
        if (this._rtlService) {
            this._subscriptions.add(
                this._rtlService.rtl.subscribe((value: boolean) => {
                    this._wcElRef.nativeElement.dir = value ? 'rtl' : 'ltr';
                    applyDirection();
                })
            );
        }
        if (this._contentDensityService) {
            this._subscriptions.add(
                this._contentDensityService._contentDensityListener.subscribe((density) => {
                    const classList = this._wcElRef.nativeElement.classList;
                    isCompactDensity(density)
                        ? classList.add('ui5-content-density-compact')
                        : classList.remove('ui5-content-density-compact');
                })
            );
        }
    }

    /** @hidden */
    ngAfterViewInit(): void {
        super.ngAfterViewInit();
    }

    /** @hidden */
    ngOnDestroy(): void {
        super.ngOnDestroy();
        this._subscriptions.unsubscribe();
    }

    /** @hidden */
    colorChange(event: any): void {
        this.value = event.target.valueOf().color;
    }
}
