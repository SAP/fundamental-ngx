import { EventEmitter, QueryList } from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { SplitterPaneResizeEvent } from '../interfaces/splitter-pane-resize-event.interface';
import { SplitterSplitPaneComponent } from '../splitter-split-pane/splitter-split-pane.component';
import { PaneTypeInput } from './splitter-pane-container.component';
import { SplitterPaneContainerOrientationType } from './splitter-pane-orientation.enum';

export interface SplitterPaneContainer {
    orientation: SplitterPaneContainerOrientationType;
    resizerType: Nullable<PaneTypeInput>;
    paneType: Nullable<PaneTypeInput>;
    resize: EventEmitter<SplitterPaneResizeEvent[]>;
    _panes: QueryList<SplitterSplitPaneComponent>;
    _directPanes: QueryList<SplitterSplitPaneComponent>;
    _defaultPane: Nullable<SplitterSplitPaneComponent>;
    _pages: string[];
    _currentPage: string;
}
