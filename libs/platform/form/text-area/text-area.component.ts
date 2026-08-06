import { BACKSPACE, DELETE } from '@angular/cdk/keycodes';
import {
    AfterViewChecked,
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    computed,
    ElementRef,
    HostListener,
    Input,
    OnInit,
    signal,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FD_FORM_FIELD_CONTROL } from '@fundamental-ngx/cdk/forms';
import { KeyUtil, Nullable } from '@fundamental-ngx/cdk/utils';
import { FormControlComponent } from '@fundamental-ngx/core/form';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { BaseInput } from '@fundamental-ngx/platform/shared';
import { TextAreaConfig } from './text-area.config';

const VALID_WRAP_TYPES = ['hard', 'soft', 'off'];

export type WrapType = 'hard' | 'soft' | 'off';

/**
 * Textarea field implementation that is compliant with Platform's FormGroup/FormField design
 *
 */
@Component({
    selector: 'fdp-textarea',
    templateUrl: 'text-area.component.html',
    styleUrl: 'text-area.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [
        {
            provide: FD_FORM_FIELD_CONTROL,
            useExisting: TextAreaComponent,
            multi: true
        }
    ],
    imports: [FormControlComponent, FormsModule, FdTranslatePipe]
})
export class TextAreaComponent extends BaseInput implements AfterViewChecked, OnInit, AfterViewInit {
    /**
     * The height to which the textarea will grow when `growing` is set.
     */
    @Input()
    height: Nullable<string>;

    /**
     * The number of rows that will be visible when `growing` is set.
     * If both `growingMaxLines` and `height` are provided, `height` value takes precedence.
     */
    @Input()
    growingMaxLines: Nullable<number>;

    /**
     * The textarea `cols` attribute wrapped- the number of letters visible per line.
     * If width is set to auto, this attribute has no effect.
     */
    @Input()
    cols: number;

    /**
     * The textarea `wrap` attribute - can be one of three: 'off', 'hard' or 'soft'.
     */
    @Input()
    wrapType: WrapType = 'soft';

    /** The maximum number of characters allowed to enter.
     * If `showExceededText` is false, `maxLength` has native textarea's behavior of disallowing typing beyond `maxLength`.
     * If `showExceededText` is true, user is allowed to type beyond `maxLength`, but error states and counter messages showing
     * the exceeded count is displayed.
     */
    @Input()
    maxLength: number;

    /**
     * Whether counter message should be shown.
     * If `showExceededText` is false, no state changes or error messages are shown. User is simply not allowed to type
     * beyond the `maxLength` characters.
     */
    @Input()
    showExceededText = false;

    /**
     * Whether this textarea can grow.
     */
    @Input()
    growing = false;

    /**
     * The textarea's value
     */
    @Input()
    set value(value: any) {
        if (value) {
            super.setValue(value);
        } else {
            // when custom value not set, reset character count to 0
            this._textAreaCharCount.set(0);
            // reset state by resetting value
            super.setValue('');
        }
    }
    get value(): any {
        return super.getValue();
    }

    /** @hidden */
    @ViewChild('counter')
    _textareaCounter?: ElementRef<HTMLDivElement>;

    /** @hidden flag to check if there is an initial value set */
    isValueCustomSet = false;

    /**
     * @hidden
     * Computed signal that derives counter state from character count.
     * Returns 'excess' when over maxLength, 'remaining' otherwise.
     */
    protected readonly counterExcessOrRemaining = computed<'remaining' | 'excess'>(() => {
        if (!this.maxLength) {
            return 'remaining';
        }
        return this._textAreaCharCount() > this.maxLength ? 'excess' : 'remaining';
    });

    /**
     * @hidden
     * Computed signal for the counter value (either exceeded or remaining count).
     */
    protected readonly exceededCharCount = computed(() => {
        if (!this.maxLength) {
            return 0;
        }
        const count = this._textAreaCharCount();
        return count > this.maxLength ? count - this.maxLength : this.maxLength - count;
    });

    /**
     * @hidden
     * Computed signal that determines if text has exceeded maxLength.
     * Used for state management.
     */
    protected readonly hasTextExceeded = computed(
        () => this.maxLength > 0 && this._textAreaCharCount() > this.maxLength
    );

    /**
     * @hidden
     * Computed signal that returns the effective state.
     * Returns 'error' when showExceededText is true and text exceeds maxLength,
     * otherwise returns the base state from the parent.
     */
    protected readonly effectiveState = computed(() => {
        if (this.showExceededText && this.hasTextExceeded()) {
            return 'error' as const;
        }
        return this.state;
    });

    /** @hidden */
    private _isPasted = false;

    /** @hidden */
    /** to keep track of number of characters in the textarea */
    private readonly _textAreaCharCount = signal(0);

    /**
     * @hidden
     * @see PlatformFormFieldControl.extraContentHeightPx
     */
    get extraContentHeightPx(): number | undefined {
        return this._textareaCounter?.nativeElement.offsetHeight;
    }

    /** @hidden */
    private get _shouldTrackTextLimit(): boolean {
        return this.maxLength > 0 && !this.showExceededText;
    }

    /** @hidden */
    constructor(protected _textAreaConfig: TextAreaConfig) {
        super();
        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
        }
    }

    /** when backpress or delete key is pressed when showExceededText field is not set, simply remove excess characters,
     /* else handle autogrow case
     */
    @HostListener('keyup', ['$event'])
    handleBackPress(event: KeyboardEvent): void {
        // if not showing exceeded text message/interactions or growing, and custom value set
        if (this.growing) {
            this.autoGrowTextArea();
            this.isValueCustomSet = false; // set it to false first time it comes here
        }
        if (this._shouldTrackTextLimit && KeyUtil.isKeyCode(event, [DELETE, BACKSPACE])) {
            // for the custom value set and showExceededText=false case, on any key press, remove excess characters
            if (this.value) {
                this._textAreaCharCount.set(this.value.length);
                if (this._textAreaCharCount() > this.maxLength) {
                    // remove excess characters
                    this.value = this.value.substring(0, this.maxLength);
                    this.isValueCustomSet = false; // since value is now changed, it is no longer custom set
                }
            }
        }
    }

    /** @hidden */
    ngOnInit(): void {
        if (!this.wrapType || VALID_WRAP_TYPES.indexOf(this.wrapType) === -1) {
            throw new Error(`Textarea wrap type ${this.wrapType} is not supported`);
        }
        // if custom value is set, mark it for validation
        if (this.value) {
            this.isValueCustomSet = true;
        }
        super.ngOnInit();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        // set max height
        this._setMaxHeight();

        // don't set any error state if we are not showing counter message
        if (!this._shouldTrackTextLimit) {
            this.state = undefined;
        }

        super.ngAfterViewInit();
    }

    /** @hidden */
    ngAfterViewChecked(): void {
        // when value is custom set(initial value is present), the heights don't get
        // set to show the full text in the ngAfterViewInit immediately. therefore, we call autoGrowTextArea in
        // ngAfterViewChecked and detect changes again.
        if (this.value && this.isValueCustomSet) {
            this.autoGrowTextArea(); // if applicable, grow the textarea when value is custom set
            this.stateChanges.next('textarea: ngAfterViewChecked');
        }
    }

    /** write value for ControlValueAccessor */
    writeValue(value: any): void {
        super.writeValue(value ?? '');
        this.updateCounterInteractions();
        this.stateChanges.next('textarea: writeValue');
    }

    /** update the counter message and related interactions */
    updateCounterInteractions(): void {
        this._textAreaCharCount.set(this.value?.length ?? 0);

        if (this.maxLength) {
            // newly added to avoid unnecessary iteration, remove if issue found
            this.validateLengthOnCustomSet();
        }
    }

    /** if exceeded maxlength when set as a value in code, highlight the exceeded text. */
    validateLengthOnCustomSet(): void {
        if (this._textAreaCharCount() > this.maxLength) {
            if (this._isPasted) {
                this._targetElement.focus();
                this._targetElement.setSelectionRange(this.maxLength, this._textAreaCharCount());
            }
        }

        this._isPasted = false;
    }

    /** handle exceeded maxlength case when text is pasted */
    handlePasteInteraction(): void {
        this._isPasted = true;

        // Wrapped in timeout to make selecting range working
        setTimeout(() => this.updateCounterInteractions());
    }

    /** handle auto growing of textarea */
    autoGrowTextArea(): void {
        if (this.growing) {
            this._targetElement.style.height = 'inherit';
            const textareaTotalHeight = this._getTextareaTotalHeight();
            const maxHeight = parseInt(this._targetElement.style.maxHeight as string, 10);
            if (maxHeight) {
                if (textareaTotalHeight <= maxHeight) {
                    this._targetElement.style.height = textareaTotalHeight + 'px';
                } else {
                    if (this.height) {
                        this._targetElement.style.height = this.height;
                    } else {
                        this._targetElement.style.height = maxHeight + 'px';
                    }
                }
            } else {
                // no bound max height, keep growing
                this._targetElement.style.height = textareaTotalHeight + 'px';
            }
        }
    }

    /**
     * get line height of textarea
     */
    getTextareaLineHeight(): number {
        // Get the computed styles for the element
        if (this._targetElement) {
            const computedStyle = window.getComputedStyle(this._targetElement);

            // Calculate the height
            return parseInt(computedStyle.getPropertyValue('line-height'), 10);
        }
        return 20; // default line height if nothing is defined
    }

    /** @hidden Native element  */
    get _targetElement(): HTMLTextAreaElement {
        return this._elementRef?.nativeElement;
    }

    /** @hidden get the total height including borders and scroll height */
    private _getTextareaTotalHeight(): number {
        // Get the computed styles for the element
        const computedStyle = window.getComputedStyle(this._targetElement);
        // Calculate the height
        return (
            parseInt(computedStyle.getPropertyValue('border-top-width'), 10) +
            this._targetElement.scrollHeight +
            parseInt(computedStyle.getPropertyValue('border-bottom-width'), 10)
        );
    }

    /** @hidden set initial max height **/
    private _setMaxHeight(): void {
        if (this.growing && this._targetElement) {
            if (this.growingMaxLines) {
                this._targetElement.style.maxHeight = this.growingMaxLines * this.getTextareaLineHeight() + 'px';
            }
            if (this.height) {
                this._targetElement.style.maxHeight = this.height;
            }
        } else {
            if (this.growingMaxLines) {
                // nothing to do here. rows attribute takes care.
            }
            if (this.height) {
                this._targetElement.style.height = this.height;
            }
        }
    }
}
