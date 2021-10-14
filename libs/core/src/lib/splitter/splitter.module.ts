import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IconModule } from '@fundamental-ngx/core/icon';

import { SplitterPaginationComponent } from './splitter-pagination/splitter-pagination.component';
import { SplitterPaneContainerComponent } from './splitter-pane-container/splitter-pane-container.component';
import { SplitterResizerComponent } from './splitter-resizer/splitter-resizer.component';
import { SplitterSplitPaneComponent } from './splitter-split-pane/splitter-split-pane.component';
import { SplitterComponent } from './splitter.component';
import { NoDefaultPanePipe } from './pipes';


@NgModule({
    declarations: [
        SplitterComponent,
        SplitterPaneContainerComponent,
        SplitterSplitPaneComponent,
        SplitterResizerComponent,
        SplitterPaginationComponent,
        NoDefaultPanePipe
    ],
    imports: [
        CommonModule,
        IconModule,
        PortalModule
    ],
    exports: [
        SplitterComponent,
        SplitterPaneContainerComponent,
        SplitterSplitPaneComponent,
        SplitterResizerComponent,
        SplitterPaginationComponent,
        NoDefaultPanePipe
    ]
})
export class SplitterModule {
}
