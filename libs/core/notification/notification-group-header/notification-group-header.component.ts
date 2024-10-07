import { ENTER, SPACE } from '@angular/cdk/keycodes';
import {
    ChangeDetectionStrategy,
    Component,
    HostListener,
    ViewEncapsulation,
    computed,
    inject,
    input,
    signal
} from '@angular/core';
import { KeyUtil, Nullable, RtlService } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { NotificationGroupBaseDirective } from '../notification-utils/notification-group-base';
import { FD_NOTIFICATION_GROUP_HEADER } from '../token';

@Component({
    selector: 'fd-notification-group-header',
    template: `
        <span class="fd-notification-group__header-arrow">
            <fd-icon [glyph]="_buttonIcon$()"></fd-icon>
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
        '(click)': 'toggleExpand()'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ButtonComponent, ContentDensityDirective, IconComponent],
    providers: [
        {
            provide: FD_NOTIFICATION_GROUP_HEADER,
            useExisting: NotificationGroupHeaderComponent
        }
    ]
})
export class NotificationGroupHeaderComponent extends NotificationGroupBaseDirective {
    /**
     * Title for the group header
     * default value: "Expand/Collapse"
     */
    title = input('Expand/Collapse');

    /**
     * id of the list element that the group header controls
     * string value
     */
    ariaControls = signal<Nullable<string>>('');

    /** @hidden */
    expanded = signal(false);

    /** @hidden */
    readonly _buttonIcon$ = computed(() =>
        this.expanded() ? 'slim-arrow-down' : this._rtlService?.rtlSignal() ? 'slim-arrow-left' : 'slim-arrow-right'
    );

    /** @hidden */
    private readonly _rtlService = inject(RtlService, { optional: true });

    /** @hidden */
    @HostListener('keydown', ['$event'])
    keydownHandler(event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode(event, [ENTER, SPACE])) {
            this.toggleExpand();
            event.preventDefault();
        }
    }

    /** Method that toggles the Notification list content */
    toggleExpand(): void {
        this.expanded.update((expanded) => !expanded);
    }
}
