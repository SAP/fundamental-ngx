import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DescriptionComponent, HeaderComponent } from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'fd-docs-i18n-translation-resolver-header',
    templateUrl: './translation-resolver-header.component.html',
    imports: [HeaderComponent, DescriptionComponent, RouterOutlet]
})
export class TranslationResolverHeaderComponent {}
