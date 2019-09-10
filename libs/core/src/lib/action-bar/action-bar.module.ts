import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';

import { ActionBarComponent } from './action-bar.component';
import { ActionBarTitleDirective } from './action-bar-title/action-bar-title.directive';
import { ActionBarDescriptionDirective } from './action-bar-description/action-bar-description.directive';
import { ActionBarHeaderDirective } from './action-bar-header/action-bar-header.directive';
import { ActionBarActionsDirective } from './action-bar-actions/action-bar-actions.directive';
import { ActionBarBackDirective } from './action-bar-back/action-bar-back.directive';
import { ActionBarMobileDirective } from './action-bar-mobile/action-bar-mobile.directive';

@NgModule({
    declarations: [
        ActionBarComponent,
        ActionBarTitleDirective,
        ActionBarDescriptionDirective,
        ActionBarHeaderDirective,
        ActionBarActionsDirective,
        ActionBarBackDirective,
        ActionBarMobileDirective
    ],
    imports: [CommonModule, ButtonModule, IconModule],
    exports: [
        ActionBarComponent,
        ActionBarTitleDirective,
        ActionBarDescriptionDirective,
        ActionBarHeaderDirective,
        ActionBarActionsDirective,
        ActionBarBackDirective,
        ActionBarMobileDirective
    ]
})
export class ActionBarModule {}
