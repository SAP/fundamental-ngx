import {
    AfterViewInit,
    ChangeDetectorRef,
    Directive,
    ElementRef,
    EventEmitter,
    Host,
    HostListener,
    Input,
    OnDestroy,
    Optional,
    Output,
    Self,
    SkipSelf
} from '@angular/core';
import { BaseInput } from './base.input';
import { FormField } from './form-field';
import { FormFieldControl } from './form-control';
import { NgControl, NgForm } from '@angular/forms';

/**
 * Abstract class used by color-related input components.
 */
@Directive()
export abstract class BaseColorInput extends BaseInput implements AfterViewInit, OnDestroy {
    /** @hidden */
    _value: string;

    /**
     * selects the default color of the component
     */
    @Input()
    defaultColor?: string;

    /**
     * Defines whether the user can choose the default color from a button.
     */
    @Input()
    showDefaultColor = false;

    /**
     Defines whether the user can choose a custom color from a component
     */
    @Input()
    showMoreColors = false;

    /**
     * Defines whether the user can see the last used colors in the bottom of the component
     * */
    @Input()
    showRecentColors = false;

    /** Event emitted when the state of the isOpen property changes. */
    @Output()
    readonly itemClick = new EventEmitter<Event>();

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
        private _wcElRef: ElementRef
    ) {
        super(_changeDetectorRef, ngControl, ngForm, formField, formControl);
    }

    /** @hidden */
    ngAfterViewInit(): void {
        super.ngAfterViewInit();
        if (this._contentDensityService) {
            this._contentDensityService.handleWebComponentContentDensity(
                this._wcElRef.nativeElement.classList,
                this._subscriptions
            );
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        super.ngOnDestroy();
        this._subscriptions.unsubscribe();
    }

    /** @hidden */
    colorChange(event: any): void {
        this.value = event.detail.color;
        this.itemClick.emit(event);
    }
}
