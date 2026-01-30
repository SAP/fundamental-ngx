import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
@Component({
    selector: 'fd-layout-panel-filters',
    template: `<ng-content></ng-content>`,
    host: {
        class: 'fd-layout-panel__filters fd-has-display-block'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutPanelFiltersComponent {}
