import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fd-layout-panel-header',
    templateUrl: './layout-panel-header.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'fd-layout-panel__header'
    }
})
export class LayoutPanelHeaderComponent {}
