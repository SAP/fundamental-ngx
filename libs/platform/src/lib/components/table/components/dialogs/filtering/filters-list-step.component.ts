import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

export interface SelectableFilter {
    label: string;
}

@Component({
    selector: 'fdp-filters-list-step',
    templateUrl: './filters-list-step.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltersListStepComponent {
    @Input() filters: SelectableFilter[] = [];

    @Output() selectFilter: EventEmitter<SelectableFilter> = new EventEmitter<SelectableFilter>();

    @Output() confirm: EventEmitter<void> = new EventEmitter<void>();

    @Output() cancel: EventEmitter<void> = new EventEmitter<void>();
}
