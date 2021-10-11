import { Pipe, PipeTransform } from '@angular/core';

import { SplitterPaneContainerComponent } from './splitter-pane-container/splitter-pane-container.component';
import { SplitterSplitPaneComponent } from './splitter-split-pane/splitter-split-pane.component';

@Pipe({ name: 'noDefaultPane' })
export class NoDefaultPanePipe implements PipeTransform {
    constructor(private readonly _splitterPaneContainer: SplitterPaneContainerComponent) {}

    transform(value: SplitterSplitPaneComponent[], excludingCondition = true, ...args): any {
        if (!excludingCondition) {
            return value;
        }

        return value.filter(pane => pane.id !== this._splitterPaneContainer._defaultPane?.id);
    }
}

