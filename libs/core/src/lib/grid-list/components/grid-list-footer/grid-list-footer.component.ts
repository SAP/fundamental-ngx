import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'fd-grid-list-footer',
    templateUrl: './grid-list-footer.component.html',
    host: {
        class: 'fd-col fd-col--12'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridListFooterComponent {}
