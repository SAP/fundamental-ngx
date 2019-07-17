import { NgModule } from '@angular/core';
import { ActionBarModule } from './action-bar/action-bar.module';
import { AlertModule } from './alert/alert.module';
import { AlertService } from './alert/alert-service/alert.service';
import { BadgeLabelModule } from './badge-label/badge-label.module';
import { BreadcrumbModule } from './breadcrumb/breadcrumb.module';
import { ButtonModule } from './button/button.module';
import { ButtonGroupModule } from './button-group/button-group.module';
import { CalendarModule } from './calendar/calendar.module';
import { ComboboxModule } from './combobox/combobox.module';
import { DatePickerModule } from './date-picker/date-picker.module';
import { DatetimePickerModule } from './datetime-picker/datetime-picker.module';
import { FileInputModule } from './file-input/file-input.module';
import { FormModule } from './form/form.module';
import { IconModule } from './icon/icon.module';
import { IdentifierModule } from './identifier/identifier.module';
import { ImageModule } from './image/image.module';
import { InfiniteScrollModule } from './infinite-scroll/infinite-scroll.module';
import { InlineHelpModule } from './inline-help/inline-help.module';
import { InputGroupModule } from './input-group/input-group.module';
import { ListModule } from './list/list.module';
import { LoadingSpinnerModule } from './loading-spinner/loading-spinner.module';
import { MenuModule } from './menu/menu.module';
import { ModalModule } from './modal/modal.module';
import { ModalService } from './modal/modal-service/modal.service';
import { MultiInputModule } from './multi-input/multi-input.module';
import { PaginationModule } from './pagination/pagination.module';
import { PanelModule } from './panel/panel.module';
import { PopoverModule } from './popover/popover.module';
import { ScrollSpyModule } from './scroll-spy/scroll-spy.module';
import { SearchInputModule } from './search-input/search-input.module';
import { ShellbarModule } from './shellbar/shellbar.module';
import { SideNavigationModule } from './side-navigation/side-navigation.module';
import { SplitButtonModule } from './split-button/split-button.module';
import { TableModule } from './table/table.module';
import { TabsModule } from './tabs/tabs.module';
import { TileModule } from './tile/tile.module';
import { TreeModule } from './tree/tree.module';
import { TimeModule } from './time/time.module';
import { TimePickerModule } from './time-picker/time-picker.module';
import { ToggleModule } from './toggle/toggle.module';
import { TokenModule } from './token/token.module';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, FormsModule],
    exports: [
        ActionBarModule,
        AlertModule,
        BadgeLabelModule,
        BreadcrumbModule,
        ButtonModule,
        ButtonGroupModule,
        CalendarModule,
        ComboboxModule,
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
        MultiInputModule,
        PaginationModule,
        PanelModule,
        PopoverModule,
        ScrollSpyModule,
        SearchInputModule,
        ShellbarModule,
        SideNavigationModule,
        SplitButtonModule,
        TableModule,
        TabsModule,
        TileModule,
        TimeModule,
        TimePickerModule,
        ToggleModule,
        TokenModule,
        TreeModule
    ],
    providers: [AlertService, ModalService]
})
export class FundamentalNgxModule {}
