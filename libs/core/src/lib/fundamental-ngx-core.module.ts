import { NgModule } from '@angular/core';
import { ActionBarModule } from './action-bar/action-bar.module';
import { AlertModule } from './alert/alert.module';
import { AlertService } from './alert/alert-service/alert.service';
import { AvatarModule } from './avatar/avatar.module';
import { BadgeModule } from './badge/badge.module';
import { BarModule } from './bar/bar.module';
import { BreadcrumbModule } from './breadcrumb/breadcrumb.module';
import { BusyIndicatorModule } from './busy-indicator/busy-indicator.module';
import { ButtonModule } from './button/button.module';
import { CalendarModule } from './calendar/calendar.module';
import { ComboboxModule } from './combobox/combobox.module';
import { CheckboxModule } from './checkbox/checkbox.module';
import { DatePickerModule } from './date-picker/date-picker.module';
import { DatetimePickerModule } from './datetime-picker/datetime-picker.module';
import { FileInputModule } from './file-input/file-input.module';
import { FileUploaderModule } from './file-uploader/file-uploader.module';
import { FormModule } from './form/form.module';
import { IconModule } from './icon/icon.module';
import { IdentifierModule } from './identifier/identifier.module';
import { ImageModule } from './image/image.module';
import { InfiniteScrollModule } from './infinite-scroll/infinite-scroll.module';
import { InlineHelpModule } from './inline-help/inline-help.module';
import { InputGroupModule } from './input-group/input-group.module';
import { LayoutPanelModule } from './layout-panel/layout-panel.module';
import { ListModule } from './list/list.module';
import { MenuModule } from './menu/menu.module';
import { DialogModule } from './dialog/dialog.module';
import { DialogService } from './dialog/dialog-service/dialog.service';
import { MessageStripModule } from './message-strip/message-strip.module';
import { MultiInputModule } from './multi-input/multi-input.module';
import { PaginationModule } from './pagination/pagination.module';
import { PanelModule } from './panel/panel.module';
import { PopoverModule } from './popover/popover.module';
import { ScrollSpyModule } from './scroll-spy/scroll-spy.module';
import { ShellbarModule } from './shellbar/shellbar.module';
import { SideNavigationModule } from './side-navigation/side-navigation.module';
import { SelectModule } from './select/select.module';
import { SplitButtonModule } from './split-button/split-button.module';
import { TableModule } from './table/table.module';
import { TabsModule } from './tabs/tabs.module';
import { TileModule } from './tile/tile.module';
import { TreeModule } from './tree/tree.module';
import { TimeModule } from './time/time.module';
import { TimePickerModule } from './time-picker/time-picker.module';
import { SegmentedButtonModule } from './segmented-button/public_api';
import { SwitchModule } from './switch/switch.module';
import { TokenModule } from './token/token.module';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LocalizationEditorModule } from './localizator-editor/localization-editor.module';
import { MegaMenuModule } from './mega-menu/mega-menu.module';
import { LayoutGridModule } from './layout-grid/layout-grid.module';
import { DragAndDropModule } from './utils/drag-and-drop/drag-and-drop.module';
import { ProductSwitchModule } from './product-switch/product-switch.module';
import { NotificationModule } from './notification/notification.module';
import { NotificationService } from './notification/notification-service/notification.service';
import { NestedListModule } from './nested-list/nested-list.module';
import { RadioModule } from './radio/radio.module';
import { LinkModule } from './link/link.module';
import { InfoLabelModule } from './info-label/info-label.module';
import { ObjectStatusModule } from './object-status/object-status.module';
import { MultiInputMobileModule } from './multi-input/multi-input-mobile/multi-input-mobile.module';
import { StepInputModule } from './step-input/step-input.module';
import { ComboboxMobileModule } from './combobox/combobox-mobile/combobox-mobile.module';
import { CarouselModule } from './utils/directives/carousel/carousel.module';

@NgModule({
    imports: [CommonModule, FormsModule],
    exports: [
        ActionBarModule,
        AlertModule,
        AvatarModule,
        BadgeModule,
        BarModule,
        BreadcrumbModule,
        BusyIndicatorModule,
        ButtonModule,
        SegmentedButtonModule,
        CalendarModule,
        CarouselModule,
        ComboboxModule,
        ComboboxMobileModule,
        CheckboxModule,
        DatePickerModule,
        DatetimePickerModule,
        DragAndDropModule,
        FileInputModule,
        FileUploaderModule,
        FormModule,
        IconModule,
        IdentifierModule,
        ImageModule,
        InfoLabelModule,
        InlineHelpModule,
        IdentifierModule,
        InfiniteScrollModule,
        InputGroupModule,
        LayoutGridModule,
        LayoutPanelModule,
        LinkModule,
        ListModule,
        LocalizationEditorModule,
        MenuModule,
        MegaMenuModule,
        DialogModule,
        MessageStripModule,
        MultiInputModule,
        MultiInputMobileModule,
        NestedListModule,
        NotificationModule,
        ObjectStatusModule,
        PaginationModule,
        PanelModule,
        ProductSwitchModule,
        PopoverModule,
        RadioModule,
        ScrollSpyModule,
        SegmentedButtonModule,
        SelectModule,
        ShellbarModule,
        SideNavigationModule,
        SplitButtonModule,
        StepInputModule,
        TableModule,
        TabsModule,
        TileModule,
        TimeModule,
        TimePickerModule,
        SwitchModule,
        TokenModule,
        TreeModule
    ],
    providers: [AlertService, DialogService, NotificationService]
})
export class FundamentalNgxCoreModule { }
