import { ChangeDetectionStrategy, Component, input, signal, ViewEncapsulation } from '@angular/core';
import { resolveTranslationSignal } from '@fundamental-ngx/i18n';
import { FD_NOTIFICATION_FOOTER } from '../token';

@Component({
    selector: 'fd-notification-footer',
    template: `<ng-content></ng-content>
        @if (showTrigger()) {
            <a role="button" class="fd-link fd-notification__link" tabindex="0" (click)="onTriggerClick()">
                <span class="fd-link__content">{{ triggerLabel }}</span>
            </a>
        } `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    host: {
        class: 'fd-notification__footer'
    },
    providers: [
        {
            provide: FD_NOTIFICATION_FOOTER,
            useExisting: NotificationFooterComponent
        }
    ]
})
export class NotificationFooterComponent {
    /**
     * Controls the visibility of the expand/collapse button.
     * Set to `true` when the title or description is truncated or the content is expanded.
     */
    showTrigger = signal(false);

    /**
     * Indicates whether the content is currently expanded.
     * When `true`, the full title and description are shown;
     * when `false`, they are truncated after the second line.
     */
    expanded = signal(false);

    /**
     * Custom label for the expand button.
     * Defaults to `'More'`.
     */
    moreLabel = input<string>();

    /** Custom label for the collapse button.
     * Defaults to `'Less'`.
     */
    lessLabel = input<string>();

    /** @hidden */
    private _defaultMoreLabel = resolveTranslationSignal('coreNotification.triggerMoreLabel');

    /** @hidden */
    private _defaultLessLabel = resolveTranslationSignal('coreNotification.triggerLessLabel');

    /** @hidden */
    onTriggerClick(): void {
        this.expanded.set(!this.expanded());
    }

    /**
     * Label for the trigger button
     * @hidden
     **/
    get triggerLabel(): string {
        const moreLabel = this.moreLabel() || this._defaultMoreLabel();
        const lessLabel = this.lessLabel() || this._defaultLessLabel();
        return this.expanded() ? lessLabel : moreLabel;
    }
}
