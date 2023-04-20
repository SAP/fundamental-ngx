import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActionBarComponent } from './action-bar.component';
import { ActionBarTitleComponent } from './action-bar-title/action-bar-title.component';
import { ActionBarDescriptionDirective } from './action-bar-description/action-bar-description.directive';
import { ActionBarHeaderDirective } from './action-bar-header/action-bar-header.directive';
import { ActionBarActionsDirective } from './action-bar-actions/action-bar-actions.directive';
import { ActionBarBackDirective } from './action-bar-back/action-bar-back.directive';
import { ActionBarMobileDirective } from './action-bar-mobile/action-bar-mobile.directive';

@NgModule({
    imports: [
        CommonModule,
        ActionBarComponent,
        ActionBarTitleComponent,
        ActionBarDescriptionDirective,
        ActionBarHeaderDirective,
        ActionBarActionsDirective,
        ActionBarBackDirective,
        ActionBarMobileDirective
    ],
    exports: [
        ActionBarComponent,
        ActionBarTitleComponent,
        ActionBarDescriptionDirective,
        ActionBarHeaderDirective,
        ActionBarActionsDirective,
        ActionBarBackDirective,
        ActionBarMobileDirective
    ]
})
export class ActionBarModule {}
