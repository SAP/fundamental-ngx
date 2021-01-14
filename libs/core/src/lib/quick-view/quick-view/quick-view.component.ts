import { ChangeDetectionStrategy, Component, ViewEncapsulation, Input } from '@angular/core';

let quickViewUniqueId = 0;

@Component({
    selector: 'fd-quick-view',
    templateUrl: './quick-view.component.html',
    styleUrls: ['./quick-view.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuickViewComponent {
    /** Id of the quick view element. */
    @Input()
    id: string = 'fd-quick-view-' + quickViewUniqueId++;
}
