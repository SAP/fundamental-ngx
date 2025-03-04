import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { ToolbarComponent, ToolbarSpacerDirective } from '@fundamental-ngx/core/toolbar';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';

@Component({
    selector: 'fd-grid-list-filter-bar',
    templateUrl: './grid-list-filter-bar.component.html',
    host: {
        class: 'fd-col fd-col--12'
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ToolbarComponent, ToolbarSpacerDirective, IconComponent, FdTranslatePipe]
})
export class GridListFilterBarComponent {
    /** Event is thrown, when the control button is clicked */
    // eslint-disable-next-line @angular-eslint/no-output-native
    @Output() readonly close = new EventEmitter<void>();
}
