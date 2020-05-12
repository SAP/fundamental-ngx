import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionBarComponent } from './action-bar.component';
import { ButtonModule, ActionBarModule } from '@fundamental-ngx/core';

@NgModule({
    declarations: [ActionBarComponent],
    imports: [CommonModule, ButtonModule, ActionBarModule],
    exports: [ActionBarComponent]
})
export class PlatformActionBarModule { }
