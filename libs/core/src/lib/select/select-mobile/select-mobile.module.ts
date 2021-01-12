import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectMobileComponent } from './select-mobile.component';
import { ButtonModule } from '../../button/button.module';
import { DialogModule } from '../../dialog/dialog.module';
import { DynamicComponentService } from '../../utils/dynamic-component/dynamic-component.service';

@NgModule({
    declarations: [SelectMobileComponent],
    imports: [
        CommonModule,
        DialogModule,
        ButtonModule
    ],
    exports: [SelectMobileComponent],
    providers: [DynamicComponentService],
    entryComponents: [SelectMobileComponent]
})
export class SelectMobileModule {}
