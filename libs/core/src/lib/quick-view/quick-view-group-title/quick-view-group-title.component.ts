import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

let groupTitleUniqueId = 0;

@Component({
    selector: 'fd-quick-view-group-title',
    templateUrl: './quick-view-group-title.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuickViewGroupTitleComponent {
    /** Id of the quick view group title. */
    @Input()
    id: string = 'fd-quick-view-group-title-' + groupTitleUniqueId++;
}
