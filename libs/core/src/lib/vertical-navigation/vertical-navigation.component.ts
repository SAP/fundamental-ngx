import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fd-vertical-navigation',
    template: `<div class="fd-vertical-nav"><ng-content></ng-content></div>`,
    styleUrls: ['./vertical-navigation.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerticalNavigationComponent {}
