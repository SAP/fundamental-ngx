import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    HostBinding,
    Input,
    OnDestroy,
    Optional,
    Output,
    Renderer2,
    ViewEncapsulation,
    computed,
    signal
} from '@angular/core';
import { Nullable, RtlService } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import {
    ContentDensityDirective,
    ContentDensityMode,
    LocalContentDensityMode
} from '@fundamental-ngx/core/content-density';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { NotificationGroupBaseDirective } from '../notification-utils/notification-group-base';

@Component({
    selector: 'fd-notification-group-header',
    template: `
        <button
            fd-button
            fdType="transparent"
            role="button"
            [fdContentDensity]="_expandButtonContentDensity"
            [attr.aria-expanded]="expanded"
            [attr.aria-describedby]="expandDescribedBy"
            [attr.aria-label]="expandAriaLabel"
            [attr.aria-labelledby]="expandAriaLabelledBy"
            (click)="toggleExpand()"
        >
            <fd-icon [glyph]="_buttonIcon$()"></fd-icon>
        </button>
        <div class="fd-notification__content">
            <ng-content select="fd-notification-header"></ng-content>
        </div>
        <ng-content select="fd-notification-actions"></ng-content>
        <ng-content></ng-content>
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ButtonComponent, ContentDensityDirective, IconComponent]
})
export class NotificationGroupHeaderComponent extends NotificationGroupBaseDirective implements OnDestroy {
    /** @hidden */
    @HostBinding('class.fd-notification__group-header')
    fdNotificationGroupHeaderClass = true;

    /** Whether the expand button is in compact mode */
    @Input()
    expandCompact: boolean;

    /** aria-label of the expand button */
    @Input()
    expandAriaLabel: Nullable<string>;

    /** aria-labelledby of the expand button */
    @Input()
    expandAriaLabelledBy: Nullable<string>;

    /** Whether the button is in expanded state */
    @Input()
    set expanded(value: boolean) {
        this._expanded$.set(value);
    }

    get expanded(): boolean {
        return this._expanded$();
    }

    /** Output event triggered when the Expand button is clicked */
    @Output()
    expandedChange = new EventEmitter<boolean>();

    /** @hidden */
    get expandDescribedBy(): string {
        return this.notificationHeader?.first?.uniqueId;
    }

    /** @hidden */
    readonly _buttonIcon$ = computed(() =>
        this._expanded$() ? 'slim-arrow-down' : this._rtlService?.rtlSignal() ? 'slim-arrow-left' : 'slim-arrow-right'
    );

    /** @hidden */
    readonly _expanded$ = signal(true);

    /** @hidden */
    get _expandButtonContentDensity(): LocalContentDensityMode {
        return typeof this.expandCompact === 'undefined' ? 'global' : ContentDensityMode.COMPACT;
    }

    /** @hidden */
    constructor(
        @Optional() private _rtlService: RtlService,
        renderer: Renderer2
    ) {
        super(renderer);
    }

    /** Method that toggles the Notification list content */
    toggleExpand(): void {
        this._expanded$.update((expanded) => !expanded);
        this.expandedChange.emit(this.expanded);
    }
}
