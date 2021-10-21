import { Component } from '@angular/core';
import { MenuItemComponent } from '@fundamental-ngx/core/menu';

@Component({
    selector: 'fd-split-button-programmatical-example',
    templateUrl: './split-button-programmatical-example.component.html',
    styles: [
        `
            fd-split-button {
                margin-right: 12px;
            }
            .docs-button {
                margin-right: 12px;
            }
        `
    ]
})
export class ButtonSplitProgrammaticalExampleComponent {
    selectedOption: MenuItemComponent;

    select(option: MenuItemComponent): void {
        this.selectedOption = option;
    }
}
