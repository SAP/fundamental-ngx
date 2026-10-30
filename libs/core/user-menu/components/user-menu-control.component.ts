import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Output,
    signal,
    ViewEncapsulation
} from '@angular/core';
import { resolveTranslationSignal } from '@fundamental-ngx/i18n';

@Component({
    selector: 'fd-user-menu-control',
    template: `<ng-content />`,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        tabindex: '0',
        'aria-haspopup': 'dialog',
        '[attr.aria-expanded]': 'isExpanded()',
        '[attr.aria-label]': '_ariaLabel()',
        '(click)': 'onClick()',
        '(keydown)': 'onKeydown($event)'
    },
    imports: []
})
export class UserMenuControlComponent {
    /** Event emitted when control element is clicked */
    @Output()
    clicked: EventEmitter<void> = new EventEmitter<void>();

    /** Whether the user menu is expanded */
    readonly isExpanded = signal(false);

    /** @hidden */
    protected readonly _ariaLabel = resolveTranslationSignal('coreUserMenu.ariaLabel');

    /** @hidden */
    constructor(private el: ElementRef<HTMLElement>) {}

    /** @hidden */
    onClick(): void {
        this.clicked.emit();
    }

    /**
     * Handles keyboard activation (Enter or Space).
     * Prevents default to avoid scrolling on Space.
     * Emits clicked event for mobile mode; in popover mode, the event
     * bubbles to the popover component which handles the toggle.
     * @hidden
     */
    onKeydown(event: KeyboardEvent): void {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.clicked.emit();
        }
    }

    /** @hidden */
    focus(): void {
        this.el.nativeElement.focus();
    }
}
