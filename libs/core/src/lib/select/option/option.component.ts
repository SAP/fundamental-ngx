import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    HostListener,
    Input,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';

/**
 * Used to represent an option of the select component.
 */
@Component({
    selector: 'fd-option',
    templateUrl: './option.component.html',
    styleUrls: ['./option.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class.fd-option-default-custom]': 'true',
        '[attr.aria-disabled]': 'disabled',
        '[tabindex]': 'disabled ? -1 : 0',
        'role': 'option',
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionComponent implements OnInit {

    /** @hidden */
    @HostBinding('class.fd-menu__item')
    fdMenuItemClass: boolean = true;

    /** @hidden */
    @HostBinding('class.is-selected')
    selected: boolean = false;

    /** Value of the option. Similar to how a native select operates. */
    @Input()
    value: any;

    /** Whether to disable this option specifically. */
    @Input()
    disabled: boolean = false;

    /** Override for the view value of the option. If none is provided, the text content is used. */
    @Input()
    viewValue: string;

    /** Emitted when the selected state changes. */
    @Output()
    readonly selectedChange: EventEmitter<OptionComponent>
        = new EventEmitter<OptionComponent>();

    /** @hidden */
    constructor(
        private _elRef: ElementRef,
        private _changeDetRef: ChangeDetectorRef
    ) {}


    /** @hidden */
    ngOnInit(): void {
        if (this.selected && !this.disabled) {
            this.focus();
        }
    }

    /** Returns the view value text of the option, or the viewValue input if it exists. */
    get viewValueText(): string {
        return this.viewValue ? this.viewValue :
            ((this._elRef.nativeElement as HTMLElement).textContent || '').trim();
    }

    /** Returns the view value text of the option, or the viewValue input if it exists. */
    setSelected(value: boolean, fireEvent: boolean = true): void {
        this.selected = value;

        if (fireEvent) {
            this.selectedChange.emit(this);
        }
    }

    /** Focuses the element. */
    focus(): void {
        (this._elRef.nativeElement as HTMLElement).focus();
    }

    /** Returns HTMLElement representation of the component. */
    getHtmlElement(): HTMLElement {
        return this._elRef.nativeElement as HTMLElement;
    }

    /** @hidden */
    @HostListener('keydown.enter')
    @HostListener('click')
    selectionHandler(): void {
        if (!this.selected && !this.disabled) {
            this.selected = true;
            this._changeDetRef.markForCheck();
            this.selectedChange.emit(this);
        }
    }

}
