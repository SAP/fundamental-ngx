import { Component } from '@angular/core';

import { MessageBoxService } from '@fundamental-ngx/core/message-box';

import { MessageBoxComplexExampleComponent } from './message-box-complex-example.component';

@Component({
    selector: 'fd-complex-template-example',
    template: '<button fd-button label="Open with complex template" (click)="open()"></button>',
    providers: [
        // The MessageBoxService is already provided on the MessageBoxModule module.
        // We do it at the component level here, due to the limitations of our example generation script.
        MessageBoxService
    ]
})
export class ComplexTemplateExampleComponent {
    constructor(private _messageBoxService: MessageBoxService) {}

    open(): void {
        this._messageBoxService.open(MessageBoxComplexExampleComponent, {
            width: '400px',
            ariaLabelledBy:
                'fd-message-box-complex-template-header fd-message-box-complex-template-header-2 fd-message-box-complex-template-body'
        });
    }
}
