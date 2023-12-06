import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ToolbarSpacerDirective } from '@fundamental-ngx/core/toolbar';

@Component({
    selector: 'fd-grid-list-title-bar-spacer',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class GridListTitleBarSpacerComponent extends ToolbarSpacerDirective {}
