import { CdkScrollable } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';

@Component({
    selector: 'fd-scrollbar-no-vertical-example',
    template: `
        <div fd-scrollbar noVerticalScroll style="height: 200px;">
            <div style="width: 9000px; height: 9000px;"></div>
        </div>
    `,
    standalone: true,
    imports: [CdkScrollable, ScrollbarDirective]
})
export class ScrollbarNoVerticalExampleComponent {}
