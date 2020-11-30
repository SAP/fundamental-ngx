import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    forwardRef,
    Input,
    Output,
    TemplateRef,
    ViewChild
} from '@angular/core';

import { FiltersViewStep, FILTERS_VIEW_STEP_TOKEN } from './filters-active-step';

export interface SelectableFilter {
    label: string;
}

@Component({
    selector: 'fdp-filters-list-step',
    templateUrl: './filters-list-step.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: FILTERS_VIEW_STEP_TOKEN, useExisting: forwardRef(() => FiltersListStepComponent) }]
})
export class FiltersListStepComponent implements FiltersViewStep {
    @Input()
    filters: SelectableFilter[] = [];

    @Output()
    selectFilter: EventEmitter<SelectableFilter> = new EventEmitter<SelectableFilter>();

    @ViewChild('titleTemplate')
    titleTemplateRef: TemplateRef<any>;

    @ViewChild('bodyTemplate')
    bodyTemplateRef: TemplateRef<any>;
}
