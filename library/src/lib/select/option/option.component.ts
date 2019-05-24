import { Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fd-option',
    templateUrl: './option.component.html',
    styleUrls: ['./option.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class.fd-option-default-custom]': 'true'
    }
})
export class OptionComponent implements OnInit {

    /** @hidden */
    @HostBinding('class.fd-menu__item')
    fdMenuItemClass: boolean = true;

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
    @HostBinding('class.is-selected')
    selected: boolean = false;

    constructor(private elRef: ElementRef) {}

    ngOnInit() {}

    get viewValueText(): string {
        return this.viewValue ? this.viewValue :
            ((this.elRef.nativeElement as HTMLElement).textContent || '').trim();
    }

    setSelected(value: boolean, fireEvent: boolean = true): void {
        this.selected = value;

        if (fireEvent) {
            this.selectedChange.emit(this);
        }
    }

    @HostListener('click')
    onClickHandler(): void {
        if (!this.selected) {
            this.selected = true;
            this.selectedChange.emit(this);
        }
    }

}
