import { Component, ViewChild } from '@angular/core';

import { SplitterComponent, SplitterSplitPaneComponent } from '@fundamental-ngx/core/splitter';


@Component({
    selector: 'fd-slider-api-example',
    templateUrl: './splitter-api-example.component.html'
})
export class SplitterApiExampleComponent {
    @ViewChild(SplitterComponent)
    splitter: SplitterComponent;

    @ViewChild('paneOne')
    paneOne: SplitterSplitPaneComponent

    paneOneId = 'one';

    paneTwoId = 'two';

    hidePaneOne(): void {
        this.splitter.hidePaneFromCanvas(this.paneOneId);

        // Also can be used

        this.paneOne.hideFromCanvas();
    }

    showPaneOne(): void {
        this.paneOne.showOnCanvas();

        // Also can be used

        this.splitter.showPaneOnCanvas(this.paneOneId);
    }
}
