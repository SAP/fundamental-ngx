import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectMobileComponent } from './select-mobile/select-mobile.component';
import { ButtonModule, DialogModule, DynamicComponentService } from '../../..';

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
export class SelectMobileModule {
}
