import { ChangeDetectionStrategy, Component, input, Input } from '@angular/core';
import { HeadingLevel } from '@fundamental-ngx/core/shared';

let groupTitleUniqueId = 0;

@Component({
    selector: 'fd-quick-view-group-title',
    templateUrl: './quick-view-group-title.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class QuickViewGroupTitleComponent {
    /** Id of the quick view group title. */
    @Input()
    id: string = 'fd-quick-view-group-title-' + groupTitleUniqueId++;

    /** Heading level of the title. */
    headingLevel = input<HeadingLevel | undefined | null>(undefined);
}
