import { ChangeDetectionStrategy, Component, ContentChild, ViewEncapsulation } from '@angular/core';
import { ListComponent, FD_LIST_COMPONENT } from '@fundamental-ngx/core/list';

@Component({
    selector: 'fd-vertical-navigation-main-navigation',
    template: `<nav
        [attr.aria-label]="'coreNavigation.mainNavigation' | fdTranslate"
        class="fd-vertical-nav__main-navigation"
    >
        <ng-content></ng-content>
    </nav>`,
    styleUrls: ['./vertical-navigation.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerticalNavigationMainNavigationComponent {
    /** @hidden */
    @ContentChild(FD_LIST_COMPONENT)
    _list: ListComponent;
}
