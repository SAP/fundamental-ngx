import { ChangeDetectionStrategy, Component, ContentChild, ViewEncapsulation } from '@angular/core';
import { FD_LIST_COMPONENT, ListComponent } from '@fundamental-ngx/core/list';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';

@Component({
    selector: 'fd-vertical-navigation-main-navigation',
    template: `<nav
        [attr.aria-label]="'coreNavigation.mainNavigation' | fdTranslate"
        class="fd-vertical-nav__main-navigation"
    >
        <ng-content></ng-content>
    </nav>`,
    styleUrl: './vertical-navigation.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FdTranslatePipe]
})
export class VerticalNavigationMainNavigationComponent {
    /** @hidden */
    @ContentChild(FD_LIST_COMPONENT)
    _list: ListComponent;
}
