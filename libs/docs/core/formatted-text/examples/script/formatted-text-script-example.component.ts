import { Component } from '@angular/core';
import { FormattedTextModule } from '@fundamental-ngx/core/formatted-text';

@Component({
    selector: 'fd-formatted-text-script-example',
    templateUrl: './formatted-text-script-example.component.html',
    standalone: true,
    imports: [FormattedTextModule]
})
export class FormattedTextScriptExampleComponent {
    rawHTMLWithScript = `<script>alert(1);</script>`;
}
