import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectMobileComponent } from './select-mobile/select-mobile.component';
import { DialogModule } from '../../dialog/dialog.module';

@NgModule({
    declarations: [SelectMobileComponent],
    imports: [
        CommonModule,
        DialogModule
    ],
    exports: [SelectMobileComponent],
    entryComponents: [SelectMobileComponent]
})
export class SelectMobileModule {
}
