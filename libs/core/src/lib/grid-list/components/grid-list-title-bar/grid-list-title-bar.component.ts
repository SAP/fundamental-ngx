import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'fd-grid-list-title-bar',
    templateUrl: './grid-list-title-bar.component.html',
    host: {
        class: 'fd-col fd-col--12'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridListTitleBarComponent {
    /** Sets title of the button */
    @Input()
    title: string;

    /** Sets the number of total items. */
    @Input()
    totalCount = 0;

    /** @hidden */
    _showTotalCount = true;
}
