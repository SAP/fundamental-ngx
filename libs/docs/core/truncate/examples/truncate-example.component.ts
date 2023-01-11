import { Component } from '@angular/core';

@Component({
    selector: 'fd-truncate-example',
    template: `
        <p fdkTruncate [fdkTruncateState]="true" [fdkTruncateWidth]="300">
            This element <fd-icon glyph="customer"></fd-icon> <b> should be</b> truncated by width of fdTruncateWidth
        </p>
        <p fdkTruncate [fdkTruncateState]="false" [fdkTruncateWidth]="300">
            This element <fd-icon glyph="customer"></fd-icon> should <b>not</b> be truncated as
            <b>fdTruncateState</b> is <b>false</b>
        </p>
        <p fdkTruncate [fdkTruncateState]="true">
            This element <fd-icon glyph="customer"></fd-icon> should be truncated by default value <b>200px</b>
        </p>
    `
})
export class TruncateExampleComponent {}
