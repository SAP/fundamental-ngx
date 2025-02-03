import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    forwardRef,
    Input,
    Output,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {
    ListComponent,
    ListGroupHeaderDirective,
    ListItemComponent,
    ListLinkDirective,
    ListTitleDirective
} from '@fundamental-ngx/core/list';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { FILTERS_VIEW_STEP_TOKEN, FiltersViewStep } from './filters-active-step';

/**
 * Filters list dialog step.
 *
 * Used to render available filters to drill down.
 *
 */

export interface SelectableFilter {
    label: string;
}
@Component({
    selector: 'fdp-filters-list-step',
    templateUrl: './filters-list-step.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    /** Each filters dialog step must provide FILTERS_VIEW_STEP_TOKEN to be accessible */
    providers: [{ provide: FILTERS_VIEW_STEP_TOKEN, useExisting: forwardRef(() => FiltersListStepComponent) }],
    imports: [
        TitleComponent,
        ListComponent,
        ListGroupHeaderDirective,
        ListItemComponent,
        ListLinkDirective,
        ListTitleDirective,
        FdTranslatePipe
    ]
})
export class FiltersListStepComponent implements FiltersViewStep {
    /** Selectable filters list */
    @Input()
    filters: SelectableFilter[] = [];

    /** Select event is fired once some filter is selected */
    @Output()
    selectFilter: EventEmitter<SelectableFilter> = new EventEmitter<SelectableFilter>();

    /** Template ref to the filter title */
    @ViewChild('titleTemplate')
    titleTemplateRef: TemplateRef<any>;

    /** Template ref to the filter body */
    @ViewChild('bodyTemplate')
    bodyTemplateRef: TemplateRef<any>;
}
