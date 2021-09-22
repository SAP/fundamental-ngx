import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    Input,
    QueryList,
    ViewEncapsulation
} from '@angular/core';
import { ListNavigationItemComponent } from '@fundamental-ngx/core/list';

@Component({
    selector: 'fd-vertical-navigation',
    templateUrl: './vertical-navigation.component.html',
    styleUrls: ['./vertical-navigation.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerticalNavigationComponent implements AfterContentInit {
    /** Whether or not this component is to be shown in 'condensed' mode. */
    @Input()
    condensed = false;

    /** @hidden */
    @ContentChildren(ListNavigationItemComponent)
    private _navigationItems: QueryList<ListNavigationItemComponent>;

    /** @hidden */
    ngAfterContentInit(): void {
        if (this.condensed) {
            this._navigationItems.forEach((navItem) => {
                navItem._condensed = true;
            });
        }
    }
}
