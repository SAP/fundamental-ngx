import { inject, Pipe, PipeTransform } from '@angular/core';
import { SplitterSplitPaneComponent } from '../splitter-split-pane/splitter-split-pane.component';
import { FD_SPLITTER_PANE_CONTAINER } from './splitter-pane-container.token';
import { SplitterPaneContainer } from './splitter-pane.container';

@Pipe({
    name: 'noDefaultPane',
    standalone: true
})
export class NoDefaultPanePipe implements PipeTransform {
    private readonly _splitterPaneContainer: SplitterPaneContainer = inject(FD_SPLITTER_PANE_CONTAINER);

    /** @hidden */
    transform(value: SplitterSplitPaneComponent[], excludingCondition = true): SplitterSplitPaneComponent[] {
        if (!excludingCondition) {
            return value;
        }

        return value.filter((pane) => pane.id !== this._splitterPaneContainer._defaultPane?.id);
    }
}
