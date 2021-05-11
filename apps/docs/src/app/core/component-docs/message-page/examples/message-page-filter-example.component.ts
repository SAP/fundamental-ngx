import { Component } from '@angular/core';

@Component({
    selector: 'fd-message-page-filter-example',
    template: `
    <fd-message-page type="filter">
        <fd-message-page-title>No matching items found.</fd-message-page-title>
        <fd-message-page-subtitle>Check the filter settings.</fd-message-page-subtitle>
    </fd-message-page>
    `,
})
export class MessagePageFilterExampleComponent {}
