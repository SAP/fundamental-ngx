import { BACKSPACE, CONTROL, DELETE, ENTER, ESCAPE, LEFT_ARROW, RIGHT_ARROW } from '@angular/cdk/keycodes';
import { DestroyRef, Directive, ElementRef, EventEmitter, Input, Output, inject } from '@angular/core';
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

    /**
     * Tracks the intended user-typed value, derived from native `input` events.
     * When Angular's NgModel re-pushes a stale value (e.g. after Ctrl+A → Delete),
     * the DOM may contain the old model value when the user types the next character.
     * We reconstruct the intended value using the cursor position and typed character.
     */
    private _lastInputEventValue: string | null = null;

    /** @hidden */
    private readonly _elementRef = inject(ElementRef);

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    constructor() {
        /**
         * Fixes #10710
         * With IME input (e.g. Chinese), keyup events fire during composition before the final
         * character is committed. The _isComposing flag suppresses autocomplete logic during
         * composition, and compositionend syncs inputText with the committed native value.
         */
        const keyupEvent = fromEvent<KeyboardEvent>(this._elementRef.nativeElement, 'keyup');
        const compositionStartEvent = fromEvent<CompositionEvent>(this._elementRef.nativeElement, 'compositionstart');
        const compositionEndEvent = fromEvent<CompositionEvent>(this._elementRef.nativeElement, 'compositionend');

        // Track the intended user-typed value. Uses the cursor position and typed character
        // to reconstruct the value the user intended, independent of any NgModel re-push.
        fromEvent<InputEvent>(this._elementRef.nativeElement, 'input')
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((evt) => {
                const el = this._elementRef.nativeElement;
                const cursorPos = el.selectionStart ?? el.value.length;
                if (evt.inputType === 'insertText' && evt.data) {
                    // Cursor is after the inserted char. Intended value = previously tracked
                    // prefix + new char. Handles the case where NgModel re-pushed a stale
                    // value before this keystroke (e.g. "Apple" after Ctrl+A→Delete→"B").
                    const prev = this._lastInputEventValue ?? '';
                    this._lastInputEventValue = prev + evt.data;
                } else {
                    // Deletion, paste, or other input — use current DOM value at cursor.
                    this._lastInputEventValue = el.value.substring(0, cursorPos);
                }
            });

        keyupEvent.pipe(takeUntilDestroyed()).subscribe((evt) => this._handleKeyboardEvent(evt));

        compositionStartEvent.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
            this._isComposing = true;
        });

        compositionEndEvent.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
            this._isComposing = false;
            this.inputText = this._elementRef.nativeElement.value;
        });
    }

    /** Matcher function for testing the str for a search term */
    @Input()
    matcher = (str: string, searchTerm: string): boolean => str.startsWith(searchTerm);

    /** @hidden */
    _handleKeyboardEvent(event: KeyboardEvent): void {
        if (this.enable && !this._isComposing) {
            if (KeyUtil.isKeyCode(event, this._stopKeys)) {
                const el = this._elementRef.nativeElement;
                if (el.selectionStart !== el.selectionEnd) {
                    el.value = this.inputText;
                }
            } else if (KeyUtil.isKeyCode(event, this._completeKeys)) {
                this._sendCompleteEvent(true);
                this._moveIndicatorToLastCharacter();
            } else if (KeyUtil.isKeyCode(event, this._fillKeys)) {
                this._sendCompleteEvent(false);
            } else if (!this._isControlKey(event)) {
                const el = this._elementRef.nativeElement;
                const hasSelection = el.selectionStart !== el.selectionEnd;

                // Use the value from the last native `input` event as the authoritative
                // user-typed value. Angular's NgModel may have re-written el.value with a
                // stale model value (e.g. after Ctrl+A → Delete), but the native `input`
                // event only fires on actual user input — not on programmatic writes.
                const currentNativeValue = this._lastInputEventValue !== null ? this._lastInputEventValue : el.value;
                // After consuming, keep the current value so the next `input` event's
                // `insertText` accumulation has the right prefix.
                this._lastInputEventValue = currentNativeValue;

                if (hasSelection) {
                    return;
                }

                if (!currentNativeValue) {
                    return;
                }

                const effectiveInputText =
                    this.inputText.length > currentNativeValue.length + 1 ||
                    !this.inputText.toLocaleLowerCase().startsWith(currentNativeValue.toLocaleLowerCase())
                        ? currentNativeValue
                        : this.inputText;

                if (!this._triggerTypeAhead()) {
                    return;
                }

                this.oldValue = this.inputText;

                const searchTerm = effectiveInputText || currentNativeValue;
                const item = this.options.find((option) =>
                    this.matcher(this.displayFn(option).toLocaleLowerCase(), searchTerm.toLocaleLowerCase())
                );

                if (item) {
                    const displayedValue = this.displayFn(item);
                    // Only autocomplete if the current native value matches the start of the found item
                    if (displayedValue.toLocaleLowerCase().startsWith(currentNativeValue.toLocaleLowerCase())) {
                        this._typeahead(displayedValue, currentNativeValue.length);
                    }
                }
            }
        }
        this.lastKeyUpEvent = event;
    }

    /** @hidden */
    private _typeahead(displayedValue: string, currentInputLength: number): void {
        this._elementRef.nativeElement.value = displayedValue;
        const selectionStartIndex = currentInputLength;
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
