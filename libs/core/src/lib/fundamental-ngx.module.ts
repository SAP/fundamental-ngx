import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ActionSheetModule } from '@fundamental-ngx/core/action-sheet';
import { BreadcrumbModule } from '@fundamental-ngx/core/breadcrumb';
import { ComboboxModule } from '@fundamental-ngx/core/combobox';
import { DynamicPageModule } from '@fundamental-ngx/core/dynamic-page';
import { ActionBarModule } from '@fundamental-ngx/core/action-bar';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { CalendarModule } from '@fundamental-ngx/core/calendar';
import { CarouselModule } from '@fundamental-ngx/core/carousel';
import { CheckboxModule } from '@fundamental-ngx/core/checkbox';
import { DatetimePickerModule } from '@fundamental-ngx/core/datetime-picker';
import { DialogModule } from '@fundamental-ngx/core/dialog';
import { DragAndDropModule, OnlyDigitsModule } from '@fundamental-ngx/core/utils';
import { FacetModule } from '@fundamental-ngx/core/facets';
import { FeedListItemModule } from '@fundamental-ngx/core/feed-list-item';
import { FeedInputModule } from '@fundamental-ngx/core/feed-input';
import { FileUploaderModule } from '@fundamental-ngx/core/file-uploader';
import { FixedCardLayoutModule } from '@fundamental-ngx/core/fixed-card-layout';
import { FlexibleColumnLayoutModule } from '@fundamental-ngx/core/flexible-column-layout';
import { FormModule } from '@fundamental-ngx/core/form';
import { FormattedTextModule } from '@fundamental-ngx/core/formatted-text';
import { IconModule } from '@fundamental-ngx/core/icon';
import { InlineHelpModule } from '@fundamental-ngx/core/inline-help';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { LinkModule } from '@fundamental-ngx/core/link';
import { ListModule } from '@fundamental-ngx/core/list';
import { TimeModule } from '@fundamental-ngx/core/time';
import { TileModule } from '@fundamental-ngx/core/tile';
import { TextModule } from '@fundamental-ngx/core/text';
import { PanelModule } from '@fundamental-ngx/core/panel';
import { ObjectStatusModule } from '@fundamental-ngx/core/object-status';
import { NotificationModule } from '@fundamental-ngx/core/notification';
import { AlertModule } from '@fundamental-ngx/core/alert';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { AvatarGroupModule } from '@fundamental-ngx/core/avatar-group';
import { BarModule } from '@fundamental-ngx/core/bar';
import { BusyIndicatorModule } from '@fundamental-ngx/core/busy-indicator';
import { CardModule } from '@fundamental-ngx/core/card';
import { ObjectIdentifierModule } from '@fundamental-ngx/core/object-identifier';
import { MessageStripModule } from '@fundamental-ngx/core/message-strip';
import { ObjectMarkerModule } from '@fundamental-ngx/core/object-marker';
import { ObjectNumberModule } from '@fundamental-ngx/core/object-number';
import { RadioModule } from '@fundamental-ngx/core/radio';
import { TokenModule } from '@fundamental-ngx/core/token';
import { ToolbarModule } from '@fundamental-ngx/core/toolbar';
import { TitleModule } from '@fundamental-ngx/core/title';
import { QuickViewModule } from '@fundamental-ngx/core/quick-view';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { ProductSwitchModule } from '@fundamental-ngx/core/product-switch';
import { DynamicSideContentModule } from '@fundamental-ngx/core/dynamic-side-content';
import { InfoLabelModule } from '@fundamental-ngx/core/info-label';
import { InfiniteScrollModule } from '@fundamental-ngx/core/infinite-scroll';
import { DatePickerModule } from '@fundamental-ngx/core/date-picker';
import { ScrollSpyModule } from '@fundamental-ngx/core/scroll-spy';
import { TimePickerModule } from '@fundamental-ngx/core/time-picker';
import { SliderModule } from '@fundamental-ngx/core/slider';
import { TableModule } from '@fundamental-ngx/core/table';
import { SwitchModule } from '@fundamental-ngx/core/switch';
import { StatusIndicatorModule } from '@fundamental-ngx/core/status-indicator';
import { MessageToastModule } from '@fundamental-ngx/core/message-toast';
import { MultiInputModule } from '@fundamental-ngx/core/multi-input';
import { MessageBoxModule } from '@fundamental-ngx/core/message-box';
import { LayoutGridModule } from '@fundamental-ngx/core/layout-grid';
import { LayoutPanelModule } from '@fundamental-ngx/core/layout-panel';
import { NestedListModule } from '@fundamental-ngx/core/nested-list';
import { RatingIndicatorModule } from '@fundamental-ngx/core/rating-indicator';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';
import { StepInputModule } from '@fundamental-ngx/core/step-input';
import { GridListModule } from '@fundamental-ngx/core/grid-list';
import { IllustratedMessageModule } from '@fundamental-ngx/core/illustrated-message';
import { MenuModule } from '@fundamental-ngx/core/menu';
import { TabsModule } from '@fundamental-ngx/core/tabs';
import { ResizableCardLayoutModule } from '@fundamental-ngx/core/resizable-card-layout';
import { UploadCollectionModule } from '@fundamental-ngx/core/upload-collection';
import { SplitterModule } from '@fundamental-ngx/core/splitter';
import { PaginationModule } from '@fundamental-ngx/core/pagination';
import { SelectModule } from '@fundamental-ngx/core/select';
import { ShellbarModule } from '@fundamental-ngx/core/shellbar';
import { TreeModule } from '@fundamental-ngx/core/tree';
import { WizardModule } from '@fundamental-ngx/core/wizard';
import { SplitButtonModule } from '@fundamental-ngx/core/split-button';
import { SideNavigationModule } from '@fundamental-ngx/core/side-navigation';
import { MessagePageModule } from '@fundamental-ngx/core/message-page';
import { VerticalNavigationModule } from '@fundamental-ngx/core/vertical-navigation';
import { MicroProcessFlowModule } from '@fundamental-ngx/core/micro-process-flow';
import { TimelineModule } from '@fundamental-ngx/core/timeline';
import { ProgressIndicatorModule } from '@fundamental-ngx/core/progress-indicator';
import { ScrollbarModule } from '@fundamental-ngx/core/scrollbar';
import { ThemingModule } from '@fundamental-ngx/core/theming';
import { SkeletonModule } from '@fundamental-ngx/core/skeleton';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';

@NgModule({
    imports: [CommonModule, FormsModule],
    exports: [
        ActionBarModule,
        ActionSheetModule,
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
        CheckboxModule,
        DatePickerModule,
        DatetimePickerModule,
        DragAndDropModule,
        DynamicPageModule,
        DynamicSideContentModule,
        FacetModule,
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
        SplitterModule,
        OnlyDigitsModule,
        IllustratedMessageModule,
        StatusIndicatorModule,
        GridListModule,
        ResizableCardLayoutModule,
        MessagePageModule,
        VerticalNavigationModule,
        UploadCollectionModule,
        MicroProcessFlowModule,
        TimelineModule,
        ProgressIndicatorModule,
        ScrollbarModule,
        ThemingModule,
        ContentDensityModule,
        SkeletonModule
    ]
})
export class FundamentalNgxCoreModule {}
