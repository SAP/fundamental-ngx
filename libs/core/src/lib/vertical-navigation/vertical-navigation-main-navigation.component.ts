import { ChangeDetectionStrategy, Component, ContentChild, ViewEncapsulation } from '@angular/core';
import { ListComponent } from '@fundamental-ngx/core/list';

@Component({
    selector: 'fd-vertical-navigation-main-navigation',
    template: `<nav class="fd-vertical-nav__main-navigation"><ng-content></ng-content></nav>`,
    styleUrls: ['./vertical-navigation.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerticalNavigationMainNavigationComponent {
    /** @hidden */
    @ContentChild(ListComponent)
    _list: ListComponent;
}
