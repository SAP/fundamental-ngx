import { computed, Directive, input } from '@angular/core';

export type TableStatuses = 'valid' | 'warning' | 'information' | 'error';

@Directive({
    selector: '[fdTableStatusIndicator], [fd-table-status-indicator]',
    host: {
        '[class]': 'cssClass()'
    },
    standalone: true
})
export class TableStatusIndicatorDirective {
    /** The type of indicator. Options are 'valid', 'warning', 'information' and 'error'. */
    readonly status = input<TableStatuses | null | undefined>();

    /** @hidden */
    protected readonly cssClass = computed(() =>
        ['fd-table__cell--status-indicator', this.status() ? 'fd-table__cell--status-indicator--' + this.status() : '']
            .filter(Boolean)
            .join(' ')
    );
}
