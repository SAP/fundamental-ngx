import { Component } from '@angular/core';

@Component({
    selector: 'fd-truncate-example',
    template: `
        <p fd-truncate [fdTruncateState]="false" [fdTruncateChars]="45">
            This text should not be truncated as fdTruncateState is false
        </p>
        <p fd-truncate [fdTruncateState]="true" [fdTruncateChars]="45">
            This text should be truncated to 45 characters as fdTruncateState is true
        </p>
        <p fd-truncate [fdTruncateState]="true" [fdTruncateWidth]="300">
            This element <fd-icon glyph="customer"></fd-icon> should be truncated by width as fdTruncateWidth is
            provided
        </p>
        <p fd-truncate [fdTruncateState]="false" [fdTruncateWidth]="300">
            This element <fd-icon glyph="customer"></fd-icon> should not be truncated as fdTruncateState is false
        </p>
        <p
            fd-truncate
            [fdTruncateState]="true"
            [fdTruncateChars]="45"
            [fdTruncateTargetText]="'Replacement Target Text'"
        >
            This text should be replaced by the text provided to the [fdTruncateTargetText] input
        </p>
    `
})
export class TruncateExampleComponent {}
