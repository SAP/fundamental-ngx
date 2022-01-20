import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    HostListener,
    Input,
    Output,
    ViewEncapsulation
} from '@angular/core';

/**
 * Used to represent an option of the select component.
 */
@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fn-option]',
    templateUrl: './option.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        role: 'option',
        class: 'fn-select__item',
        '[attr.tabindex]': 'tabindex'
    }
})
export class ExperimentalOptionComponent {
    /** Value of the option. Similar to how a native select operates. */
    @Input()
    value: string | any;

    /** Whether or not this option is selected. */
    @HostBinding('class.fn-select__item--selected')
    @Input()
    selected = false;

    /** The tabindex of the option. Default is 0. */
    @Input()
    tabindex = '0';

    /** Event emitted when an option is clicked. Emits an ExperimentalOptionComponent */
    @Output()
    optionClicked: EventEmitter<ExperimentalOptionComponent> = new EventEmitter<ExperimentalOptionComponent>();

    /** @hidden */
    @HostListener('focusout')
    _onBlur(): void {
        this._elRef.nativeElement.classList.remove('focus-visible');
    }

    /** @hidden */
    @HostListener('click')
    _optionClicked(): void {
        this.optionClicked.emit(this);
    }

    constructor(private _elRef: ElementRef, private _cdRef: ChangeDetectorRef) {}

    /** @hidden */
    get elementRef(): ElementRef {
        return this._elRef;
    }

    /** @hidden */
    _focus(): void {
        setTimeout(() => {
            this._elRef.nativeElement.focus();
            this._elRef.nativeElement.classList.add('focus-visible');
        });
    }

    /** @hidden */
    _hide(): void {
        this._elRef.nativeElement.style.display = 'none';
    }

    /** @hidden */
    _show(): void {
        this._elRef.nativeElement.style.display = 'list-item';
    }
}
