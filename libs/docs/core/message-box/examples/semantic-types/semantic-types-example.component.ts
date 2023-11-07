import { Component } from '@angular/core';

import { ButtonComponent } from '@fundamental-ngx/core/button';
import { MessageBoxService, MessageBoxType } from '@fundamental-ngx/core/message-box';

@Component({
    selector: 'fd-semantic-types-example',
    templateUrl: './semantic-types-example.component.html',
    providers: [
        // The MessageBoxService is already provided on the MessageBoxModule module.
        // We do it at the component level here, due to the limitations of our example generation script.
        MessageBoxService
    ],
    standalone: true,
    imports: [ButtonComponent]
})
export class SemanticTypesExampleComponent {
    title = 'Fruit facts';
    content = 'Strawberries have more vitamin C than oranges.';
    types = '';

    constructor(private _messageBoxService: MessageBoxService) {}

    open(type: MessageBoxType, showSemanticIcon: boolean = true, customSemanticIcon?: string): void {
        this.types = `Message box uses the semantic type "${type}" ${
            customSemanticIcon ? 'with custom icon' : 'with default icon'
        }`;
        const messageBoxRef = this._messageBoxService.open(
            {
                title: this.title,
                content: this.content,
                approveButton: 'Ok',
                cancelButton: 'Cancel',
                approveButtonCallback: () => messageBoxRef.close('Approved'),
                cancelButtonCallback: () => messageBoxRef.close('Canceled'),
                closeButtonCallback: () => messageBoxRef.dismiss('Dismissed')
            },
            {
                type,
                showSemanticIcon,
                customSemanticIcon,
                ariaLabelledBy: 'fd-message-box-semantic-types-header fd-message-box-semantic-types-body',
                ariaDescribedBy: 'fd-message-box-semantic-types-types'
            }
        );
    }
}
