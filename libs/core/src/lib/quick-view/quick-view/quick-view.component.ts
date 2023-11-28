import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

let quickViewUniqueId = 0;

@Component({
    selector: 'fd-quick-view',
    templateUrl: './quick-view.component.html',
    styleUrl: './quick-view.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true
})
export class QuickViewComponent {
    /** Id of the quick view element. */
    @Input()
    id: string = 'fd-quick-view-' + quickViewUniqueId++;
}
