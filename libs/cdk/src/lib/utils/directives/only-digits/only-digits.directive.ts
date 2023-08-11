import {
    A,
    BACKSPACE,
    C,
    DASH,
    DELETE,
    END,
    ENTER,
    ESCAPE,
    HOME,
    LEFT_ARROW,
    NUMPAD_MINUS,
    RIGHT_ARROW,
    TAB,
    V,
    X
} from '@angular/cdk/keycodes';
import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { KeyUtil } from '../../functions';

@Directive({
    selector: '[fdkOnlyDigits]',
    standalone: true
})
export class OnlyDigitsDirective {
    /** Allow using decimal */
    @Input() decimal = false;
    /** Define decimal separator
     * Default: .(dot)
     */
    @Input() decimalSeparator = '.';

    /** @hidden */
    private _inputElement: HTMLInputElement;
    /** @hidden */
    private _hasDecimalPoint = false;

    /** @hidden */
    constructor(private readonly _el: ElementRef) {
        this._inputElement = this._el.nativeElement;
    }

    /** @hidden */
    @HostListener('keydown', ['$event'])
    onKeyDown(e: KeyboardEvent): void {
        if (
            // Allow: Delete, Backspace, Tab, Escape, Enter, End, Home, Arrow Left, Arrow Right
            KeyUtil.isKeyCode(e, [DELETE, BACKSPACE, TAB, ESCAPE, ENTER, END, HOME, LEFT_ARROW, RIGHT_ARROW]) ||
            // Allow: Ctrl+(A/C/V/X) and Cmd+(A/C/V/X) (Mac)
            (KeyUtil.isKeyCode(e, [A, C, V, X]) && (e.ctrlKey || e.metaKey))
        ) {
            return; // let it happen, don't do anything
        }

        if (KeyUtil.isKeyCode(e, [DASH, NUMPAD_MINUS])) {
            const newValue = this._forecastValue(e.key);

            if (this._inputElement.value[0] === '-' || newValue[0] !== '-') {
                e.preventDefault();

                return; // has DASH point
            } else {
                return; // Allow: only one DASH point
            }
        }

        if (this.decimal && e.key === this.decimalSeparator) {
            const newValue = this._forecastValue(e.key);
            if (newValue.split(this.decimalSeparator).length > 2) {
                // has two or more decimal points
                e.preventDefault();
                return;
            } else {
                this._hasDecimalPoint = newValue.indexOf(this.decimalSeparator) > -1;
                return; // Allow: only one decimal point
            }
        }

        // Ensure that it is a number and stop the keypress
        if (e.key === ' ' || isNaN(Number(e.key))) {
            e.preventDefault();
            return;
        }
    }

    /** @hidden */
    @HostListener('paste', ['$event'])
    onPaste(event: any): void {
        if (window['clipboardData']) {
            // Browser is IE
            this._pasteData(window['clipboardData'].getData('text'));
        } else if (event.clipboardData && event.clipboardData.getData) {
            // Other browsers
            this._pasteData(event.clipboardData.getData('text/plain'));
        }

        event.preventDefault();
    }

    /** @hidden */
    @HostListener('drop', ['$event'])
    onDrop(event: DragEvent): void {
        const textData = event.dataTransfer?.getData('text') ?? '';
        this._inputElement.focus();
        this._pasteData(textData);

        event.preventDefault();
    }

    /** @hidden */
    private _pasteData(pastedContent: string): void {
        const sanitizedContent = this._sanitizeInput(pastedContent);
        const pasted = document.execCommand('insertText', false, sanitizedContent);
        if (!pasted) {
            if (this._inputElement.setRangeText) {
                const { selectionStart: start, selectionEnd: end } = this._inputElement;
                this._inputElement.setRangeText(sanitizedContent, start ?? 0, end ?? 0, 'end');
                // Angular's Reactive Form relies on "input" event, but on Firefox, the setRangeText method doesn't trigger it
                // so we have to trigger it ourself.
                if (typeof window['InstallTrigger'] !== 'undefined') {
                    this._inputElement.dispatchEvent(new Event('input', { cancelable: true }));
                }
            } else {
                // Browser does not support setRangeText, e.g. IE
                this._insertAtCursor(this._inputElement, sanitizedContent);
            }
        }

        if (this.decimal) {
            this._hasDecimalPoint = this._inputElement.value.indexOf(this.decimalSeparator) > -1;
        }
    }

    // The following 2 methods were added from the below article for browsers that do not support setRangeText
    // https://stackoverflow.com/questions/11076975/how-to-insert-text-into-the-textarea-at-the-current-cursor-position
    /** @hidden */
    private _insertAtCursor(myField: HTMLInputElement, myValue: string): void {
        const startPos = myField.selectionStart ?? 0;
        const endPos = myField.selectionEnd ?? 0;

        myField.value =
            myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length);

        const pos = startPos + myValue.length;
        myField.focus();
        myField.setSelectionRange(pos, pos);

        this._triggerEvent(myField, 'input');
    }

    /** @hidden */
    private _triggerEvent(el: HTMLInputElement, type: string): void {
        if ('createEvent' in document) {
            // modern browsers, IE9+
            const e = document.createEvent('HTMLEvents');
            e.initEvent(type, false, true);
            el.dispatchEvent(e);
        }
    }
    // end stack overflow code

    /** @hidden */
    private _sanitizeInput(input: string): string {
        let result = '';
        if (this.decimal && this._isValidDecimal(input)) {
            const regex = new RegExp(`[^0-9${this.decimalSeparator}]`, 'g');
            result = input.replace(regex, '');
        } else {
            result = input.replace(/[^0-9]/g, '');
        }

        if (input[0] === '-') {
            result = `-${result}`;
        }

        const maxLength = this._inputElement.maxLength;
        if (maxLength > 0) {
            // the input element has maxLength limit
            const allowedLength = maxLength - this._inputElement.value.length;
            result = allowedLength > 0 ? result.substring(0, allowedLength) : '';
        }

        return result;
    }

    /** @hidden */
    private _isValidDecimal(string: string): boolean {
        if (!this._hasDecimalPoint) {
            return string.split(this.decimalSeparator).length <= 2;
        } else {
            // the input element already has a decimal separator
            const selectedText = this._getSelection;
            if (selectedText && selectedText.indexOf(this.decimalSeparator) > -1) {
                return string.split(this.decimalSeparator).length <= 2;
            } else {
                return string.indexOf(this.decimalSeparator) < 0;
            }
        }
    }

    /** @hidden */
    private get _getSelection(): string {
        const { selectionStart, selectionEnd } = this._inputElement;

        return this._inputElement.value.substring(selectionStart ?? 0, selectionEnd ?? 0);
    }

    /** @hidden */
    private _forecastValue(key: string): string {
        const { selectionStart, selectionEnd, value: oldValue } = this._inputElement;
        const selection = oldValue.substring(selectionStart ?? 0, selectionEnd ?? 0);

        return selection
            ? oldValue.replace(selection, key)
            : oldValue.substring(0, selectionStart ?? 0) + key + oldValue.substring(selectionStart ?? 0);
    }
}
