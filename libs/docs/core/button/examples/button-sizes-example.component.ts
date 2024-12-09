import { Component } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';

@Component({
    selector: 'fd-button-sizes-example',
    templateUrl: './button-sizes-example.component.html',
    styles: [
        `
            .fd-button {
                margin-right: 12px;
                margin-bottom: 10px;
            }
        `
    ],
    imports: [ButtonComponent, ContentDensityDirective]
})
export class ButtonSizesExampleComponent {}
