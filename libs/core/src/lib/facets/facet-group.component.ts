import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';

@Component({
    selector: 'fd-facet-group',
    templateUrl: './facet-group.component.html',
    styleUrls: ['./facet-group.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class FacetGroupComponent {
    /**
     * the aria label for the facet group
     */
    @Input()
    ariaLabel: string;
}
