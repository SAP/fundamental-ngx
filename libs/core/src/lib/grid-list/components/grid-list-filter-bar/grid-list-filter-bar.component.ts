import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'fd-grid-list-filter-bar',
    templateUrl: './grid-list-filter-bar.component.html',
    styleUrls: ['./grid-list-filter-bar.component.scss'],
    host: {
        class: 'fd-col fd-col--12'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridListFilterBarComponent {
    /** Event is thrown, when the control button is clicked */
    @Output()
    readonly close = new EventEmitter<void>();
}
