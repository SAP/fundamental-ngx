import { Component } from '@angular/core';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { TokenComponent } from '@fundamental-ngx/core/token';

@Component({
    selector: 'fd-token-compact-example',
    templateUrl: './token-compact-example.component.html',
    styles: [
        `
            fd-token {
                padding-right: 4px;
            }
        `
    ],
    imports: [TokenComponent, ContentDensityDirective]
})
export class TokenCompactExampleComponent {}
