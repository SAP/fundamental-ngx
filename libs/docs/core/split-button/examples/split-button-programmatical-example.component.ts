import { Component } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { MenuItemComponent, MenuModule } from '@fundamental-ngx/core/menu';
import { SplitButtonModule } from '@fundamental-ngx/core/split-button';

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
    ],
    imports: [SplitButtonModule, MenuModule, ButtonComponent]
})
export class ButtonSplitProgrammaticalExampleComponent {
    selectedOption: MenuItemComponent;

    select(option: MenuItemComponent): void {
        this.selectedOption = option;
    }
}
