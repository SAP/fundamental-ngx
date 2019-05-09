import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';

import { ActionBarComponent } from './action-bar.component';
import { ActionBarTitleDirective } from './action-bar-title/action-bar-title.directive';
import { ActionBarDescriptionComponent } from './action-bar-description/action-bar-description.component';
import { ActionBarHeaderComponent } from './action-bar-header/action-bar-header.component';
import { ActionBarActionsComponent } from './action-bar-actions/action-bar-actions.component';
import { ActionBarBackComponent } from './action-bar-back/action-bar-back.component';
import { ActionBarMobileComponent } from './action-bar-mobile/action-bar-mobile.component';

@NgModule({
    declarations: [
        ActionBarComponent,
        ActionBarTitleDirective,
        ActionBarDescriptionComponent,
        ActionBarHeaderComponent,
        ActionBarActionsComponent,
        ActionBarBackComponent,
        ActionBarMobileComponent
    ],
    imports: [CommonModule, ButtonModule, IconModule],
    exports: [
        ActionBarComponent,
        ActionBarTitleDirective,
        ActionBarDescriptionComponent,
        ActionBarHeaderComponent,
        ActionBarActionsComponent,
        ActionBarBackComponent,
        ActionBarMobileComponent
    ]
})
export class ActionBarModule {}
