import { Component } from '@angular/core';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { CdkScrollable } from '@angular/cdk/overlay';

@Component({
    selector: 'fd-scrollbar-no-horizontal-example',
    template: `
        <div fd-scrollbar noHorizontalScroll style="height: 200px;">
            <div style="width: 9000px; height: 9000px;"></div>
        </div>
    `,
    standalone: true,
    imports: [CdkScrollable, ScrollbarDirective]
})
export class ScrollbarNoHorizontalExampleComponent {}
