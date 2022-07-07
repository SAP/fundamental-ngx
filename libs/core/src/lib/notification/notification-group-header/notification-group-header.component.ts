import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    HostBinding,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    Renderer2,
    ViewEncapsulation
} from '@angular/core';
import { RtlService } from '@fundamental-ngx/core/utils';
import { Subscription } from 'rxjs';
import { Nullable } from '@fundamental-ngx/core/shared';
import { NotificationGroupBaseDirective } from '../notification-utils/notification-group-base';
import { ContentDensityMode, LocalContentDensityMode } from '@fundamental-ngx/core/content-density';

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
            <i [class]="'sap-icon--' + _getButtonIcon()"></i>
        </button>
        <div class="fd-notification__content">
            <ng-content select="fd-notification-header"></ng-content>
        </div>
        <ng-content select="fd-notification-actions"></ng-content>
        <ng-content></ng-content>
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationGroupHeaderComponent extends NotificationGroupBaseDirective implements OnInit, OnDestroy {
    /** @hidden */
    @HostBinding('class.fd-notification__group-header')
    fdNotificationGroupHeaderClass = true;

    /** @hidden */
    get expandDescribedBy(): string {
        return this.notificationHeader?.first?.uniqueId;
    }

    /** @hidden */
    _rtl = false;

    /** @hidden */
    _subscriptions = new Subscription();

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
    expanded = true;

    /** Output event triggered when the Expand button is clicked */
    @Output()
    expandedChange = new EventEmitter<boolean>();

    get _expandButtonContentDensity(): LocalContentDensityMode {
        return typeof this.expandCompact === 'undefined' ? 'global' : ContentDensityMode.COMPACT;
    }

    constructor(private _cdRef: ChangeDetectorRef, @Optional() private _rtlService: RtlService, renderer: Renderer2) {
        super(renderer);
    }

    /** @hidden */
    ngOnInit(): void {
        this._listenRtl();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** Method that toggles the Notification list content */
    toggleExpand(): void {
        this.expanded = !this.expanded;
        this.expandedChange.emit(this.expanded);
    }

    /** @hidden */
    _getButtonIcon(): string {
        return this.expanded ? 'slim-arrow-down' : this._rtl ? 'slim-arrow-left' : 'slim-arrow-right';
    }

    /** @hidden */
    private _listenRtl(): void {
        if (this._rtlService) {
            this._subscriptions.add(
                this._rtlService.rtl.subscribe((rtl) => {
                    this._rtl = rtl;
                    this._cdRef.markForCheck();
                })
            );
        }
    }
}
