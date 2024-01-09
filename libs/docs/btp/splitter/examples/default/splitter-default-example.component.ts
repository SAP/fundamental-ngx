import { Component } from '@angular/core';

import { SplitterModule, SplitterPaneResizeEvent } from '@fundamental-ngx/btp/splitter';

@Component({
    selector: 'fd-splitter-default-example',
    templateUrl: './splitter-default-example.component.html',
    standalone: true,
    imports: [SplitterModule]
})
export class SplitterDefaultExampleComponent {
    onResize(event: SplitterPaneResizeEvent[]): void {
        console.log(event);
    }
}
