import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { BACKSPACE, CONTROL, DELETE, ENTER, ESCAPE, LEFT_ARROW, RIGHT_ARROW } from '@angular/cdk/keycodes';

import { KeyUtil } from '@fundamental-ngx/core';
import { SelectItem } from '../../../../domain/data-model';
import { MatchingStrategy } from '../combobox.config';

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
    options: SelectItem[];

    /**
     * Input text, that is taken from ngModel of formControl,
     * there has to be difference between native input value and model value
     */
    @Input()
    inputText: string;

    @Input()
    matchingStrategy: MatchingStrategy = MatchingStrategy.STARTS_WITH;

    /** Event thrown, when the auto ahead text is accepted */
    @Output()
    readonly onComplete: EventEmitter<AutoCompleteEvent> = new EventEmitter<AutoCompleteEvent>();

    private readonly _completeKeys: number[] = [
        ENTER
    ];

    private readonly _fillKeys: number[] = [
        LEFT_ARROW,
        RIGHT_ARROW
    ];

    private readonly _stopKeys: number[] = [
        BACKSPACE,
        DELETE,
        ESCAPE
    ];

    private oldValue: string;
    private lastKeyUpEvent: KeyboardEvent;

    constructor(private _elementRef: ElementRef) {}

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

            this.oldValue = this.inputText;
            const item = this.searchByStrategy(this.matchingStrategy);
            if (item) {
                this._typeahead(item.label);
            }
        }

        this.lastKeyUpEvent = event;
    }

    private _typeahead(displayedValue: string): void {
        const el = this._elementRef.nativeElement;
        const selectionStartIndex = this.inputText.length;
        const direction = el.selectionDirection;
        el.value = displayedValue;
        el.setSelectionRange(selectionStartIndex, displayedValue.length, direction);
    }

    private _isControlKey(event: KeyboardEvent): boolean {
        return KeyUtil.isKeyCode(event, CONTROL) || event.ctrlKey;
    }

    private _triggerTypeAhead(): boolean {
        return !(
            this.lastKeyUpEvent &&
            KeyUtil.isKeyCode(this.lastKeyUpEvent, CONTROL) &&
            this.inputText === this.oldValue
        )
    }

    private _sendCompleteEvent(forceClose: boolean): void {
        this.onComplete.emit({
            term: this._elementRef.nativeElement.value,
            forceClose: forceClose
        });
    }

    private searchByStrategy(strategy: MatchingStrategy = MatchingStrategy.STARTS_WITH): SelectItem | undefined {
        const findBy = strategy === MatchingStrategy.STARTS_WITH ? this.findByStrategyStartsWith : this.findByStrategyContains;
        const firstItem = this.options[0];

        if (!firstItem) {
            return;
        }

        if (firstItem.isGroup) {
            let matchedSelectItem: SelectItem | undefined;

            for (const option of this.options) {
                matchedSelectItem = findBy(option.children, this.inputText)

                if (matchedSelectItem) {
                    break;
                }
            }

            if (matchedSelectItem) {
                return matchedSelectItem;
            }
        }

        return findBy(this.options, this.inputText);
    }

    private findByStrategyStartsWith(options: SelectItem[], inputText: string): SelectItem | undefined {
        return options.find(option => option.label.toLocaleLowerCase()
            .startsWith(inputText.toLocaleLowerCase()));
    }

    private findByStrategyContains(options: SelectItem[], inputText: string): SelectItem | undefined {
        return options.find(option => option.label.toLocaleLowerCase()
            .indexOf(inputText.toLocaleLowerCase()));
    }
}
