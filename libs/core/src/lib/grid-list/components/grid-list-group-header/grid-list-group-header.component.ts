import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'fd-grid-list-group-header',
    templateUrl: './grid-list-group-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'fd-col fd-col--12'
    }
})
export class GridListGroupHeaderComponent {
    /** Sets the `aria-label` attribute to the element. */
    @Input()
    ariaLabel: string;
}
