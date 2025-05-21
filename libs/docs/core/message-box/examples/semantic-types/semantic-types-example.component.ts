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
    imports: [ButtonComponent]
})
export class SemanticTypesExampleComponent {
    title = 'Fruit facts';
    content = 'Strawberries have more vitamin C than oranges.';
    types = '';
    titleId = '';
    contentId = '';

    constructor(private _messageBoxService: MessageBoxService) {}

    open(type: MessageBoxType, showSemanticIcon: boolean = true, customSemanticIcon?: string): void {
        this.types = `Message box uses the semantic type "${type}" ${
            customSemanticIcon ? 'with custom icon' : 'with default icon'
        }`;
        this.titleId = `fd-message-box-semantic-title-${type}`;
        this.contentId = `fd-message-box-semantic-content-${type}`;
        const messageBoxRef = this._messageBoxService.open(
            {
                title: this.title,
                titleId: this.titleId,
                content: this.content,
                contentId: this.contentId,
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
                ariaLabelledBy: this.titleId,
                ariaDescribedBy: this.contentId
            }
        );
    }
}
