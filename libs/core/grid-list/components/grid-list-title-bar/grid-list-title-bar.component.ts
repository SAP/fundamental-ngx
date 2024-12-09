import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ToolbarComponent, ToolbarLabelDirective } from '@fundamental-ngx/core/toolbar';

@Component({
    selector: 'fd-grid-list-title-bar',
    templateUrl: './grid-list-title-bar.component.html',
    host: {
        class: 'fd-col fd-col--12'
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ToolbarComponent, ToolbarLabelDirective]
})
export class GridListTitleBarComponent {
    /** Sets title of the Grid List */
    @Input()
    title: string;
}
