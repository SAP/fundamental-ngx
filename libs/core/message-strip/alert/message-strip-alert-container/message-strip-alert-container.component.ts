import { CdkPortalOutlet, ComponentPortal, PortalModule } from '@angular/cdk/portal';
import { AsyncPipe } from '@angular/common';
import { AfterViewInit, Component, ComponentRef, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { Observable, map, startWith } from 'rxjs';
import { MessageStripAlertContainerFooterComponent } from '../message-strip-alert-container-footer/message-strip-alert-container-footer.component';
import { MessageStripAlertComponent } from '../message-strip-alert/message-strip-alert.component';

import { MessageStripAlertRef } from '../message-strip-alert.ref';
import { MessageStripAlert } from '../message-strip-alert/message-strip-alert.interface';

/**
 * This will be rendered in the overlay. It is responsible for rendering the alerts and the footer.
 */
@Component({
    selector: 'fd-message-strip-alert-container',
    template: `
        <div fdScrollbar>
            @for (portal of attachedElements; track portal) {
                <ng-template [cdkPortalOutlet]="portal"></ng-template>
            }
        </div>
        <fd-message-strip-alert-container-footer
            [alertRefs]="alertRefs$ | async"
        ></fd-message-strip-alert-container-footer>
    `,
    styleUrl: './message-strip-alert-container.component.scss',
    encapsulation: ViewEncapsulation.None,
    imports: [PortalModule, ScrollbarDirective, MessageStripAlertContainerFooterComponent, AsyncPipe]
})
export class MessageStripAlertContainerComponent implements AfterViewInit {
    /** @hidden */
    @ViewChildren(CdkPortalOutlet)
    portalOutlets: QueryList<CdkPortalOutlet>;

    /** @hidden */
    @ViewChildren(MessageStripAlertComponent)
    alerts: QueryList<MessageStripAlert>;

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
