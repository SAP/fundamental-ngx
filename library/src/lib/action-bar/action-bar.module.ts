import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';

import { ActionBarDirective } from './action-bar.directive';
import { ActionBarTitleDirective } from './action-bar-title/action-bar-title.directive';
import { ActionBarDescriptionDirective } from './action-bar-description/action-bar-description.directive';
import { ActionBarHeaderDirective } from './action-bar-header/action-bar-header.directive';
import { ActionBarActionsDirective } from './action-bar-actions/action-bar-actions.directive';
import { ActionBarBackDirective } from './action-bar-back/action-bar-back.directive';
import { ActionBarMobileDirective } from './action-bar-mobile/action-bar-mobile.directive';

@NgModule({
    declarations: [
        ActionBarDirective,
        ActionBarTitleDirective,
        ActionBarDescriptionDirective,
        ActionBarHeaderDirective,
        ActionBarActionsDirective,
        ActionBarBackDirective,
        ActionBarMobileDirective
    ],
    imports: [CommonModule, ButtonModule, IconModule],
    exports: [
        ActionBarDirective,
        ActionBarTitleDirective,
        ActionBarDescriptionDirective,
        ActionBarHeaderDirective,
        ActionBarActionsDirective,
        ActionBarBackDirective,
        ActionBarMobileDirective
    ]
})
export class ActionBarModule {}
