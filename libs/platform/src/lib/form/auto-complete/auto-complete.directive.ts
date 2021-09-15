import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { BACKSPACE, CONTROL, DELETE, ENTER, ESCAPE, LEFT_ARROW, RIGHT_ARROW } from '@angular/cdk/keycodes';

import { KeyUtil } from '@fundamental-ngx/core/utils';
import { OptionItem } from '@fundamental-ngx/platform/shared';

export interface AutoCompleteEvent {
    term: string;
    forceClose: boolean;
}

@Directive({
    // tslint:disable-next-line:directive-selector
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
    readonly onComplete: EventEmitter<AutoCompleteEvent> = new EventEmitter<AutoCompleteEvent>();

    private readonly _completeKeys: number[] = [ENTER];

    private readonly _fillKeys: number[] = [LEFT_ARROW, RIGHT_ARROW];

    private readonly _stopKeys: number[] = [BACKSPACE, DELETE, ESCAPE];

    private _oldValue: string;
    private _lastKeyUpEvent: KeyboardEvent;

    constructor(private readonly _elementRef: ElementRef) {}

    /** @hidden */
    @HostListener('blur')
    handleBlur(): void {
        if (Boolean(this.inputText) && !this.mobile) {
            this._elementRef.nativeElement.value = this.inputText;
        }
    }

    /** @hidden */
    @HostListener('keyup', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode(event, this._stopKeys)) {
            this._elementRef.nativeElement.value = this.inputText;
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

    private _typeahead(displayedValue: string): void {
        const selectionStartIndex = this.inputText.length;
        const el = this._elementRef.nativeElement;
        el.value = displayedValue;

        this._setSelectionRange(selectionStartIndex, displayedValue.length);
    }

    private _setSelectionRange(selectionStart: number, selectionEnd: number): void {
        const el = this._elementRef.nativeElement;
        const direction = el.selectionDirection;

        el.setSelectionRange(selectionStart, selectionEnd, direction);
    }

    private _isControlKey(event: KeyboardEvent): boolean {
        return KeyUtil.isKeyCode(event, CONTROL) || event.ctrlKey;
    }

    private _triggerTypeAhead(): boolean {
        return !(
            this._lastKeyUpEvent &&
            KeyUtil.isKeyCode(this._lastKeyUpEvent, CONTROL) &&
            this.inputText === this._oldValue
        );
    }

    private _sendCompleteEvent(forceClose: boolean): void {
        this.onComplete.emit({
            term: this._elementRef.nativeElement.value,
            forceClose: forceClose
        });
    }

    private _searchByStrategy(): OptionItem | undefined {
        const firstItem = this.options[0];
        if (!firstItem) {
            return;
        }

        if (firstItem.isGroup) {
            let matchedSelectItem: OptionItem | undefined;

            for (const option of this.options) {
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

    private _findByStrategyStartsWith(options: OptionItem[], inputText: string): OptionItem | undefined {
        return options.find((option) => option.label.toLocaleLowerCase().startsWith(inputText.toLocaleLowerCase()));
    }
}
