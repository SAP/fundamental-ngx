import { Component } from '@angular/core';
import { MenuModule } from '@fundamental-ngx/core/menu';
import { SplitButtonModule } from '@fundamental-ngx/core/split-button';

@Component({
    selector: 'fd-split-button-icons-example',
    templateUrl: './split-button-icons-example.component.html',
    styles: [
        `
            fd-split-button {
                margin-right: 12px;
            }
        `
    ],
    imports: [SplitButtonModule, MenuModule]
})
export class ButtonSplitTypesIconsComponent {}
