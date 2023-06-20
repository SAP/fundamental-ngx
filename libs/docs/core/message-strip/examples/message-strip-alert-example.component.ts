import { Component, inject, OnDestroy, TemplateRef } from '@angular/core';
import {
    MessageStripAlertContainerAlertRefs,
    MessageStripAlertRef,
    MessageStripAlertService
} from '@fundamental-ngx/core/message-strip';
import { AsyncPipe, NgIf } from '@angular/common';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { LinkModule } from '@fundamental-ngx/core/link';

let itemIndex = 0;

@Component({
    template: `Created using the component ! This is #{{ itemIndex }}`,
    standalone: true
})
class ExampleStripAlertComponent implements OnDestroy {
    itemIndex = ++itemIndex;

    ngOnDestroy() {
        console.log('Component destroyed');
    }
}

@Component({
    template: `
        <ng-container *ngIf="alertRefs$ | async as alertRefs">
            <ng-container *ngIf="alertRefs.length > 0">
                <button fd-link fdCompact (click)="dismissAll(alertRefs)">Dismiss all ({{ alertRefs.length }})</button>
            </ng-container>
        </ng-container>
    `,
    imports: [NgIf, AsyncPipe, ButtonModule, ContentDensityDirective, LinkModule],
    styles: [
        `
            :host {
                display: flex;
                align-items: flex-end;
                flex-direction: row-reverse;
                padding: 0 1rem;
            }

            button {
                background-color: transparent;
            }
        `
    ],
    standalone: true
})
class ExampleStripAlertFooterComponent {
    alertRefs$ = inject(MessageStripAlertContainerAlertRefs);

    dismissAll(alertRefs: MessageStripAlertRef[]) {
        alertRefs.forEach((alertRef) => alertRef.dismiss());
    }
}

@Component({
    selector: 'message-strip-alert-example',
    template: `
        <div>
            <button fd-button (click)="openText()">Open Text top-left</button>
            <button fd-button (click)="openTemplate(template)">Open Template top-middle</button>
            <button fd-button (click)="openComponent()">Open Component top-end</button>
        </div>
        <div>
            <button fd-button (click)="openText('bottom')">Open Text bottom-left</button>
            <button fd-button (click)="openTemplate(template, 'bottom')">Open Template bottom-middle</button>
            <button fd-button (click)="openComponent('bottom')">Open Component bottom-right</button>
        </div>
        <ng-template #template let-alertRef>
            Rendered using the template and added custom close button, which will dismiss the alert
            <button fd-button fdCompact fdType="transparent" (click)="alertRef.dismiss()">Close</button>
        </ng-template>
    `
})
export class MessageStripAlertExampleComponent {
    private messageStripAlertService = inject(MessageStripAlertService);

    constructor() {
        this.messageStripAlertService.setFooterComponent('top-end', ExampleStripAlertFooterComponent);
    }

    openText(vPosition: 'top' | 'bottom' = 'top') {
        this.messageStripAlertService.open({
            content: 'This will be automatically dismissed in 5 seconds and if mouse is hovered dismiss time is reset',
            position: `${vPosition}-start`,
            messageStrip: {
                duration: 5000,
                mousePersist: true,
                type: 'warning',
                dismissible: true,
                onDismiss: () => {
                    console.log('dismissed');
                }
            }
        });
    }

    openTemplate(content: TemplateRef<{ $implicit: MessageStripAlertRef }>, vPosition: 'top' | 'bottom' = 'top') {
        this.messageStripAlertService.open({
            position: `${vPosition}-middle`,
            content,
            messageStrip: {
                noIcon: true,
                type: 'error',
                dismissible: false
            }
        });
    }

    openComponent(vPosition: 'top' | 'bottom' = 'top') {
        this.messageStripAlertService.open({
            content: ExampleStripAlertComponent,
            position: `${vPosition}-end`,
            messageStrip: {
                dismissible: true,
                type: 'success'
            }
        });
    }
}
