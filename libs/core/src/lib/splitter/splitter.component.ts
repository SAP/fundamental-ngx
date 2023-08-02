import {
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    Input,
    QueryList,
    ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs';

import { SplitterSplitPaneComponent } from './splitter-split-pane/splitter-split-pane.component';
import deprecated from 'deprecated-decorator';

@Component({
    selector: 'fd-splitter',
    templateUrl: './splitter.component.html',
    styleUrls: ['./splitter.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { class: 'fd-splitter' }
})
export class SplitterComponent {
    /** Id of the main pane. */
    @Input()
    set defaultPaneId(value: string) {
        this._defaultPaneId = value;

        this._defaultPaneId$.next(this._defaultPaneId);
    }

    get defaultPaneId(): string {
        return this._defaultPaneId;
    }

    /**
     * @deprecated use i18n capabilities instead
     * aria-label for the pagination item.
     */
    @Input()
    @deprecated("i18n capabilities 'coreSplitter.paginationItemAriaLabel' key")
    paginationItemAriaLabel: string;

    /** @hidden */
    _defaultPaneId$ = new Subject<string>();

    /** @hidden */
    @ContentChildren(SplitterSplitPaneComponent, { descendants: true })
    _panes: QueryList<SplitterSplitPaneComponent>;

    /** @hidden */
    private _defaultPaneId: string;

    /** Check whether certain pane is on canvas. */
    isPaneOnCanvas(paneId: string): boolean {
        if (!this._panes.length) {
            return false;
        }

        const paneToCheck = this._panes.find((pane) => pane.id === paneId);

        return !!paneToCheck?.isOnCanvas;
    }

    /** Hide certain pane from the canvas. */
    hidePaneFromCanvas(paneId: string): void {
        if (!this._panes.length) {
            return;
        }

        const paneToRemove = this._panes.find((pane) => pane.id === paneId);

        paneToRemove?.hideFromCanvas();
    }

    /** Show certain pane from the canvas. */
    showPaneOnCanvas(paneId: string): void {
        if (!this._panes.length) {
            return;
        }

        const paneToShow = this._panes.find((pane) => pane.id === paneId);

        paneToShow?.showOnCanvas();
    }
}
