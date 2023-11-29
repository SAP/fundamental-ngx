import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fdb-navigation-parent-item-link',
    standalone: true,
    imports: [],
    templateUrl: './navigation-parent-item-link.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationParentItemLinkComponent {}
