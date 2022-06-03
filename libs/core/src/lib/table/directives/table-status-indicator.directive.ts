import { Directive, Input } from '@angular/core';

import { Nullable } from '@fundamental-ngx/core/shared';

export type TableStatuses = 'valid' | 'warning' | 'information' | 'error';

@Directive({
    selector: '[fdTableStatusIndicator], [fd-table-status-indicator]',
    host: {
        class: 'fd-table__cell--status-indicator',
        '[class.fd-table__cell--status-indicator--valid]': 'status === "valid"',
        '[class.fd-table__cell--status-indicator--warning]': 'status === "warning"',
        '[class.fd-table__cell--status-indicator--information]': 'status === "information"',
        '[class.fd-table__cell--status-indicator--error]': 'status === "error"'
    }
})
export class TableStatusIndicatorDirective {
    /** The type of indicator. Options are 'valid', 'warning', 'information' and 'error'. */
    @Input()
    status: Nullable<TableStatuses>;
}
