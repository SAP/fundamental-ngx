import { Component } from '@angular/core';
import { FormattedTextComponent } from '@fundamental-ngx/core/formatted-text';

@Component({
    selector: 'fd-formatted-text-script-example',
    templateUrl: './formatted-text-script-example.component.html',
    imports: [FormattedTextComponent]
})
export class FormattedTextScriptExampleComponent {
    rawHTMLWithScript = `<script>alert(1);</script>`;
}
