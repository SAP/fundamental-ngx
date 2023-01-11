import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';

import { Nullable } from '@fundamental-ngx/cdk/utils';

@Component({
    selector: 'fd-facet-group',
    template: ` <ng-content select="fd-facet"></ng-content> `,
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
