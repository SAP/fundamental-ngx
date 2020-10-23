import { NgModule} from '@angular/core';
import { ActionSheetMobileComponent } from './action-sheet-mobile.component';
import { ButtonModule } from '../../button/button.module';
import { DialogModule } from '../../dialog/dialog.module';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [ActionSheetMobileComponent],
    imports: [DialogModule, ButtonModule, CommonModule],
    entryComponents: [ ActionSheetMobileComponent ],
    exports: [ActionSheetMobileComponent]
})
export class ActionSheetMobileModule {}
