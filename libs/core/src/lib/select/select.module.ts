import { NgModule } from '@angular/core';
import { SelectComponent } from './select.component';
import { OptionComponent } from './option/option.component';
import { PopoverModule } from '../popover/popover.module';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';
import { BusyIndicatorModule } from '../busy-indicator/busy-indicator.module';
import { ListModule } from '../list/list.module';
import { SelectMobileListComponent } from './select-mobile-list/select-mobile-list.component';

@NgModule({
    declarations: [SelectComponent, OptionComponent, SelectMobileListComponent],
    exports: [SelectComponent, OptionComponent, SelectMobileListComponent],
    imports: [
        BusyIndicatorModule,
        CommonModule,
        PopoverModule,
        ButtonModule,
        IconModule,
        ListModule
    ]
})
export class SelectModule {}
