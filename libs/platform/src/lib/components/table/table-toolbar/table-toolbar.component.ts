import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    Input,
    TemplateRef,
    ViewChild
} from '@angular/core';

import { TableToolbarActionsComponent } from '../table-toolbar-actions/table-toolbar-actions.component';

/**
 * The component that represents a table toolbar.
 * ```html
 * <fdp-table-toolbar
 *  title="Order Line Items"
 *  [hideItemCount]="false">
 * </fdp-table-toolbar>
 * ```
 * */
@Component({
    selector: 'fdp-table-toolbar',
    templateUrl: './table-toolbar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableToolbarComponent implements AfterViewInit {
    /** Table title. */
    @Input()
    title: string;

    /** Toggle to show table item count. */
    @Input()
    hideItemCount: boolean;

    /** @hidden */
    @ContentChild(TableToolbarActionsComponent)
    tableToolbarActionsComponent: TableToolbarActionsComponent;

    /** @hidden */
    @ViewChild(TemplateRef)
    contentTemplateRef: TemplateRef<any>;

    /** @hidden */
    constructor(private readonly _cd: ChangeDetectorRef) {}

    /** @hidden */
    ngAfterViewInit(): void {
        this._cd.detectChanges();
    }
}
