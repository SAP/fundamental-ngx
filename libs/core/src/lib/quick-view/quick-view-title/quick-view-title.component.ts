import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'fd-quick-view-title',
    templateUrl: './quick-view-title.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuickViewTitleComponent {
    /** Alignment of title. */
    @Input() align: 'left' | 'right' | 'middle' = 'middle';
}
