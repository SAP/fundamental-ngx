import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { CollectionFilter } from '@fundamental-ngx/platform/table-helpers';

/**
 * Personalization Dialog Filter Settings.
 *
 */
@Component({
    selector: 'fdp-table-p13-filter, fdp-table-p13n-filter',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TableP13FilterComponent {
    /**
     * Function for handling validation of the filter rules in the table personalization dialog.
     */
    @Input()
    validator: ((rules: CollectionFilter[]) => boolean) | undefined;
}
