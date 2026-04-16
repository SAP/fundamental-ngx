import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TitleComponent } from '@fundamental-ngx/core/title';

@Component({
    selector: 'fd-quick-view-subheader-title',
    templateUrl: './quick-view-subheader-title.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [TitleComponent]
})
export class QuickViewSubheaderTitleComponent {
    /** Whether the text should wrap on multiple lines. */
    readonly allowWrap = input(false, { transform: booleanAttribute });

    /** The header size to be applied to the title. */
    readonly headerSize = input<1 | 2 | 3 | 4 | 5 | 6>(5);
}
