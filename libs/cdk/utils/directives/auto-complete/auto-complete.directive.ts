import { BACKSPACE, CONTROL, DELETE, ENTER, ESCAPE, LEFT_ARROW, RIGHT_ARROW } from '@angular/cdk/keycodes';
import { Directive, ElementRef, EventEmitter, Input, NgZone, Output, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent, map, switchMap } from 'rxjs';
import { first } from 'rxjs/operators';
import { KeyUtil } from '../../functions/key-util';

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

    /** Matcher function for testing the str for a search term */
    @Input()
    matcher = (str: string, searchTerm: string): boolean => str.startsWith(searchTerm);

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

    /** @ignore */
    private readonly _completeKeys: number[] = [ENTER];

    /** @ignore */
    private readonly _fillKeys: number[] = [LEFT_ARROW, RIGHT_ARROW];

    /** @ignore */
    private readonly _stopKeys: number[] = [BACKSPACE, DELETE, ESCAPE];

    /** @ignore */
    private oldValue: string;

    /** @ignore */
    private lastKeyUpEvent: KeyboardEvent;

    /** @ignore */
    private readonly _elementRef = inject(ElementRef);

    private readonly _zone = inject(NgZone);

    /** @ignore */
    // eslint-disable-next-line @typescript-eslint/member-ordering
    constructor() {
        /**
         * Fixes #10710
         * With chinese characters inputText property update was triggered after the keyup event trigger.
         * By ensuring that we set all properties we can proceed with stable data.
         */
        this._zone.runOutsideAngular(() => {
            const keyupEvent = fromEvent<KeyboardEvent>(this._elementRef.nativeElement, 'keyup');
            keyupEvent
                .pipe(
                    switchMap((evt) =>
                        this._zone.onStable.pipe(
                            first(),
                            map(() => evt)
                        )
                    ),
                    takeUntilDestroyed()
                )
                .subscribe((evt) => this._handleKeyboardEvent(evt));
        });
    }

    /** @ignore */
    _handleKeyboardEvent(event: KeyboardEvent): void {
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
                    this.matcher(this.displayFn(option).toLocaleLowerCase(), this.inputText.toLocaleLowerCase())
                );

                if (item) {
                    this._typeahead(this.displayFn(item));
                }
            }
        }
        this.lastKeyUpEvent = event;
    }

    /** @ignore */
    private _typeahead(displayedValue: string): void {
        this._elementRef.nativeElement.value = displayedValue;
        const selectionStartIndex = this.inputText.length;
        this._elementRef.nativeElement.setSelectionRange(selectionStartIndex, displayedValue.length);
    }

    /** @ignore */
    private _isControlKey(event: KeyboardEvent): boolean {
        return KeyUtil.isKeyCode(event, CONTROL) || event.ctrlKey;
    }

    /** @ignore */
    private _defaultDisplay(value: any): string {
        return value;
    }

    /** @ignore */
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

    /** @ignore */
    private _sendCompleteEvent(forceClose: boolean): void {
        this.onComplete.emit({
            term: this._elementRef.nativeElement.value,
            forceClose
        });
    }

    /** @ignore */
    private _moveIndicatorToLastCharacter(): void {
        const inputTextLength = this.inputText?.length ?? 0;
        this._elementRef.nativeElement.setSelectionRange(inputTextLength, inputTextLength);
    }
}
