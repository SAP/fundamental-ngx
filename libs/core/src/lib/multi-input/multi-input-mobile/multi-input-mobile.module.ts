import { NgModule } from '@angular/core';
import { BarModule } from '../../bar/bar.module';
import { MultiInputMobileComponent } from './multi-input-mobile.component';
import { ButtonModule } from '../../button/button.module';
import { DialogModule } from '../../dialog/dialog.module';

@NgModule({
    declarations: [MultiInputMobileComponent],
    imports: [BarModule, DialogModule, ButtonModule]
})
export class MultiInputMobileModule {}
