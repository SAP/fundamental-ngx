import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
    selector: 'fd-notification-group-growing-item',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<ng-content select="[fd-notification-group-growing-item-title]"></ng-content> <ng-content></ng-content>`,
    host: {
        class: 'fd-notification-group__growing-item',
        role: 'button',
        '[aria-label]': 'ariaLabel()',
        '[tabindex]': '0'
    }
})
export class NotificationGroupGrowingItemComponent {
    protected ariaLabel = input<string>();
}
