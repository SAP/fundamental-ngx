import { Pipe, PipeTransform } from '@angular/core';
import { SplitterSplitPaneComponent } from '../splitter-split-pane/splitter-split-pane.component';
import { SplitterPaneContainerComponent } from './splitter-pane-container.component';

@Pipe({
    name: 'noDefaultPane',
    standalone: true
})
export class NoDefaultPanePipe implements PipeTransform {
    /** @hidden */
    constructor(private readonly _splitterPaneContainer: SplitterPaneContainerComponent) {}

    /** @hidden */
    transform(value: SplitterSplitPaneComponent[], excludingCondition = true): SplitterSplitPaneComponent[] {
        if (!excludingCondition) {
            return value;
        }

        return value.filter((pane) => pane.id !== this._splitterPaneContainer._defaultPane?.id);
    }
}
