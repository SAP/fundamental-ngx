import { Component } from '@angular/core';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { MenuModule } from '@fundamental-ngx/core/menu';
import { SplitButtonModule } from '@fundamental-ngx/core/split-button';

@Component({
    selector: 'fd-split-button-template-example',
    templateUrl: './split-button-template-example.component.html',
    styles: [
        `
            fd-split-button {
                margin-right: 12px;
            }
        `
    ],
    imports: [SplitButtonModule, IconComponent, MenuModule]
})
export class ButtonSplitTemplateExampleComponent {}
