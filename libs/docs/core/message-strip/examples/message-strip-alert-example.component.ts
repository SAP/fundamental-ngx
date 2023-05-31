import { Component, inject, OnDestroy, TemplateRef } from '@angular/core';
import { MessageStripAlertService } from '@fundamental-ngx/core/message-strip';

@Component({
    template: `Component works, hooray!`,
    standalone: true
})
class ExampleStripAlertComponent implements OnDestroy {
    ngOnDestroy() {
        console.log('Component destroyed');
    }
}

@Component({
    selector: 'message-strip-alert-example',
    template: `
        <div>
            <button fd-button (click)="openText()">Open Text</button>
            <button fd-button (click)="openTemplate(template)">Open Template</button>
            <button fd-button (click)="openComponent()">Open Component</button>
        </div>
        <div>
            <button fd-button (click)="openText('bottom')">Open Text from bottom</button>
            <button fd-button (click)="openTemplate(template, 'bottom')">Open Template from bottom</button>
            <button fd-button (click)="openComponent('bottom')">Open Component from bottom</button>
        </div>
        <ng-template #template> Template works, hooray! </ng-template>
    `
})
export class MessageStripAlertExampleComponent {
    private messageStripAlertService = inject(MessageStripAlertService);

    openText(vPosition: 'top' | 'bottom' = 'top') {
        this.messageStripAlertService.open({
            content: 'Text works, hooray!',
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

    openTemplate(content: TemplateRef<void>, vPosition: 'top' | 'bottom' = 'top') {
        this.messageStripAlertService.open({
            position: `${vPosition}-middle`,
            content,
            messageStrip: {
                type: 'error',
                dismissible: true
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
