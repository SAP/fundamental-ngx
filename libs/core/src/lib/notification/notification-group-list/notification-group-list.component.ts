import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    forwardRef,
    OnDestroy,
    ViewEncapsulation
} from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationGroupHeaderComponent } from '../notification-group-header/notification-group-header.component';

@Component({
    selector: 'fd-notification-group-list',
    template: `
        <ng-content select="fd-notification-group-header"></ng-content>
        @if (expanded) {
            <ng-content></ng-content>
        }
    `,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: []
})
export class NotificationGroupListComponent implements AfterContentInit, OnDestroy {
    /** @hidden */
    @ContentChild(forwardRef(() => NotificationGroupHeaderComponent))
    groupHeader: NotificationGroupHeaderComponent;

    /** Whether the Notification list content is expanded */
    expanded: boolean;

    /** @hidden */
    private readonly _subscriptions = new Subscription();

    /** @hidden */
    constructor(private readonly _changeDetectorRef: ChangeDetectorRef) {}

    /** @hidden */
    ngAfterContentInit(): void {
        this.expanded = this.groupHeader.expanded;

        this._subscriptions.add(
            this.groupHeader.expandedChange.subscribe((value) => {
                this.expanded = value;
                this._changeDetectorRef.detectChanges();
            })
        );
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }
}
