import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';
@Component({
    selector: 'fd-grid-list-group-header',
    templateUrl: './grid-list-group-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'fd-col fd-col--12'
    },
    standalone: true
})
export class GridListGroupHeaderComponent {
    /** Sets the `aria-label` attribute to the element. */
    @Input()
    ariaLabel: Nullable<string>;
}
