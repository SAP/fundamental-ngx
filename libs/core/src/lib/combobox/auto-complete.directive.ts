import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { KeyUtil } from '../utils/public_api';

export interface AutoCompleteEvent {
    term: string;
    forceClose: boolean;
}


@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-auto-complete]',
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
    enable: boolean = true;

    /** Display function. Accepts an object of the same type as the
     * items passed to dropdownValues as argument, and outputs a string.
     * An arrow function can be used to access the *this* keyword in the calling component.
     * See search input examples for details. */
    @Input()
    displayFn: Function = this._defaultDisplay;

    /** Event thrown, when the auto ahead text is accepted */
    @Output()
    readonly onComplete: EventEmitter<AutoCompleteEvent> = new EventEmitter<AutoCompleteEvent>();

    private readonly completeKeys: string[] = [
        'Enter'
    ];

    private readonly fillKeys: string[] = [
        'ArrowLeft',
        'ArrowRight'
    ];

    private readonly stopKeys: string[] = [
        'Backspace',
        'Delete',
        'Escape'
    ];

    private oldValue: string;
    private lastKeyUpEvent: KeyboardEvent;

    constructor(
        private _elementRef: ElementRef
    ) {}

    /** @hidden */
    @HostListener('keyup', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent): void {
        if (this.enable) {
            if (KeyUtil.isKey(event, this.stopKeys)) {
                this._elementRef.nativeElement.value = this.inputText;
            } else if (KeyUtil.isKey(event, this.completeKeys)) {
                this.onComplete.emit({
                    term: this._elementRef.nativeElement.value,
                    forceClose: true
                });
            } else if (KeyUtil.isKey(event, this.fillKeys)) {
                this.onComplete.emit({
                    term: this._elementRef.nativeElement.value,
                    forceClose: false
                });
            } else if (!this._isControlKey(event) && this.inputText) {

                /** Prevention from triggering typeahead, when having crtl/cmd + keys */
                if (!this._triggerTypeAhead()) {
                    return
                }

                this.oldValue = this.inputText;

                const item = this.options.find(
                    option => this.displayFn(option).toLocaleLowerCase().startsWith(this.inputText.toLocaleLowerCase())
                );

                if (item) {
                    this._typeahead(this.displayFn(item));
                }
            }
        }
        this.lastKeyUpEvent = event;
    }

    /** @hidden */
    @HostListener('blur')
    onBlur(): void {
        if (this.enable) {
            this._elementRef.nativeElement.value = this.inputText;
        }
    }

    private _typeahead(displayedValue: string): void {
        this._elementRef.nativeElement.value = displayedValue;
        const selectionStartIndex = this.inputText.length;
        this._elementRef.nativeElement.setSelectionRange(selectionStartIndex, displayedValue.length);
    }

    private _isControlKey(event: KeyboardEvent): boolean {
        return (KeyUtil.isKey(event, 'Ctrl') || event.ctrlKey) || KeyUtil.isKey(event, 'Meta');
    }

    private _defaultDisplay(value: any): string {
        return value;
    }

    private _triggerTypeAhead(): boolean {
        if (this.lastKeyUpEvent &&
            KeyUtil.isKey(this.lastKeyUpEvent, 'Ctrl') &&
            this.inputText === this.oldValue) {
            return false;
        } else {
            return true;
        }
    }
}
