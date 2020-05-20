import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuMobileComponent } from './menu-mobile/menu-mobile.component';
import { DialogModule } from '../../dialog/dialog.module';
import { ButtonModule } from '../../button/button.module';


@NgModule({
    declarations: [MenuMobileComponent],
    imports: [
        CommonModule,
        DialogModule,
        ButtonModule
    ],
    exports: [MenuMobileComponent],
    entryComponents: [MenuMobileComponent],
})
export class MenuMobileModule {
}
