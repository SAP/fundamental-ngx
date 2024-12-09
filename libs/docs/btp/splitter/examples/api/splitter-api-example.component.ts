import { Component, ViewChild } from '@angular/core';

import { SplitterComponent, SplitterModule, SplitterSplitPaneComponent } from '@fundamental-ngx/btp/splitter';
import { BarModule } from '@fundamental-ngx/core/bar';

@Component({
    selector: 'fdb-splitter-api-example',
    templateUrl: './splitter-api-example.component.html',
    imports: [BarModule, SplitterModule]
})
export class SplitterApiExampleComponent {
    @ViewChild(SplitterComponent)
    splitter: SplitterComponent;

    @ViewChild('paneTwo')
    paneTwo: SplitterSplitPaneComponent;

    hidePaneTwo(): void {
        this.splitter.hidePaneFromCanvas(this.paneTwo.id);

        // Also can be used

        this.paneTwo.hideFromCanvas();
    }

    showPaneTwo(): void {
        this.paneTwo.showOnCanvas();

        // Also can be used

        this.splitter.showPaneOnCanvas(this.paneTwo.id);
    }

    adjustSize(): void {
        this.paneTwo.size === '200px' ? (this.paneTwo.size = '100px') : (this.paneTwo.size = '200px');
    }
}
