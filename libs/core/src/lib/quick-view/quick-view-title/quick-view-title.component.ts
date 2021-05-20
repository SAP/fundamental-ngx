import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'fd-quick-view-title',
    templateUrl: './quick-view-title.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuickViewTitleComponent {
    /**
     * Alignment of title.
     * Options include 'left', 'right' and 'middle'. The default is set to 'middle'.
     * */
    @Input() align: 'left' | 'right' | 'middle' = 'middle';
}
