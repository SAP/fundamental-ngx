import { Component } from '@angular/core';

@Component({
    selector: 'fd-message-page-error-example',
    template: `
    <fd-message-page type="error">
        <fd-message-page-title>Sorry, we can’t find this page.</fd-message-page-title>
        <fd-message-page-subtitle>
            <a fd-link>Home Page</a>
        </fd-message-page-subtitle>
    </fd-message-page>
`,
})
export class MessagePageErrorExampleComponent {}
