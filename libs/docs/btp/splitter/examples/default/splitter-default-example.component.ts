import { Component } from '@angular/core';

import { SplitterModule, SplitterPaneResizeEvent } from '@fundamental-ngx/btp/splitter';

@Component({
    selector: 'fdb-splitter-default-example',
    templateUrl: './splitter-default-example.component.html',
    imports: [SplitterModule]
})
export class SplitterDefaultExampleComponent {
    onResize(event: SplitterPaneResizeEvent[]): void {
        console.log(event);
    }
}
