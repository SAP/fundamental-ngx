import {
    ChangeDetectionStrategy, ChangeDetectorRef,
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
    // tslint:disable-next-line:component-selector
    selector: '[fn-option]',
    templateUrl: './option.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        role: 'option',
        class: 'fn-select__item',
        tabindex: '0'
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

    @Output()
    optionClicked: EventEmitter<ExperimentalOptionComponent> = new EventEmitter<ExperimentalOptionComponent>();

    @HostListener('focusout')
    _onBlur(): void {
        this._elRef.nativeElement.classList.remove('focus-visible');
    }

    @HostListener('click')
    _optionClicked(): void {
        this.optionClicked.emit(this);
    }

    constructor(private _elRef: ElementRef) {}

    focus(): void {
        this._elRef.nativeElement.focus();
        this._elRef.nativeElement.classList.add('focus-visible');
    }

    hide(): void {
        this._elRef.nativeElement.style.display = 'none';
    }

    show(): void {
        this._elRef.nativeElement.style.display = 'list-item';
    }

}
