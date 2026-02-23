import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, Component, computed, effect, inject, signal, ViewEncapsulation } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { KeyUtil, RtlService } from '@fundamental-ngx/cdk/utils';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { FD_LANGUAGE, TranslationResolver } from '@fundamental-ngx/i18n';
import { NotificationGroupBaseDirective } from '../notification-utils/notification-group-base';
import { FD_NOTIFICATION_GROUP_HEADER } from '../token';

@Component({
    selector: 'fd-notification-group-header',
    template: `
        <span class="fd-notification-group__header-arrow">
            <fd-icon [glyph]="_buttonIcon()"></fd-icon>
        </span>
        <ng-content select="fd-notification-group-header-title"></ng-content>
        <ng-content></ng-content>
    `,
    host: {
        class: 'fd-notification-group__header',
        role: 'button',
        '[tabindex]': '0',
        '[attr.title]': 'title()',
        '[attr.aria-controls]': 'ariaControls()',
        '[attr.aria-expanded]': 'expanded()',
        '(click)': 'toggleExpand()',
        '(keydown)': '_onKeydown($event)'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [IconComponent],
    providers: [
        {
            provide: FD_NOTIFICATION_GROUP_HEADER,
            useExisting: NotificationGroupHeaderComponent
        }
    ]
})
export class NotificationGroupHeaderComponent extends NotificationGroupBaseDirective {
    /**
     * Title for the group header.
     * Default value is set from i18n translations ("Expand/Collapse").
     */
    readonly title = signal<string | null>('');

    /**
     * ID of the list element that the group header controls.
     */
    readonly ariaControls = signal<string | null>('');

    /** @hidden */
    readonly expanded = signal(false);

    /** @hidden */
    protected readonly _buttonIcon = computed(() =>
        this.expanded() ? 'slim-arrow-down' : this._rtlService?.rtl() ? 'slim-arrow-left' : 'slim-arrow-right'
    );

    /** @hidden */
    private readonly _rtlService = inject(RtlService, { optional: true });

    /** @hidden */
    private readonly _lang = toSignal(inject(FD_LANGUAGE));

    /** @hidden */
    private readonly _translationResolver = new TranslationResolver();

    constructor() {
        super();

        // Set up translation for title - only sets default if title is empty
        effect(() => {
            const lang = this._lang();
            // Only set from i18n if title hasn't been set externally
            if (lang && !this.title()) {
                this.title.set(this._translationResolver.resolve(lang, 'coreNotification.groupHeaderTitle'));
            }
        });
    }

    /** Method that toggles the Notification list content */
    toggleExpand(): void {
        this.expanded.update((expanded) => !expanded);
    }

    /** @hidden */
    protected _onKeydown(event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode(event, [ENTER, SPACE])) {
            this.toggleExpand();
            event.preventDefault();
        }
    }
}
