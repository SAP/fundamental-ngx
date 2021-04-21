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
import { Subscription } from 'rxjs';
import { RtlService } from '../../utils/public_api';
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
    _subscription = new Subscription();

    /** Whether the expand button is incompact mode */
    @Input()
    expandCompact = true;

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
        @Optional() private _rtlService: RtlService
    ) {}

    /** @hidden */
    ngOnInit(): void {
        this._listenRtl();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscription.unsubscribe();
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
            this._subscription.add(
                this._rtlService.rtl.subscribe(rtl => {
                    this._rtl = rtl;
                    this._cdRef.markForCheck();
                })
            );
        }
    }
}
