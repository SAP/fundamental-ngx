import { Component } from '@angular/core';

import { SplitterPaneResizeEvent } from '@fundamental-ngx/core/splitter';

@Component({
    selector: 'fd-slider-basic-example',
    templateUrl: './splitter-default-example.component.html'
})
export class SplitterDefaultExampleComponent {
    onResize(event: SplitterPaneResizeEvent[]): void {
        console.log(event);
    }
}
