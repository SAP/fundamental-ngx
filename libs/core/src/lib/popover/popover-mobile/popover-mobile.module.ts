import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from '../../button/button.module';
import { DialogModule } from '../../dialog/dialog.module';
import { DynamicComponentService } from '../../utils/dynamic-component/dynamic-component.service';
import { PopoverMobileComponent } from './popover-mobile.component';

@NgModule({
    declarations: [PopoverMobileComponent],
    imports: [
        CommonModule,
        DialogModule,
        ButtonModule,
    ],
    exports: [
        PopoverMobileComponent,
    ],
    providers: [DynamicComponentService],
    entryComponents: [PopoverMobileComponent],
})
export class PopoverMobileModule {}
