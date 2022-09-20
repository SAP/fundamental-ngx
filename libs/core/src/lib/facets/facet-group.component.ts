import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';

import { Nullable } from '@fundamental-ngx/core/shared';

@Component({
    selector: 'fd-facet-group',
    templateUrl: './facet-group.component.html',
    styleUrls: ['./facet-group.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class.fd-facet-group]': 'true',
        '[attr.aria-label]': 'ariaLabel',
        role: 'group'
    }
})
export class FacetGroupComponent {
    /**
     * the aria label for the facet group
     */
    @Input()
    ariaLabel: Nullable<string>;
}
