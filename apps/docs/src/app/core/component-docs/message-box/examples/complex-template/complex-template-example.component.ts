import { Component } from '@angular/core';
import { MessageBoxService } from '@fundamental-ngx/core/message-box';
import { MessageBoxComplexExampleComponent } from './message-box-complex-example.component';

@Component({
    selector: 'fd-complex-template-example',
    template: '<button fd-button label="Open with complex template" (click)="open()"></button>'
})
export class ComplexTemplateExampleComponent {

    constructor(private _messageBoxService: MessageBoxService) {}

    open(): void {
        this._messageBoxService.open(MessageBoxComplexExampleComponent, { width: '400px' });
    }

}
