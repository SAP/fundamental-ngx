import {
    Component,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    ElementRef,
    ChangeDetectorRef,
    OnInit,
    OnChanges,
    Input,
    Optional,
    Inject,
    forwardRef
} from '@angular/core';
import { InputBase } from './input-base';
import { applyCssClass } from '@fundamental-ngx/core/utils';
import {
    DisabledBehavior,
    FN_DISABLED_DIRECTIVE,
    FN_READONLY_DIRECTIVE,
    ReadonlyBehavior
} from '@fundamental-ngx/fn/cdk';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'fn-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputComponent),
            multi: true
        }
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent extends InputBase implements OnInit, OnChanges, ControlValueAccessor {
    /** User's custom classes */
    @Input()
    class = '';

    /** @hidden */
    inputTextValue: string;

    /** @hidden */
    onChange: any = () => {};

    /** @hidden */
    onTouched: any = () => {};

    /** Get the value of the text input. */
    get inputText(): string {
        return this.inputTextValue;
    }

    /** Set the value of the text input. */
    set inputText(value) {
        this.inputTextValue = value;
        this.onChange(value);
        this.onTouched();
    }

    /** @hidden */
    constructor(
        private _elementRef: ElementRef,
        private _cdr: ChangeDetectorRef,
        @Optional() @Inject(FN_DISABLED_DIRECTIVE) disabled$: DisabledBehavior,
        @Optional() @Inject(FN_READONLY_DIRECTIVE) readonly$: ReadonlyBehavior
    ) {
        super(_cdr, disabled$, readonly$);
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    @applyCssClass
    /** CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    buildComponentCssClass(): string[] {
        return [this.class];
    }

    /** @hidden */
    elementRef(): ElementRef {
        return this._elementRef;
    }

    /** @hidden */
    writeValue(value: any): void {
        this.inputTextValue = value;
        this._cdr.markForCheck();
    }

    /** @hidden */
    registerOnChange(fn): void {
        this.onChange = fn;
    }

    /** @hidden */
    registerOnTouched(fn): void {
        this.onTouched = fn;
    }

    /** @hidden */
    setDisabledState(isDisabled: boolean): void {
        this.disabledByForm = isDisabled;
        this._setDisableReadonlyProperties();
    }
}
