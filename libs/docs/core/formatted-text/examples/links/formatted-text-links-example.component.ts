import { Component } from '@angular/core';
import { FormattedTextComponent } from '@fundamental-ngx/core/formatted-text';

@Component({
    selector: 'fd-formatted-text-links-example',
    templateUrl: './formatted-text-links-example.component.html',
    imports: [FormattedTextComponent]
})
export class FormattedTextLinksExampleComponent {
    rawHtmlLinks = `<a href="https://www.sap.com" target="_blank">Link to sap.com with target "_self" (will change if already exists)</a>`;
}
