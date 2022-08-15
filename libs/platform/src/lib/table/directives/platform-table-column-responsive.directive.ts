import { Directive, Inject, Input, Optional } from '@angular/core';
import equal from 'fast-deep-equal';
import { TableColumn } from '../components';
import { FdpColumnResponsiveState } from '../interfaces/column-responsive-state.interface';
import { TableResponsiveService } from '../table-responsive.service';

@Directive({
    selector: '[fdpTableColumnResponsive]'
})
export class PlatformTableColumnResponsiveDirective {
    /**
     * Responsive breakpoints configuration.
     * @param value where key is minimal table with and value is a column visibility type.
     */
    @Input('fdpTableColumnResponsive')
    set breakpoints(value: Record<string, FdpColumnResponsiveState>) {
        if (equal(value, this._breakpoints) || !this._column) {
            return;
        }
        this._breakpoints = value;
        this._responsiveTableService.registerResponsiveColumn(this._column, this._breakpoints);
    }

    get breakpoints(): Record<number, FdpColumnResponsiveState> {
        return this._breakpoints;
    }

    /** @hidden */
    private _breakpoints: Record<number, FdpColumnResponsiveState> = {};

    /** @hidden */
    constructor(
        private readonly _responsiveTableService: TableResponsiveService,
        @Optional() @Inject(TableColumn) private readonly _column: TableColumn | null
    ) {}
}
