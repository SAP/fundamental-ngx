import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { BACKSPACE, CONTROL, DELETE, ENTER, ESCAPE, LEFT_ARROW, RIGHT_ARROW } from '@angular/cdk/keycodes';
import { KeyUtil } from '../../functions/key-util';
import {
    DeprecatedSelector,
    FD_DEPRECATED_DIRECTIVE_SELECTOR,
    getDeprecatedModel
} from '../../deprecated-selector.class';

export interface AutoCompleteEvent {
    term: string;
    forceClose: boolean;
}

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fdAutoComplete], [fd-auto-complete]',
    standalone: true,
    providers: [
        {
            provide: FD_DEPRECATED_DIRECTIVE_SELECTOR,
            useValue: getDeprecatedModel('[fdkAutoComplete]', '[fdAutoComplete], [fd-auto-complete]')
        }
    ]
})
export class DeprecatedAutoCompleteDirective extends DeprecatedSelector {}

@Directive({
    selector: '[fdkAutoComplete], [fdAutoComplete], [fd-auto-complete]',
    standalone: true
})
export class AutoCompleteDirective {
    /** Values that will fill missing text in the input. */
    @Input()
    options: any[];

    /**
     * Input text, that is taken from ngModel of formControl,
     * there has to be difference between native input value and model value
     */
    @Input()
    inputText: string;

    /** Whether the auto complete directive should be enabled */
    @Input()
    enable = true;

    /** Display function. Accepts an object of the same type as the
     * items passed to dropdownValues as argument, and outputs a string.
     * An arrow function can be used to access the *this* keyword in the calling component.
     * See search input examples for details. */
    @Input()
    displayFn = this._defaultDisplay;

    /** Event thrown, when the auto ahead text is accepted */
    @Output()
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    readonly onComplete: EventEmitter<AutoCompleteEvent> = new EventEmitter<AutoCompleteEvent>();

    /** @hidden */
    private readonly _completeKeys: number[] = [ENTER];

    /** @hidden */
    private readonly _fillKeys: number[] = [LEFT_ARROW, RIGHT_ARROW];

    /** @hidden */
    private readonly _stopKeys: number[] = [BACKSPACE, DELETE, ESCAPE];

    /** @hidden */
    private oldValue: string;

    /** @hidden */
    private lastKeyUpEvent: KeyboardEvent;

    /** @hidden */
    constructor(private _elementRef: ElementRef) {}

    /** @hidden */
    @HostListener('keyup', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent): void {
        if (this.enable) {
            if (KeyUtil.isKeyCode(event, this._stopKeys)) {
                this._elementRef.nativeElement.value = this.inputText;
            } else if (KeyUtil.isKeyCode(event, this._completeKeys)) {
                this._sendCompleteEvent(true);
                this._moveIndicatorToLastCharacter();
            } else if (KeyUtil.isKeyCode(event, this._fillKeys)) {
                this._sendCompleteEvent(false);
            } else if (!this._isControlKey(event) && this.inputText) {
                /** Prevention from triggering typeahead, when having crtl/cmd + keys */
                if (!this._triggerTypeAhead()) {
                    return;
                }

                this.oldValue = this.inputText;

                const item = this.options.find((option) =>
                    this.displayFn(option).toLocaleLowerCase().startsWith(this.inputText.toLocaleLowerCase())
                );

                if (item) {
                    this._typeahead(this.displayFn(item));
                }
            }
        }
        this.lastKeyUpEvent = event;
    }

    /** @hidden */
    private _typeahead(displayedValue: string): void {
        this._elementRef.nativeElement.value = displayedValue;
        const selectionStartIndex = this.inputText.length;
        this._elementRef.nativeElement.setSelectionRange(selectionStartIndex, displayedValue.length);
    }

    /** @hidden */
    private _isControlKey(event: KeyboardEvent): boolean {
        return KeyUtil.isKeyCode(event, CONTROL) || event.ctrlKey;
    }

    /** @hidden */
    private _defaultDisplay(value: any): string {
        return value;
    }

    /** @hidden */
    private _triggerTypeAhead(): boolean {
        if (
            this.lastKeyUpEvent &&
            KeyUtil.isKeyCode(this.lastKeyUpEvent, CONTROL) &&
            this.inputText === this.oldValue
        ) {
            return false;
        } else {
            return true;
        }
    }

    /** @hidden */
    private _sendCompleteEvent(forceClose: boolean): void {
        this.onComplete.emit({
            term: this._elementRef.nativeElement.value,
            forceClose
        });
    }

    /** @hidden */
    private _moveIndicatorToLastCharacter(): void {
        const inputTextLength = this.inputText?.length ?? 0;
        this._elementRef.nativeElement.setSelectionRange(inputTextLength, inputTextLength);
    }
}
