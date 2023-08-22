import { Component } from '@angular/core';
import { FdPatchLanguageDirective } from '../../../../../i18n/src/lib/directives/patch-language.directive';
import { TokenModule } from '@fundamental-ngx/core/token';

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
