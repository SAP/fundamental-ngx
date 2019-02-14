import { NgModule } from '@angular/core';
import { FundamentalNgxComponent } from './fundamental-ngx.component';
import { ActionBarModule } from './action-bar/action-bar.module';
import { AlertModule } from './alert/alert.module';
import { AlertService } from './alert/alert.service';
import { BadgeLabelModule } from './badge-label/badge-label.module';
import { BreadcrumbModule } from './breadcrumb/breadcrumb.module';
import { ButtonModule } from './button/button.module';
import { ButtonGroupModule } from './button-group/button-group.module';
import { CalendarModule } from './calendar/calendar.module';
import { ComboboxInputModule } from './combobox-input/combobox-input.module';
import { DatePickerModule } from './date-picker/date-picker.module';
import { FileInputModule } from './file-input/file-input.module';
import { FormModule } from './form/form.module';
import { IconModule } from './icon/icon.module';
import { IdentifierModule } from './identifier/identifier.module';
import { ImageModule } from './image/image.module';
import { InlineHelpModule } from './inline-help/inline-help.module';
import { InputGroupModule } from './input-group/input-group.module';
import { ListModule } from './list/list.module';
import { MenuModule } from './menu/menu.module';
import { ModalModule } from './modal/modal.module';
import { PaginationModule } from './pagination/pagination.module';
import { PanelModule } from './panel/panel.module';
import { PopoverModule } from './popover/popover.module';
import { SearchInputModule } from './search-input/search-input.module';
import { ShellbarModule } from './shellbar/shellbar.module';
import { SideNavigationModule } from './side-navigation/side-navigation.module';
import { TableModule } from './table/table.module';
import { TabsModule } from './tabs/tabs.module';
import { TileModule } from './tile/tile.module';
import { TreeModule } from './tree/tree.module';
import { TimeModule } from './time/time.module';
import { TimePickerModule } from './time-picker/time-picker.module';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ModalService } from './modal/modal.service';
import { LoadingSpinnerModule } from './loading-spinner/loading-spinner.module';
import { ToggleModule } from './toggle/toggle.module';
import { InfiniteScrollModule } from './utils/infinite-scroll.module';
import { DatetimePickerModule } from './datetime-picker/datetime-picker.module';

@NgModule({
    imports: [CommonModule, RouterModule, FormsModule],
    declarations: [FundamentalNgxComponent],
    exports: [
        FundamentalNgxComponent,
        ActionBarModule,
        AlertModule,
        BadgeLabelModule,
        BreadcrumbModule,
        ButtonModule,
        ButtonGroupModule,
        CalendarModule,
        ComboboxInputModule,
        DatePickerModule,
        DatetimePickerModule,
        FileInputModule,
        FormModule,
        IconModule,
        IdentifierModule,
        ImageModule,
        InlineHelpModule,
        IdentifierModule,
        InfiniteScrollModule,
        InputGroupModule,
        ListModule,
        LoadingSpinnerModule,
        MenuModule,
        ModalModule,
        PaginationModule,
        PanelModule,
        PopoverModule,
        SearchInputModule,
        ShellbarModule,
        SideNavigationModule,
        TableModule,
        TabsModule,
        TileModule,
        TimeModule,
        TimePickerModule,
        ToggleModule,
        TreeModule
    ],
    providers: [AlertService, ModalService]
})
export class FundamentalNgxModule {}
