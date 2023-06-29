import { AfterViewInit, Component, ComponentRef, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { CdkPortalOutlet, ComponentPortal, PortalModule } from '@angular/cdk/portal';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { MessageStripAlertComponent } from '../message-strip-alert/message-strip-alert.component';
import { AsyncPipe, NgFor } from '@angular/common';
import { MessageStripAlertContainerFooterComponent } from '../message-strip-alert-container-footer/message-strip-alert-container-footer.component';
import { map, Observable, startWith } from 'rxjs';

import { MessageStripAlertRef } from '../message-strip-alert.ref';
import { MessageStripAlert } from '../message-strip-alert/message-strip-alert.interface';

/**
 * This will be rendered in the overlay. It is responsible for rendering the alerts and the footer.
 */
@Component({
    selector: 'fd-message-strip-alert-container',
    template: `
        <div fdScrollbar>
            <ng-container *ngFor="let portal of attachedElements">
                <ng-template [cdkPortalOutlet]="portal"></ng-template>
            </ng-container>
        </div>
        <fd-message-strip-alert-container-footer
            [alertRefs]="alertRefs$ | async"
        ></fd-message-strip-alert-container-footer>
    `,
    styleUrls: ['./message-strip-alert-container.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [NgFor, PortalModule, ScrollbarDirective, MessageStripAlertContainerFooterComponent, AsyncPipe]
})
export class MessageStripAlertContainerComponent implements AfterViewInit {
    /**
     * The list of the elements that are attached to the container.
     */
    attachedElements: ComponentPortal<MessageStripAlert>[] = [];

    /**
     * List of the rendered message strip alerts. It is used in the footer and is injected into the
     * user-provided footer component portal. This way, user has full control over the container alerts.
     */
    alertRefs$!: Observable<MessageStripAlertRef[]>;

    /** @hidden */
    @ViewChildren(CdkPortalOutlet)
    portalOutlets: QueryList<CdkPortalOutlet>;

    /** @hidden */
    @ViewChildren(MessageStripAlertComponent)
    alerts: QueryList<MessageStripAlert>;

    /** @hidden */
    ngAfterViewInit(): void {
        this.alertRefs$ = this.portalOutlets.changes.pipe(
            startWith(this.portalOutlets),
            map(() =>
                this.portalOutlets
                    .toArray()
                    .map((p) => (p.attachedRef as ComponentRef<MessageStripAlertComponent>)?.instance.alertRef)
            )
        );
    }
}
