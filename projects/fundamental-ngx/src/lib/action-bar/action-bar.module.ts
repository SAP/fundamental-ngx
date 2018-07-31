import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';

import { ActionBarComponent } from './action-bar.component';
import { ActionBarTitleComponent } from './action-bar-title.component';
import { ActionBarDescriptionComponent } from './action-bar-description.component';
import { ActionBarHeaderComponent } from './action-bar-header.component';
import { ActionBarActionsComponent } from './action-bar-actions.component';
import { ActionBarBackComponent } from './action-bar-back.component';
import { ActionBarMobileComponent } from './action-bar-mobile.component';

@NgModule({
    declarations: [
        ActionBarComponent,
        ActionBarTitleComponent,
        ActionBarDescriptionComponent,
        ActionBarHeaderComponent,
        ActionBarActionsComponent,
        ActionBarBackComponent,
        ActionBarMobileComponent
    ],
    imports: [CommonModule, ButtonModule, IconModule],
    exports: [
        ActionBarComponent,
        ActionBarTitleComponent,
        ActionBarDescriptionComponent,
        ActionBarHeaderComponent,
        ActionBarActionsComponent,
        ActionBarBackComponent,
        ActionBarMobileComponent
    ]
})
export class ActionBarModule {}
