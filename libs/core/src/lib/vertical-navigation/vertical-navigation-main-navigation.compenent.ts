import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fd-vertical-navigation-main-navigation',
    template: `<nav class="fd-vertical-nav__main-navigation"><ng-content></ng-content></nav>`,
    styleUrls: ['./vertical-navigation.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerticalNavigationMainNavigationComponent {}
