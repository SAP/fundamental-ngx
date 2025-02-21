import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActionBarModule } from '@fundamental-ngx/core/action-bar';
import { ActionSheetModule } from '@fundamental-ngx/core/action-sheet';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { AvatarGroupLegacyModule } from '@fundamental-ngx/core/avatar-group-legacy';
import { BarModule } from '@fundamental-ngx/core/bar';
import { BreadcrumbModule } from '@fundamental-ngx/core/breadcrumb';
import { BusyIndicatorModule } from '@fundamental-ngx/core/busy-indicator';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { CalendarModule } from '@fundamental-ngx/core/calendar';
import { CardModule } from '@fundamental-ngx/core/card';
import { CarouselModule } from '@fundamental-ngx/core/carousel';
import { CheckboxModule } from '@fundamental-ngx/core/checkbox';
import { ComboboxModule } from '@fundamental-ngx/core/combobox';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { DatePickerModule } from '@fundamental-ngx/core/date-picker';
import { DatetimePickerModule } from '@fundamental-ngx/core/datetime-picker';
import { DialogModule } from '@fundamental-ngx/core/dialog';
import { DynamicPageModule } from '@fundamental-ngx/core/dynamic-page';
import { DynamicSideContentModule } from '@fundamental-ngx/core/dynamic-side-content';
import { FacetModule } from '@fundamental-ngx/core/facets';
import { FeedInputModule } from '@fundamental-ngx/core/feed-input';
import { FeedListItemModule } from '@fundamental-ngx/core/feed-list-item';
import { FileUploaderModule } from '@fundamental-ngx/core/file-uploader';
import { FixedCardLayoutModule } from '@fundamental-ngx/core/fixed-card-layout';
import { FlexibleColumnLayoutModule } from '@fundamental-ngx/core/flexible-column-layout';
import { FormModule } from '@fundamental-ngx/core/form';
import { FormattedTextModule } from '@fundamental-ngx/core/formatted-text';
import { GenericTagModule } from '@fundamental-ngx/core/generic-tag';
import { GridListModule } from '@fundamental-ngx/core/grid-list';
import { IconModule } from '@fundamental-ngx/core/icon';
import { IllustratedMessageModule } from '@fundamental-ngx/core/illustrated-message';
import { InfiniteScrollModule } from '@fundamental-ngx/core/infinite-scroll';
import { InfoLabelModule } from '@fundamental-ngx/core/info-label';
import { InlineHelpModule } from '@fundamental-ngx/core/inline-help';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { LayoutGridModule } from '@fundamental-ngx/core/layout-grid';
import { LayoutPanelModule } from '@fundamental-ngx/core/layout-panel';
import { LinkModule } from '@fundamental-ngx/core/link';
import { ListModule } from '@fundamental-ngx/core/list';
import { MenuModule } from '@fundamental-ngx/core/menu';
import { MessageBoxModule } from '@fundamental-ngx/core/message-box';
import { MessagePageModule } from '@fundamental-ngx/core/message-page';
import { MessageStripModule } from '@fundamental-ngx/core/message-strip';
import { MessageToastModule } from '@fundamental-ngx/core/message-toast';
import { MicroProcessFlowModule } from '@fundamental-ngx/core/micro-process-flow';
import { MultiComboboxModule } from '@fundamental-ngx/core/multi-combobox';
import { MultiInputModule } from '@fundamental-ngx/core/multi-input';
import { NestedListModule } from '@fundamental-ngx/core/nested-list';
import { NotificationModule } from '@fundamental-ngx/core/notification';
import { ObjectAttributeModule } from '@fundamental-ngx/core/object-attribute';
import { ObjectIdentifierModule } from '@fundamental-ngx/core/object-identifier';
import { ObjectMarkerModule } from '@fundamental-ngx/core/object-marker';
import { ObjectNumberModule } from '@fundamental-ngx/core/object-number';
import { ObjectStatusModule } from '@fundamental-ngx/core/object-status';
import { OverflowLayoutModule } from '@fundamental-ngx/core/overflow-layout';
import { PaginationModule } from '@fundamental-ngx/core/pagination';
import { PanelModule } from '@fundamental-ngx/core/panel';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { ProductSwitchModule } from '@fundamental-ngx/core/product-switch';
import { ProgressIndicatorModule } from '@fundamental-ngx/core/progress-indicator';
import { QuickViewModule } from '@fundamental-ngx/core/quick-view';
import { RadioModule } from '@fundamental-ngx/core/radio';
import { RatingIndicatorModule } from '@fundamental-ngx/core/rating-indicator';
import { ResizableCardLayoutModule } from '@fundamental-ngx/core/resizable-card-layout';
import { ScrollSpyModule } from '@fundamental-ngx/core/scroll-spy';
import { ScrollbarModule } from '@fundamental-ngx/core/scrollbar';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';
import { SelectModule } from '@fundamental-ngx/core/select';
import { ShellbarModule } from '@fundamental-ngx/core/shellbar';
import { SideNavigationModule } from '@fundamental-ngx/core/side-navigation';
import { SkeletonModule } from '@fundamental-ngx/core/skeleton';
import { SliderModule } from '@fundamental-ngx/core/slider';
import { SplitButtonModule } from '@fundamental-ngx/core/split-button';
import { StatusIndicatorModule } from '@fundamental-ngx/core/status-indicator';
import { StepInputModule } from '@fundamental-ngx/core/step-input';
import { SwitchModule } from '@fundamental-ngx/core/switch';
import { TableModule } from '@fundamental-ngx/core/table';
import { TabsModule } from '@fundamental-ngx/core/tabs';
import { TextModule } from '@fundamental-ngx/core/text';
import { ThemingModule } from '@fundamental-ngx/core/theming';
import { TileModule } from '@fundamental-ngx/core/tile';
import { TimeModule } from '@fundamental-ngx/core/time';
import { TimePickerModule } from '@fundamental-ngx/core/time-picker';
import { TimelineModule } from '@fundamental-ngx/core/timeline';
import { TitleModule } from '@fundamental-ngx/core/title';
import { TokenModule } from '@fundamental-ngx/core/token';
import { ToolbarModule } from '@fundamental-ngx/core/toolbar';
import { TreeModule } from '@fundamental-ngx/core/tree';
import { UploadCollectionModule } from '@fundamental-ngx/core/upload-collection';
import { VerticalNavigationModule } from '@fundamental-ngx/core/vertical-navigation';
import { WizardModule } from '@fundamental-ngx/core/wizard';

@NgModule({
    imports: [FormsModule],
    exports: [
        ActionBarModule,
        ActionSheetModule,
        AvatarModule,
        AvatarGroupLegacyModule,
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
        IllustratedMessageModule,
        StatusIndicatorModule,
        GridListModule,
        GenericTagModule,
        ResizableCardLayoutModule,
        MessagePageModule,
        VerticalNavigationModule,
        UploadCollectionModule,
        MicroProcessFlowModule,
        TimelineModule,
        ProgressIndicatorModule,
        ScrollbarModule,
        ThemingModule,
        OverflowLayoutModule,
        ContentDensityModule,
        SkeletonModule,
        MultiComboboxModule,
        ObjectAttributeModule
    ]
})
export class FundamentalNgxCoreModule {}
