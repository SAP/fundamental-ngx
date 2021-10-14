import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { VhdFilter } from '../../models/vhd-filter.model';

@Component({
    selector: 'fdp-value-help-dialog-filter',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VhdFilterComponent implements VhdFilter {
    /** Uniq key for search and filtering */
    @Input()
    key: string;

    /** Allow to control which of filters should show as main in mobile view.
     * Apply for search table only */
    @Input()
    main = false;

    /** Label for header in search table and search field */
    @Input()
    label: string;

    /** Initial filter's value for search section in `select from list tab` only */
    @Input()
    value = '';

    /** Allow to show filter in advanced search template */
    @Input()
    advanced = true;

    /** Allow to use filter for including in `define conditions tab` */
    @Input()
    include = true;

    /** Allow to use filter for excluding in `define conditions tab` */
    @Input()
    exclude = true;
}
