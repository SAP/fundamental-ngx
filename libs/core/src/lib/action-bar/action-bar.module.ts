import { NgModule } from '@angular/core';

import { ActionBarActionsDirective } from './action-bar-actions/action-bar-actions.directive';
import { ActionBarBackDirective } from './action-bar-back/action-bar-back.directive';
import { ActionBarDescriptionDirective } from './action-bar-description/action-bar-description.directive';
import { ActionBarHeaderDirective } from './action-bar-header/action-bar-header.directive';
import { ActionBarMobileDirective } from './action-bar-mobile/action-bar-mobile.directive';
import { ActionBarTitleComponent } from './action-bar-title/action-bar-title.component';
import { ActionBarComponent } from './action-bar.component';

const components = [
    ActionBarComponent,
    ActionBarTitleComponent,
    ActionBarDescriptionDirective,
    ActionBarHeaderDirective,
    ActionBarActionsDirective,
    ActionBarBackDirective,
    ActionBarMobileDirective
];

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [...components],
    exports: [...components]
})
export class ActionBarModule {}
