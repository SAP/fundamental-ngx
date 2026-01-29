import { CdkPortalOutlet, ComponentPortal, PortalModule } from '@angular/cdk/portal';
import { Component, ComponentRef, computed, signal, viewChildren, ViewEncapsulation } from '@angular/core';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
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
            @for (portal of attachedElements(); track portal) {
                <ng-template [cdkPortalOutlet]="portal"></ng-template>
            }
        </div>
        <fd-message-strip-alert-container-footer [alertRefs]="_alertRefs()"></fd-message-strip-alert-container-footer>
    `,
    styleUrl: './message-strip-alert-container.component.scss',
    encapsulation: ViewEncapsulation.None,
    imports: [PortalModule, ScrollbarDirective, MessageStripAlertContainerFooterComponent]
})
export class MessageStripAlertContainerComponent {
    /**
     * The list of the elements that are attached to the container.
     */
    readonly attachedElements = signal<ComponentPortal<MessageStripAlert>[]>([]);

    /**
     * List of the rendered message strip alerts. It is used in the footer and is injected into the
     * user-provided footer component portal. This way, user has full control over the container alerts.
     * @hidden
     */
    protected readonly _alertRefs = computed(() =>
        this._portalOutlets()
            .map((p) => (p.attachedRef as ComponentRef<MessageStripAlertComponent>)?.instance?.alertRef)
            .filter((ref): ref is MessageStripAlertRef => !!ref)
    );

    /** @hidden */
    private readonly _portalOutlets = viewChildren(CdkPortalOutlet);
}
