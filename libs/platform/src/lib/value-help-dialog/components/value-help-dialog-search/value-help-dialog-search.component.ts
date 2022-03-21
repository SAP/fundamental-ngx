import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/** @deprecated */
@Component({
    selector: 'fdp-value-help-dialog-search',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VhdSearchComponent {
    /** Placeholder for main search field */
    @Input()
    placeholder = 'Search';

    /** Text value displayed in title for open state for advanced search. Only mobile state */
    @Input()
    advancedSearchLabel = 'Filters';

    /** Text value displayed in toggle button control */
    @Input()
    showAdvancedSearchLabel = 'Show filters';

    /** Text value displayed in toggle button control */
    @Input()
    hideAdvancedSearchLabel = 'Hide filters';

    /** Text value displayed in toggle button control */
    @Input()
    showAllAdvancedSearchLabel = 'Show all filters';

    /** Text value displayed in toggle button control */
    @Input()
    hideAllAdvancedSearchLabel = 'Hide all filters';

    constructor() {
        console.warn(
            '"VhdSearchComponent" is deprecated. Messages from it is no longer in use.' +
                'In order to configure custom messages, use i18n tools instead.'
        );
    }
}
