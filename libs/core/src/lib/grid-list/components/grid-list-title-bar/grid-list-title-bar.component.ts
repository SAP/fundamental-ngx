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
    /** Sets title of the Grid List */
    @Input()
    title: string;
}
