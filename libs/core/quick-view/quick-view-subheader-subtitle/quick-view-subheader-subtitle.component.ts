import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';
@Component({
    selector: 'fd-quick-view-subheader-subtitle',
    templateUrl: './quick-view-subheader-subtitle.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuickViewSubheaderSubtitleComponent {
    /** Whether the subtitle should wrap on multiple lines */
    readonly allowWrap = input(false, { transform: booleanAttribute });
}
