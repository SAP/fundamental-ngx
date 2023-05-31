import { ChangeDetectorRef, Component, inject, ViewEncapsulation } from '@angular/core';
import { ComponentPortal, PortalModule } from '@angular/cdk/portal';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { MessageStripAlertComponent } from '../message-strip-alert/message-strip-alert.component';
import { NgFor } from '@angular/common';

@Component({
    selector: 'fd-message-strip-alert-container',
    template: `
        <ng-container *ngFor="let portal of attachedElements">
            <ng-template [cdkPortalOutlet]="portal"></ng-template>
        </ng-container>
    `,
    styleUrls: ['./message-strip-alert-container.component.scss'],
    styles: [
        `
            fd-message-strip-alert-container {
                width: 100%;
                display: flex;
                padding: 0.5rem;
                gap: 0.75rem;
                flex-direction: column;
                max-height: 100%;
            }
        `
    ],
    encapsulation: ViewEncapsulation.None,
    hostDirectives: [ScrollbarDirective],
    standalone: true,
    imports: [NgFor, PortalModule]
})
export class MessageStripAlertContainerComponent {
    /** @hidden */
    private cdr = inject(ChangeDetectorRef);
    /** @hidden */
    attachedElements: ComponentPortal<MessageStripAlertComponent>[] = [];

    /** @hidden */
    addElement(portal: ComponentPortal<MessageStripAlertComponent>): ComponentPortal<MessageStripAlertComponent> {
        this.attachedElements.push(portal);
        this.cdr.detectChanges();
        return portal;
    }

    /** @hidden */
    removeElement(portal: ComponentPortal<MessageStripAlertComponent>): void {
        this.attachedElements = this.attachedElements.filter((element) => element !== portal);
        this.cdr.detectChanges();
    }
}
