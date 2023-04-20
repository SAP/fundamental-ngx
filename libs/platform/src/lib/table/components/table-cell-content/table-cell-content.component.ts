import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnChanges,
    SimpleChanges,
    ViewEncapsulation
} from '@angular/core';
import { TableRow } from '../../models/table-row.model';
import { TableColumn } from '../table-column/table-column';

@Component({
    selector: 'fdp-table-cell-content',
    templateUrl: './table-cell-content.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableCellContentComponent implements OnChanges {
    /** Table column definition. */
    @Input()
    column: TableColumn;

    /** Table row definition. */
    @Input()
    row: TableRow;

    /** Whether the row is tree. */
    @Input()
    isTreeRowFirstCell = false;

    /** @hidden Whether the row is expanded. */
    @Input()
    expanded = false;

    /** @hidden */
    constructor(private _cdRef: ChangeDetectorRef) {}

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.expanded) {
            this._cdRef.markForCheck();
        }
    }
}
