import { Component } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';

@Component({
    selector: 'fd-button-toggled-example',
    templateUrl: './button-toggled-example.component.html',
    styles: [
        `
            .fd-button {
                margin-right: 12px;
                margin-bottom: 10px;
            }
        `
    ],
    imports: [ButtonComponent]
})
export class ButtonToggledExampleComponent {
    toggled = true;
    emphasizedToggled = true;
    ghostToggled = true;
    positiveToggled = true;
    negativeToggled = true;
    attentionToggled = true;
    transparentToggled = true;
}
