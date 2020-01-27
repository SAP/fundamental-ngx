import { Component, ChangeDetectionStrategy, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

const VALID_INPUT_TYPES = ['standard', 'emphasized'];

export type LinkType = 'standard' | 'emphasized';

@Component({
    selector: 'fdp-link',
    templateUrl: './link.component.html',
    styleUrls: ['./link.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkComponent implements OnInit {
    @Input() id?: string;

    @Input() href: string;

    @Input()
    type: LinkType = 'standard';

    @Input()
    get disabled(): boolean {
        return this._disabled;
    }

    set disabled(value: boolean) {
        this._disabled = coerceBooleanProperty(value);
    }

    @Input()
    get inverted(): boolean {
        return this._inverted;
    }

    set inverted(value: boolean) {
        this._inverted = coerceBooleanProperty(value);
    }

    @Input()
    get wrap(): boolean {
        return this._wrap;
    }

    set wrap(value: boolean) {
        this._wrap = coerceBooleanProperty(value);
    }

    @Input() popoverText?: string;

    private _disabled: boolean = false;
    private _inverted: boolean = false;
    private _wrap: boolean = false;
    isEmphasized: boolean = false;

    @Output()
    click: EventEmitter<any> = new EventEmitter();

    clicked(event: any) {
        this.click.emit(event);
    }

    constructor() {}

    ngOnInit() {
        if (this.disabled) {
            // if link disabled, for Avoiding tab focus and click. marking href undefined.
            this.href = undefined;
        }
        if (this.type === VALID_INPUT_TYPES[1]) {
            this.isEmphasized = true;
        }

        if (this.type && VALID_INPUT_TYPES.indexOf(this.type) === -1) {
            throw new Error(`fdp-link type ${this.type} is not supported`);
        }
    }

    @HostListener('document:keyup', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event.keyCode === 32) {
            event.preventDefault();

            // DO navigation
        }
    }
}
