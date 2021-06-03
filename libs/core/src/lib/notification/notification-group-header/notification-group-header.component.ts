import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    HostBinding,
    Input,
    OnInit,
    OnDestroy,
    Optional,
    Output,
    ViewEncapsulation
} from '@angular/core';
import { ContentDensityService } from '@fundamental-ngx/core/utils';
import { Subscription } from 'rxjs';
import { RtlService } from '@fundamental-ngx/core/utils';
@Component({
    selector: 'fd-notification-group-header',
    template: `
    <button
        fd-button
        fdType="transparent"
        role="button"
        [compact]="expandCompact"
        [attr.aria-expanded]="expanded"
        [attr.aria-label]="expandAriaLabel"
        [attr.aria-labelledby]="expandAriaLabelledBy"
        (click)="toggleExpand()">
        <i [ngClass]="'sap-icon--' + _getButtonIcon()"></i>
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
export class NotificationGroupHeaderComponent implements OnInit, OnDestroy  {
    /** @hidden */
    @HostBinding('class.fd-notification__group-header')
    fdNotificationGroupHeaderClass = true;

    /** @hidden */
    _rtl = false;

    /** @hidden */
    _subscriptions = new Subscription();

    /** Whether the expand button is in compact mode */
    @Input()
    expandCompact: boolean;

    /** aria-label of the expand button */
    @Input()
    expandAriaLabel: string;

    /** aria-labelledby of the expand button */
    @Input()
    expandAriaLabelledBy: string;

    /** Whether the button is in expanded state */
    @Input()
    expanded = true;

    /** Output event triggered when the Expand button is clicked */
    @Output()
    expandedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(
        private _cdRef: ChangeDetectorRef,
        @Optional() private _rtlService: RtlService,
        @Optional() private _contentDensityService: ContentDensityService
    ) {}

    /** @hidden */
    ngOnInit(): void {
        if (this.expandCompact === undefined && this._contentDensityService) {
            this._subscriptions.add(this._contentDensityService._contentDensityListener.subscribe(density => {
                this.expandCompact = density !== 'cozy';
                this._cdRef.markForCheck();
            }))
        }
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
        return this.expanded
            ? 'slim-arrow-down'
            : this._rtl
                ? 'slim-arrow-left'
                : 'slim-arrow-right'
    }

    /** @hidden */
    private _listenRtl(): void {
        if (this._rtlService) {
            this._subscriptions.add(
                this._rtlService.rtl.subscribe(rtl => {
                    this._rtl = rtl;
                    this._cdRef.markForCheck();
                })
            );
        }
    }
}
