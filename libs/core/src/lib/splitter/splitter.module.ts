import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from '@fundamental-ngx/core/button';

import { IconModule } from '@fundamental-ngx/core/icon';
import { I18nModule } from '@fundamental-ngx/i18n';

import { SplitterPaginationComponent } from './splitter-pagination/splitter-pagination.component';
import {
    SplitterPaneContainerComponent,
    NoDefaultPanePipe
} from './splitter-pane-container/splitter-pane-container.component';
import { SplitterResizerComponent } from './splitter-resizer/splitter-resizer.component';
import { SplitterSplitPaneComponent } from './splitter-split-pane/splitter-split-pane.component';
import { SplitterComponent } from './splitter.component';

@NgModule({
    declarations: [
        SplitterComponent,
        SplitterPaneContainerComponent,
        SplitterSplitPaneComponent,
        SplitterResizerComponent,
        SplitterPaginationComponent,
        NoDefaultPanePipe
    ],
    imports: [CommonModule, IconModule, ButtonModule, PortalModule, I18nModule],
    exports: [
        SplitterComponent,
        SplitterPaneContainerComponent,
        SplitterSplitPaneComponent,
        SplitterResizerComponent,
        SplitterPaginationComponent,
        NoDefaultPanePipe
    ]
})
export class SplitterModule {}
