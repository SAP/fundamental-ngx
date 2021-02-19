import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ActionBarModule } from './action-bar/action-bar.module';
import { ActionSheetModule } from './action-sheet/action-sheet.module';
import { AlertModule } from './alert/alert.module';
import { AlertService } from './alert/alert-service/alert.service';
import { AvatarModule } from './avatar/avatar.module';
import { AvatarGroupModule } from './avatar-group/avatar-group.module';
import { BarModule } from './bar/bar.module';
import { BreadcrumbModule } from './breadcrumb/breadcrumb.module';
import { BusyIndicatorModule } from './busy-indicator/busy-indicator.module';
import { ButtonModule } from './button/button.module';
import { CalendarModule } from './calendar/calendar.module';
import { ComboboxModule } from './combobox/combobox.module';
import { CheckboxModule } from './checkbox/checkbox.module';
import { DatePickerModule } from './date-picker/date-picker.module';
import { DatetimePickerModule } from './datetime-picker/datetime-picker.module';
import { FeedListItemModule } from './feed-list-item/public_api';
import { FileUploaderModule } from './file-uploader/file-uploader.module';
import { FixedCardLayoutModule } from './fixed-card-layout/fixed-card-layout.module';
import { FlexibleColumnLayoutModule } from './flexible-column-layout/flexible-column-layout.module';
import { FormattedTextModule } from './formatted-text/formatted-text.module';
import { FormModule } from './form/form.module';
import { IconModule } from './icon/icon.module';
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
import { RatingIndicatorModule } from './rating-indicator/rating-indicator.module';
import { ScrollSpyModule } from './scroll-spy/scroll-spy.module';
import { ShellbarModule } from './shellbar/shellbar.module';
import { SideNavigationModule } from './side-navigation/side-navigation.module';
import { SelectModule } from './select/select.module';
import { SplitButtonModule } from './split-button/split-button.module';
import { TableModule } from './table/table.module';
import { TabsModule } from './tabs/tabs.module';
import { TextModule } from './text/text.module';
import { TileModule } from './tile/tile.module';
import { TreeModule } from './tree/tree.module';
import { TimeModule } from './time/time.module';
import { TimePickerModule } from './time-picker/time-picker.module';
import { SegmentedButtonModule } from './segmented-button/public_api';
import { SwitchModule } from './switch/switch.module';
import { TokenModule } from './token/token.module';
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
import { ActionSheetMobileModule } from './action-sheet/action-sheet-mobile/action-sheet-mobile.module';
import { CarouselModule } from './utils/directives/carousel/carousel.module';
import { ToolbarModule } from './toolbar/toolbar.module';
import { CardModule } from './card/card.module';
import { ObjectIdentifierModule } from './object-identifier/object-identifier.module';
import { ObjectMarkerModule } from './object-marker/object-marker.module';
import { MessageToastModule } from './message-toast/message-toast.module';
import { MessageToastService } from './message-toast/message-toast-service/message-toast.service';
import { DynamicSideContentModule } from './dynamic-side-content/dynamic-side-content.module';
import { MessageBoxModule } from './message-box/message-box.module';
import { ThemesService } from './utils/services/themes.service';
import { WizardModule } from './wizard/wizard.module';
import { QuickViewModule } from './quick-view/quick-view.module';
import { FeedInputModule } from './feed-input/feed-input.module';
import { ObjectNumberModule } from './object-number/object-number.module';
import { TitleModule } from './title/title.module';
import { SliderModule } from './slider/public_api';
import { OnlyDigitsModule } from './utils/directives/only-digits/only-digits.module';
import { IllustratedMessageModule } from './illustrated-message/illustrated-message.module';
import { DynamicPageModule } from './dynamic-page/dynamic-page.module';
import { StatusIndicatorModule } from './status-indicator/status-indicator.module';

@NgModule({
    imports: [CommonModule, FormsModule],
    exports: [
        ActionBarModule,
        ActionSheetModule,
        ActionSheetMobileModule,
        AlertModule,
        AvatarModule,
        AvatarGroupModule,
        BarModule,
        BreadcrumbModule,
        BusyIndicatorModule,
        ButtonModule,
        CalendarModule,
        CardModule,
        CarouselModule,
        ComboboxModule,
        ComboboxMobileModule,
        CheckboxModule,
        DatePickerModule,
        DatetimePickerModule,
        DragAndDropModule,
        DynamicPageModule,
        DynamicSideContentModule,
        FeedListItemModule,
        FeedInputModule,
        FileUploaderModule,
        FixedCardLayoutModule,
        FlexibleColumnLayoutModule,
        FormModule,
        FormattedTextModule,
        IconModule,
        InfoLabelModule,
        InlineHelpModule,
        InfiniteScrollModule,
        InputGroupModule,
        LayoutGridModule,
        LayoutPanelModule,
        LinkModule,
        ListModule,
        MenuModule,
        DialogModule,
        MessageBoxModule,
        MessageStripModule,
        MessageToastModule,
        MultiInputModule,
        MultiInputMobileModule,
        NestedListModule,
        NotificationModule,
        ObjectIdentifierModule,
        ObjectMarkerModule,
        ObjectNumberModule,
        ObjectStatusModule,
        PaginationModule,
        PanelModule,
        ProductSwitchModule,
        PopoverModule,
        QuickViewModule,
        RatingIndicatorModule,
        RadioModule,
        ScrollSpyModule,
        SegmentedButtonModule,
        SelectModule,
        ShellbarModule,
        SideNavigationModule,
        SplitButtonModule,
        SwitchModule,
        StepInputModule,
        TableModule,
        TabsModule,
        TextModule,
        TileModule,
        TimeModule,
        TimePickerModule,
        TitleModule,
        ToolbarModule,
        TokenModule,
        TreeModule,
        WizardModule,
        CardModule,
        MessageBoxModule,
        MessageToastModule,
        DynamicSideContentModule,
        SliderModule,
        OnlyDigitsModule,
        IllustratedMessageModule,
        StatusIndicatorModule
    ],
    providers: [AlertService, DialogService, NotificationService, MessageToastService, ThemesService]
})
export class FundamentalNgxCoreModule {}
