import { Component } from '@angular/core';
import { TokenModule } from '@fundamental-ngx/core/token';
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
    imports: [TokenModule, FdPatchLanguageDirective]
})
export class TokenExampleComponent {
    isOpen = true;
}
