import { Component } from '@angular/core';
import { TokenComponent } from '@fundamental-ngx/core/token';
import { FdPatchLanguageDirective } from '@fundamental-ngx/i18n';

@Component({
    selector: 'fd-token-example',
    templateUrl: './token-example.component.html',
    styles: [
        `
            fd-token {
                padding-right: 4px;
            }
        `
    ],
    standalone: true,
    imports: [TokenComponent, FdPatchLanguageDirective]
})
export class TokenExampleComponent {
    isOpen = true;
}
