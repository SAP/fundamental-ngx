import { NgModule } from '@angular/core';
import { ActionSheetMobileComponent } from './action-sheet-mobile.component';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { DialogModule } from '@fundamental-ngx/core/dialog';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';

@NgModule({
    declarations: [ActionSheetMobileComponent],
    imports: [DialogModule, ButtonModule, CommonModule, A11yModule],
    exports: [ActionSheetMobileComponent]
})
export class ActionSheetMobileModule {}
