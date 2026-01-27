import { ChangeDetectionStrategy, Component, computed, input, model, signal, ViewEncapsulation } from '@angular/core';
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
     * Manual control: Override to show/hide the expand/collapse button.
     * When set, takes precedence over automatic truncation detection.
     * Use this for dynamically created notifications where automatic detection doesn't work.
     */
    readonly manualShowTrigger = input<boolean | undefined>(undefined);

    /**
     * Manual control: Set expanded state externally.
     * When set, takes precedence over internal expanded state.
     * Use this for dynamically created notifications.
     * Supports two-way binding with [(manualExpanded)].
     */
    readonly manualExpanded = model<boolean | undefined>(undefined);

    /**
     * Custom label for the expand button.
     * Defaults to `'More'`.
     */
    readonly moreLabel = input<string>();

    /**
     * Custom label for the collapse button.
     * Defaults to `'Less'`.
     */
    readonly lessLabel = input<string>();

    /**
     * Internal signal for automatic truncation detection.
     * Used when manual controls are not provided.
     * @internal
     */
    readonly _autoShowTrigger = signal(false);

    /**
     * Internal signal for automatic expanded state.
     * Used when manual controls are not provided.
     * @internal
     */
    readonly _autoExpanded = signal(false);

    /**
     * Computed signal for expanded state.
     * Uses manual control if provided, otherwise uses automatic state.
     */
    readonly expanded = computed(() => {
        const manual = this.manualExpanded();
        return manual !== undefined ? manual : this._autoExpanded();
    });

    /**
     * Computed signal that determines if trigger should be shown.
     * Uses manual control if provided, otherwise uses automatic detection.
     */
    protected readonly showTrigger = computed(() => {
        const manual = this.manualShowTrigger();
        return manual !== undefined ? manual : this._autoShowTrigger();
    });

    private readonly _defaultMoreLabel = resolveTranslationSignal('coreNotification.triggerMoreLabel');

    private readonly _defaultLessLabel = resolveTranslationSignal('coreNotification.triggerLessLabel');

    /** @hidden */
    protected onTriggerClick(): void {
        const currentExpanded = this.expanded();
        const newExpanded = !currentExpanded;

        // If using manual mode, update the model
        if (this.manualExpanded() !== undefined) {
            this.manualExpanded.set(newExpanded);
        } else {
            // Otherwise update automatic state
            this._autoExpanded.set(newExpanded);
        }
    }

    /**
     * Label for the trigger button
     * @hidden
     **/
    protected get triggerLabel(): string {
        const moreLabel = this.moreLabel() || this._defaultMoreLabel();
        const lessLabel = this.lessLabel() || this._defaultLessLabel();
        return this.expanded() ? lessLabel : moreLabel;
    }
}
