import { Component } from '@angular/core';
import { BusyIndicatorComponent, BusyIndicatorExtendedDirective } from '@fundamental-ngx/core/busy-indicator';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { MessageToastModule, MessageToastService } from '@fundamental-ngx/core/message-toast';

@Component({
    selector: 'fd-busy-indicator-extended-example',
    templateUrl: './busy-indicator-extended-example.component.html',
    imports: [ButtonComponent, BusyIndicatorExtendedDirective, BusyIndicatorComponent, MessageToastModule]
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
