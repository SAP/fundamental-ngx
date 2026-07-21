import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Output, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fd-user-menu-control',
    template: `<ng-content />`,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        tabindex: '0',
        '(click)': 'onClick()',
        '(keydown)': 'onKeydown($event)'
    },
    imports: []
})
export class UserMenuControlComponent {
    /** Event emitted event when control element is clicked */
    @Output()
    clicked: EventEmitter<void> = new EventEmitter<void>();

    /** @hidden */
    constructor(private el: ElementRef<HTMLElement>) {}

    /** @hidden */
    onClick(): void {
        this.clicked.emit();
    }

    /** @hidden */
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
