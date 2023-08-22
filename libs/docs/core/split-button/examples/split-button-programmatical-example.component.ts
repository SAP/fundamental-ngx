import { Component } from '@angular/core';
import { MenuItemComponent } from '@fundamental-ngx/core/menu';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { MenuModule } from '@fundamental-ngx/core/menu';
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
    standalone: true,
    imports: [SplitButtonModule, MenuModule, ButtonModule]
})
export class ButtonSplitProgrammaticalExampleComponent {
    selectedOption: MenuItemComponent;

    select(option: MenuItemComponent): void {
        this.selectedOption = option;
    }
}
