import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    Input,
    ViewEncapsulation
} from '@angular/core';

import { TableToolbarActionsComponent } from '../table-toolbar-actions/table-toolbar-actions.component';

@Component({
    selector: 'fdp-table-toolbar',
    templateUrl: './table-toolbar.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableToolbarComponent implements AfterViewInit {
    /** Table title. */
    @Input() title: string;

    /** Toggle to show table item count. */
    @Input() hideItemCount: boolean;

    /** @hidden */
    @ContentChild(TableToolbarActionsComponent)
    tableToolbarActionsComponent: TableToolbarActionsComponent;

    /** @hidden */
    constructor(private readonly cd: ChangeDetectorRef) {}

    /** @hidden */
    ngAfterViewInit(): void {
        this.cd.detectChanges();
    }
}
