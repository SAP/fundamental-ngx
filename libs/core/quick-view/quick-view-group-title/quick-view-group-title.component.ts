import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';
import { HeadingLevel } from '@fundamental-ngx/core/shared';

let groupTitleUniqueId = 0;

@Component({
    selector: 'fd-quick-view-group-title',
    templateUrl: './quick-view-group-title.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuickViewGroupTitleComponent {
    /** Whether the subtitle should wrap on multiple lines */
    readonly allowWrap = input(false, { transform: booleanAttribute });

    /** Id of the quick view group title. */
    readonly id = input(`fd-quick-view-group-title-${groupTitleUniqueId++}`);

    /** Heading level of the title. */
    readonly headingLevel = input<HeadingLevel | undefined | null>(undefined);
}
