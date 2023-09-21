import { NgModule } from '@angular/core';

import { SplitterPaginationComponent } from './splitter-pagination/splitter-pagination.component';
import {
    NoDefaultPanePipe,
    SplitterPaneContainerComponent
} from './splitter-pane-container/splitter-pane-container.component';
import { SplitterResizerComponent } from './splitter-resizer/splitter-resizer.component';
import { SplitterSplitPaneComponent } from './splitter-split-pane/splitter-split-pane.component';
import { SplitterComponent } from './splitter.component';

const components = [
    SplitterComponent,
    SplitterPaneContainerComponent,
    SplitterSplitPaneComponent,
    SplitterResizerComponent,
    SplitterPaginationComponent,
    NoDefaultPanePipe
];

/**
 * @deprecated
 * Use individual component imports.
 */
@NgModule({
    imports: [...components],
    exports: [...components]
})
export class SplitterModule {}
