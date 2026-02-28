import { BACKSPACE, CONTROL, DELETE, ENTER, ESCAPE, LEFT_ARROW, RIGHT_ARROW } from '@angular/cdk/keycodes';
import { Directive, ElementRef, EventEmitter, Input, NgZone, Output, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';
import { KeyUtil } from '../../functions';

export interface AutoCompleteEvent {
    term: string;
    forceClose: boolean;
}

@Directive({
    selector: '[fdkAutoComplete]',
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
    private _isComposing = false;

    /** @hidden */
    private readonly _elementRef = inject(ElementRef);

    private readonly _zone = inject(NgZone);

    /** @hidden */

    constructor() {
        /**
         * Fixes #10710
         * With chinese characters inputText property update was triggered after the keyup event trigger.
         * By ensuring that we set all properties we can proceed with stable data.
         */
        this._zone.runOutsideAngular(() => {
            const keyupEvent = fromEvent<KeyboardEvent>(this._elementRef.nativeElement, 'keyup');
            const compositionStartEvent = fromEvent<CompositionEvent>(
                this._elementRef.nativeElement,
                'compositionstart'
            );
            const compositionEndEvent = fromEvent<CompositionEvent>(this._elementRef.nativeElement, 'compositionend');

            keyupEvent.pipe(takeUntilDestroyed()).subscribe((evt) => this._handleKeyboardEvent(evt));

            compositionStartEvent.pipe(takeUntilDestroyed()).subscribe(() => {
                this._isComposing = true;
            });

            compositionEndEvent.pipe(takeUntilDestroyed()).subscribe(() => {
                this._isComposing = false;
                this.inputText = this._elementRef.nativeElement.value;
            });
        });
    }

    /** Matcher function for testing the str for a search term */
    @Input()
    matcher = (str: string, searchTerm: string): boolean => str.startsWith(searchTerm);

    /** @hidden */
    _handleKeyboardEvent(event: KeyboardEvent): void {
        if (this.enable && !this._isComposing) {
            if (KeyUtil.isKeyCode(event, this._stopKeys)) {
                this._elementRef.nativeElement.value = this.inputText;
            } else if (KeyUtil.isKeyCode(event, this._completeKeys)) {
                this._sendCompleteEvent(true);
                this._moveIndicatorToLastCharacter();
            } else if (KeyUtil.isKeyCode(event, this._fillKeys)) {
                this._sendCompleteEvent(false);
            } else if (!this._isControlKey(event) && this.inputText) {
                const hasSelection =
                    this._elementRef.nativeElement.selectionStart !== this._elementRef.nativeElement.selectionEnd;
                if (hasSelection) {
                    return;
                }

                const currentNativeValue = this._elementRef.nativeElement.value;

                if (this.inputText.length > currentNativeValue.length + 1) {
                    this.inputText = currentNativeValue;
                    return;
                }

                if (!this._triggerTypeAhead()) {
                    return;
                }

                this.oldValue = this.inputText;

                const item = this.options.find((option) =>
                    this.matcher(this.displayFn(option).toLocaleLowerCase(), this.inputText.toLocaleLowerCase())
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
        return !(
            this.lastKeyUpEvent &&
            KeyUtil.isKeyCode(this.lastKeyUpEvent, CONTROL) &&
            this.inputText === this.oldValue
        );
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
