import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';

/**
 * A token is used to represent contextualizing information.
 * They can be useful to show applied filters, selected values for form fields or object metadata.
 */
@Component({
    selector: 'fd-token',
    templateUrl: './token.component.html',
    styleUrls: ['./token.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TokenComponent {
    /** Whether the token is disabled. */
    @Input()
    disabled: boolean = false;

    /** Whether the token is compact. */
    @Input()
    compact: boolean = false;

    /** @hidden */
    @ViewChild('tokenWrapperElement')
    tokenWrapperElement: ElementRef;

    private _selected: boolean = false;

    /** Whether the token is selected. */
    @Input()
    get selected(): boolean {
        return this._selected;
    };

    set selected(val: boolean) {
        if (this._selected !== val) {
            this._cdRef.markForCheck();
        }
        this._selected = val;
    }

    /** Whether the token is read-only. */
    @Input()
    readOnly: boolean = false;

    /** Emitted when the *x* icon is clicked. Specifically, any pseudo-element. */
    @Output()
    readonly onCloseClick: EventEmitter<void> = new EventEmitter<void>();

    /** Emitted when a token is clicked. */
    @Output()
    onTokenClick: EventEmitter<void> = new EventEmitter<void>();

    /** @hidden */
    closeClickHandler(event?): void {
        if (event) {
            event.stopPropagation();
            if (!this.disabled) {
                this.onCloseClick.emit(event);
            }
        }
    }

    /** @hidden */
    tokenClickHandler(event): void {
        this.onTokenClick.emit(event);
    }

    constructor(public elementRef: ElementRef, private _cdRef: ChangeDetectorRef) {}
}
