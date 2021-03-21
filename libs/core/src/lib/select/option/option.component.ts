import {
    AfterViewChecked,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    OnDestroy,
    Output,
    ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs';
import {
    FocusableOption,
    FocusOrigin
} from '@angular/cdk/a11y';
import {
    ENTER,
    hasModifierKey,
    SPACE
} from '@angular/cdk/keycodes';

import { KeyUtil } from '../../utils/functions/key-util';
import { OptionsInterface } from '../options.interface';

let optionUniqueId = 0;

/**
 * Event object emitted by OptionComponent when
 * selected or deselected. *
 */
export class FdOptionSelectionChange {
    constructor(
        /** Reference to the option that emitted the event. */
        readonly source: OptionComponent,
        /** Whether the change in the option's value was a result of a user action. */
        readonly isUserInput = false
    ) { }
}


/**
 * Used to represent an option of the select component.
 */
@Component({
    selector: 'fd-option',
    templateUrl: './option.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'fd-list__item',
        '[attr.aria-disabled]': 'disabled',
        '[attr.aria-selected]': 'selected',
        '[attr.aria-label]': '"item"',
        '[class.is-focus]': 'active',
        '[attr.id]': 'id',
        '[tabindex]': 'disabled ? -1 : 0',
        role: 'option',
        '(click)': '_selectViaInteraction()',
        '(keydown)': '_handleKeydown($event)'
    },
    styles: [`
            .fd-list__item[aria-disabled='true'],
            .fd-list__item.is-disabled,
            .fd-list__item:disabled {
                opacity: 0.4;
                cursor: not-allowed;
            }

            .fd-list__item:disabled:focus {
                outline: none;
            }
        `
    ]
})
export class OptionComponent implements AfterViewChecked, OnDestroy, FocusableOption, OptionsInterface {
    /** Option id attribute */
    @Input()
    id = `fd-option-${optionUniqueId++}`;

    /** Value of the option. Similar to how a native select operates. */
    @Input()
    value: any;

    /** Whether to disable this option specifically. */
    @Input()
    disabled = false;

    /**
     * Emits event when option is selected or deselected.
     */
    @Output()
    readonly selectionChange = new EventEmitter<FdOptionSelectionChange>();

    @HostBinding('class.is-selected')
    selected = false;

    /**
     * The displayed value of the option. It shows the selected option in the select's trigger.
     */
    get viewValue(): string {
        return (this._elementRef.nativeElement.textContent || '').trim();
    }

    /**used in components like autocomplete where focus must remain on the input.*/
    get active(): boolean {
        return this._active;
    }

    readonly _stateChanges = new Subject<void>();

    /** @hidden */
    private _mostRecentViewValue = '';

    /** @hidden */
    private _active = false;

    /** @hidden */
    constructor(private _elementRef: ElementRef, private _changeDetectorRef: ChangeDetectorRef) { }

    /**@hidden
     *  Since select components could be using the option's label to display the selected values
     *  and they don't have a way of knowing if the option's label has changed
     * we have to check for changes in the DOM ourselves and dispatch an event
     */
    ngAfterViewChecked(): void {
        if (this.selected) {
            const viewValue = this.viewValue;

            if (viewValue !== this._mostRecentViewValue) {
                this._mostRecentViewValue = viewValue;
                this._stateChanges.next();
            }
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._stateChanges.complete();
    }

    /** @hidden
 * This method sets display styles on the option to make it appear
 * active. This is used by the ActiveDescendantKeyManager so key
 * events will display the proper options as active on arrow key events.
 */
    setActiveStyles(): void {
        if (!this._active) {
            this._active = true;
            this._changeDetectorRef.markForCheck();
        }
    }

    /** @hidden
     * This method removes display styles on the option that made it appear
     * active. This is used by the ActiveDescendantKeyManager so key
     * events will display the proper options as active on arrow key events.
     */
    setInactiveStyles(): void {
        if (this._active) {
            this._active = false;
            this._changeDetectorRef.markForCheck();
        }
    }

    /** @hidden
     * Focuses the element. */
    focus(_origin?: FocusOrigin, options?: FocusOptions): void {

        const element = this._elementRef.nativeElement;

        if (typeof element.focus === 'function') {
            element.focus(options);
        }
    }

    /** @hidden
   * option value
   */
    getLabel(): string {
        return this.viewValue;
    }

    /** @hidden
     * Returns HTMLElement representation of the component. */
    _getHtmlElement(): HTMLElement {
        return this._elementRef.nativeElement as HTMLElement;
    }

    /** Selects the option.
     * * @hidden
     */
    _select(): void {
        if (!this.selected) {
            this.selected = true;
            this._changeDetectorRef.markForCheck();
            this.selectionChange.emit(new FdOptionSelectionChange(this, false));
        }
    }

    /** @hidden
     * Deselects the option.
     */
    _deselect(): void {
        if (this.selected) {
            this.selected = false;
            this._changeDetectorRef.markForCheck();
            this.selectionChange.emit(new FdOptionSelectionChange(this, false));
        }
    }

    /**
     * Ensures the option is selected when activated from the keyboard.
     *
     * @hidden
     */
    _handleKeydown(event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode(event, [ENTER, SPACE]) && !hasModifierKey(event)) {
            this._selectViaInteraction();
            event.preventDefault();
        }
    }

    /** @hidden */
    _selectViaInteraction(): void {
        if (!this.disabled) {
            this.selected = true;
            this._changeDetectorRef.markForCheck();
            this.selectionChange.emit(new FdOptionSelectionChange(this, true));
        }
    }
}
