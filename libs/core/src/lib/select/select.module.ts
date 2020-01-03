import { NgModule } from '@angular/core';
import { SelectComponent } from './select.component';
import { OptionComponent } from './option/option.component';
import { PopoverModule } from '../popover/popover.module';
import { MenuModule } from '../menu/menu.module';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';
import { BusyIndicatorModule } from '../busy-indicator/busy-indicator.module';

@NgModule({
    declarations: [
        SelectComponent,
        OptionComponent
    ],
    exports: [
        SelectComponent,
        OptionComponent
    ],
    imports: [
        BusyIndicatorModule,
        CommonModule,
        PopoverModule,
        MenuModule,
        ButtonModule,
        IconModule,
        LoadingSpinnerModule
    ]
})
export class SelectModule { }
