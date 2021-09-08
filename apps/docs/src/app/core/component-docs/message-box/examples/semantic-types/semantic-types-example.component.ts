import { Component } from '@angular/core';

import { MessageBoxService, MessageBoxType } from '@fundamental-ngx/core/message-box';

@Component({
    selector: 'fd-semantic-types-example',
    templateUrl: './semantic-types-example.component.html',
    providers: [
        // The MessageBoxService is already provided on the MessageBoxModule module.
        // We do it at the component level here, due to the limitations of our example generation script.
        MessageBoxService
    ]
})
export class SemanticTypesExampleComponent {
    constructor(private _messageBoxService: MessageBoxService) {}

    open(type: MessageBoxType, showSemanticIcon: boolean = true, customSemanticIcon?: string): void {
        const messageBoxRef = this._messageBoxService.open(
            {
                title: 'Fruit facts',
                content: 'Strawberries have more vitamin C than oranges.',
                approveButton: 'Ok',
                cancelButton: 'Cancel',
                approveButtonCallback: () => messageBoxRef.close('Approved'),
                cancelButtonCallback: () => messageBoxRef.close('Canceled'),
                closeButtonCallback: () => messageBoxRef.dismiss('Dismissed')
            },
            { type: type, showSemanticIcon: showSemanticIcon, customSemanticIcon: customSemanticIcon }
        );
    }
}
