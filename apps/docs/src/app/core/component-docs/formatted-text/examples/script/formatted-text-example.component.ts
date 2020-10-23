import { Component } from '@angular/core';

@Component({
    selector: 'fd-formatted-text-script-example',
    templateUrl: './formatted-text-example.component.html'
})
export class FormattedTextScriptExampleComponent {
    rawHTMLWithScript = `<script>alert(1);</script>`;
}
