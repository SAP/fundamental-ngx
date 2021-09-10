import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChild, Input, ViewEncapsulation } from '@angular/core';
import { VerticalNavigationMainNavigationComponent } from './vertical-navigation-main-navigation.compenent';

@Component({
    selector: 'fd-vertical-navigation',
    template: `<div class="fd-vertical-nav" [ngClass]="{'fd-vertical-nav--condensed': condensed}"><ng-content></ng-content></div>`,
    styleUrls: ['./vertical-navigation.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerticalNavigationComponent implements AfterContentInit {

    /** Whether or not this component is to be shown in 'condensed' mode. */
    @Input()
    condensed = false;

    /** @hidden */
    @ContentChild(VerticalNavigationMainNavigationComponent)
    _mainNav: VerticalNavigationMainNavigationComponent;

    /** @hidden */
    ngAfterContentInit(): void {
        if (this.condensed) {
            this._mainNav._list._navItems.forEach(navItem => {
                navItem._condensed = true;
            })
        }
    }

}
