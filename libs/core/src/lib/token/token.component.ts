import {
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Output,
    ViewChild,
    ViewEncapsulation,
    Input,
    ChangeDetectionStrategy
} from '@angular/core';

/**
 * A token is used to represent contextualizing information.
 * They can be useful to show applied filters, selected values for form fields or object metadata.
 */
@Component({
    selector: 'fd-token',
    templateUrl: './token.component.html',
    styleUrls: ['./token.component.scss'],
    host: {
        class: 'fd-token',
        '[class.fd-token__disabled]': 'disabled',
        'role': 'button'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TokenComponent {

    /** @hidden */
    @ViewChild('contentContainer', { static: false })
    contentContainer: ElementRef;

    /** Whether the token is disabled. */
    @Input()
    disabled: boolean = false;

    /** Emitted when the *x* icon is clicked. Specifically, any pseudo-element. */
    @Output()
    readonly onCloseClick: EventEmitter<void> = new EventEmitter<void>();

    /** @hidden */
    constructor(private elRef: ElementRef) {
    }

    /** @hidden */
    @HostListener('click', ['$event'])
    clickHandler(event): void {
        if (this.contentContainer && !this.disabled) {
            if (this.elRef.nativeElement.contains(event.target) && !this.contentContainer.nativeElement.contains(event.target)) {
                this.onCloseClick.emit();
            }
        }
    }

}


