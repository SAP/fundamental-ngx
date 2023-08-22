import { Component } from '@angular/core';
import { FormattedTextModule } from '@fundamental-ngx/core/formatted-text';

@Component({
    selector: 'fd-formatted-text-links-example',
    templateUrl: './formatted-text-links-example.component.html',
    standalone: true,
    imports: [FormattedTextModule]
})
export class FormattedTextLinksExampleComponent {
    rawHtmlLinks = `<a href="https://www.sap.com" target="_blank">Link to sap.com with target "_self" (will change if already exists)</a>`;
}
