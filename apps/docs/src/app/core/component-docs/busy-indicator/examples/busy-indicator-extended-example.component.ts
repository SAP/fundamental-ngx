import { Component } from '@angular/core';
import { MessageToastService } from '@fundamental-ngx/core/message-toast';

@Component({
    selector: 'fd-busy-indicator-extended-example',
    templateUrl: './busy-indicator-extended-example.component.html'
})
export class BusyIndicatorExtendedExampleComponent {
    /** @hidden */
    constructor(public messageToastService: MessageToastService) {}

    openFromTemplate(template): void {
        this.messageToastService.open(template, {
            mousePersist: true,
            duration: -1
        });
    }
}
