import { Component } from '@angular/core';
import { MessageToastService } from '@fundamental-ngx/core/message-toast';
import { BusyIndicatorComponent } from '@fundamental-ngx/core/busy-indicator';
import { BusyIndicatorExtendedDirective } from '@fundamental-ngx/core/busy-indicator';
import { ButtonModule } from '@fundamental-ngx/core/button';

@Component({
    selector: 'fd-busy-indicator-extended-example',
    templateUrl: './busy-indicator-extended-example.component.html',
    standalone: true,
    imports: [ButtonModule, BusyIndicatorExtendedDirective, BusyIndicatorComponent]
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
