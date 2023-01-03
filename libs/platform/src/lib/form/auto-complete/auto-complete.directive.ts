import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { BACKSPACE, CONTROL, DELETE, ENTER, ESCAPE, LEFT_ARROW, RIGHT_ARROW } from '@angular/cdk/keycodes';

import { KeyUtil } from '@fundamental-ngx/cdk/utils';
import { OptionItem } from '@fundamental-ngx/platform/shared';

export interface AutoCompleteEvent {
    term: string;
    forceClose: boolean;
}

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fdp-auto-complete]'
})
export class AutoCompleteDirective {
    /** Values that will fill missing text in the input. */
    @Input()
    options: OptionItem[];

    /**
     * Input text, that is taken from ngModel of formControl,
     * there has to be difference between native input value and model value
     */
    @Input()
    inputText: string;

    /** Check is directive use in mobile view to prevent additional blur events */
    @Input()
    mobile: boolean;

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
    private _oldValue: string;

    /** @hidden */
    private _lastKeyUpEvent: KeyboardEvent;

    /** @hidden */
    private get _element(): HTMLInputElement {
        return this._elementRef.nativeElement;
    }

    /** @hidden */
    constructor(private readonly _elementRef: ElementRef<HTMLInputElement>) {}

    /** @hidden */
    @HostListener('blur')
    handleBlur(): void {
        if (Boolean(this.inputText) && !this.mobile) {
            this._element.value = this.inputText;
        }
    }

    /** @hidden */
    @HostListener('keyup', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode(event, this._stopKeys)) {
            this._element.value = this.inputText;
        } else if (KeyUtil.isKeyCode(event, this._completeKeys)) {
            this._sendCompleteEvent(true);
        } else if (KeyUtil.isKeyCode(event, this._fillKeys)) {
            this._sendCompleteEvent(false);
        } else if (!this._isControlKey(event) && this.inputText) {
            /** Prevention from triggering typeahead, when having crtl/cmd + keys */
            if (!this._triggerTypeAhead()) {
                return;
            }

            this._oldValue = this.inputText;
            const item = this._searchByStrategy();

            if (item) {
                this._typeahead(item.label);
            }
        }

        this._lastKeyUpEvent = event;
    }

    /** @hidden */
    private _typeahead(displayedValue: string): void {
        const selectionStartIndex = this.inputText.length;
        this._element.value = displayedValue;

        this._setSelectionRange(selectionStartIndex, displayedValue.length);
    }

    /** @hidden */
    private _setSelectionRange(selectionStart: number, selectionEnd: number): void {
        const direction = this._element.selectionDirection;

        this._element.setSelectionRange(selectionStart, selectionEnd, direction ?? undefined);
    }

    /** @hidden */
    private _isControlKey(event: KeyboardEvent): boolean {
        return KeyUtil.isKeyCode(event, CONTROL) || event.ctrlKey;
    }

    /** @hidden */
    private _triggerTypeAhead(): boolean {
        return !(
            this._lastKeyUpEvent &&
            KeyUtil.isKeyCode(this._lastKeyUpEvent, CONTROL) &&
            this.inputText === this._oldValue
        );
    }

    /** @hidden */
    private _sendCompleteEvent(forceClose: boolean): void {
        this.onComplete.emit({
            term: this._element.value,
            forceClose
        });

        if (this.inputText !== this._oldValue) {
            const inputTextLength = this.inputText.length;
            this._element.setSelectionRange(inputTextLength, inputTextLength);
        }
    }

    /** @hidden */
    private _searchByStrategy(): OptionItem | undefined {
        const [firstItem] = this.options;
        if (!firstItem) {
            return;
        }

        if (firstItem.isGroup) {
            let matchedSelectItem: OptionItem | undefined;

            for (const option of this.options) {
                if (!option.children) {
                    continue;
                }
                matchedSelectItem = this._findByStrategyStartsWith(option.children, this.inputText);

                if (matchedSelectItem) {
                    break;
                }
            }

            if (matchedSelectItem) {
                return matchedSelectItem;
            }
        }

        return this._findByStrategyStartsWith(this.options, this.inputText);
    }

    /** @hidden */
    private _findByStrategyStartsWith(options: OptionItem[], inputText: string): OptionItem | undefined {
        return options.find((option) => option.label.toLocaleLowerCase().startsWith(inputText.toLocaleLowerCase()));
    }
}
