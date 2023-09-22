import { NgModule } from '@angular/core';
import { VerticalNavigationGroupHeaderDirective } from './vertical-navigation-group-header.directive';
import { VerticalNavigationMainNavigationComponent } from './vertical-navigation-main-navigation.component';
import { VerticalNavigationComponent } from './vertical-navigation.component';

const components = [
    VerticalNavigationComponent,
    VerticalNavigationMainNavigationComponent,
    VerticalNavigationGroupHeaderDirective
];

/**
 * @deprecated
 * Use direct imports of `VerticalNavigationComponent`, `VerticalNavigationMainNavigationComponent`, `VerticalNavigationGroupHeaderDirective`
 */
@NgModule({
    imports: [...components],
    exports: [...components]
})
export class VerticalNavigationModule {}
