import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';

import { RouterModule } from '@angular/router';
import { SchemaModule } from '../schema/schema.module';

// modules
import { FundamentalNgxModule } from '../../../library/src/lib/fundamental-ngx.module';

// components
import { DocumentationComponent } from './core-helpers/documentation/documentation.component';
import { PlayGroundComponent } from './core-helpers/playground/playground.component';
import { CodeExampleComponent } from './core-helpers/code-example/code-example.component';
import { HeaderComponent } from './core-helpers/header/header.component';
import { DescriptionComponent } from './core-helpers/description/description';
import { SeparatorComponent } from './core-helpers/seperator/seperator.component';
import { ImportComponent } from './core-helpers/import/import.component';
import { DirectionalityComponent } from './core-helpers/directionality/directionality.component';
import { ComponentExampleComponent } from './core-helpers/component-example/component-example.component';
import { ExampleBackgroundComponent } from './core-helpers/example-background/example-background.component';

// services
import { CopyService } from './services/copy.service';

// containers
import { BadgeLabelDocsComponent } from './component-docs/badge-label/badge-label-docs.component';
import { BreadcrumbDocsComponent } from './component-docs/breadcrumb/breadcrumb-docs.component';
import { ButtonDocsComponent } from './component-docs/button/button-docs.component';
import { ButtonGroupDocsComponent } from './component-docs/button-group/button-group-docs.component';
import { AlertDocsComponent } from './component-docs/alert/alert-docs.component';
import { IconDocsComponent } from './component-docs/icon/icon-docs.component';
import { IdentifierDocsComponent } from './component-docs/identifier/identifier-docs.component';
import { InlineHelpDocsComponent } from './component-docs/inline-help/inline-help-docs.component';
import { InputGroupDocsComponent } from './component-docs/input-group/input-group-docs.component';
import { ComboboxDocsComponent } from './component-docs/combobox/combobox-docs.component';
import { ImageDocsComponent } from './component-docs/image/image-docs.component';
import { DropdownDocsComponent } from './component-docs/dropdown/dropdown-docs.component';
import { PaginationDocsComponent } from './component-docs/pagination/pagination-docs.component';
import { ListDocsComponent } from './component-docs/list/list-docs.component';
import { LoadingSpinnerDocsComponent } from './component-docs/loading-spinner-docs/loading-spinner-docs.component';
import { TabsDocsComponent } from './component-docs/tabs/tabs-docs.component';
import { TreeDocsComponent } from './component-docs/tree/tree-docs.component';
import { ModalDocsComponent } from './component-docs/modal/modal-docs.component';
import { TableDocsComponent } from './component-docs/table/table-docs.component';
import { ActionBarDocsComponent } from './component-docs/action-bar/action-bar-docs.component';
import { PanelDocsComponent } from './component-docs/panel/panel-docs.component';
import { MenuDocsComponent } from './component-docs/menu/menu-docs.component';
import { TileDocsComponent } from './component-docs/tile/tile-docs.component';
import { FormDocsComponent } from './component-docs/form/form-docs.component';
import { SideNavigationDocsComponent } from './component-docs/side-navigation/side-navigation-docs.component';
import { PopoverDocsComponent } from './component-docs/popover/popover-docs.component';
import { CalendarDocsComponent } from './component-docs/calendar/calendar-docs.component';
import { DatePickerDocsComponent } from './component-docs/date-picker/date-picker-docs.component';
import { TimeDocsComponent } from './component-docs/time/time-docs.component';
import { TimePickerDocsComponent } from './component-docs/time-picker/time-picker-docs.component';
import { ShellbarDocsComponent } from './component-docs/shellbar/shellbar-docs.component';
import { SearchInputDocsComponent } from './component-docs/search-input/search-input-docs.component';

// examples
import {
    ActionBarBackExampleComponent,
    ActionBarContextualMenuExampleComponent,
    ActionBarNoBackExampleComponent,
    ActionBarMobileExampleComponent
} from './component-docs/action-bar/examples/action-bar-examples.component';
import { AlertExampleComponent } from './component-docs/alert/examples/alert-example.component';
import { AlertInlineExampleComponent } from './component-docs/alert/examples/alert-inline-example.component';
import { AlertComponentAsContentExampleComponent } from './component-docs/alert/examples/alert-component-as-content-example.component';
import { AlertContentComponent } from './component-docs/alert/examples/alert-content.component';
import {
    BadgeDefaultExampleComponent,
    BadgeFilledExampleComponent,
    BadgePillExampleComponent,
    LabelBuildStatusExampleComponent,
    LabelDefaultExampleComponent,
    LabelIconStatusExampleComponent,
    LabelStatusColorsExampleComponent
} from './component-docs/badge-label/examples/badge-label-examples.component';
import {
    BreadcrumbHrefExampleComponent,
    BreadcrumbRouterLinkExampleComponent
} from './component-docs/breadcrumb/examples/breadcrumb-examples.component';
import {
    ButtonIconsExampleComponent,
    ButtonOptionsExampleComponent,
    ButtonSizesExampleComponent,
    ButtonStateExampleComponent,
    ButtonTypesExampleComponent
} from './component-docs/button/examples/button-examples.component';
import {
    ButtonGroupXsExampleComponent,
    ButtonGroupSmallExampleComponent,
    ButtonGroupCompactExampleComponent,
    ButtonGroupDefaultExampleComponent
} from './component-docs/button-group/examples/button-group-examples.component';
import { CalendarRangeExampleComponent } from './component-docs/calendar/examples/calendar-range-example.component';
import { CalendarSingleExampleComponent } from './component-docs/calendar/examples/calendar-single-example.component';
import { CalendarMondayStartExampleComponent } from './component-docs/calendar/examples/calendar-monday-start-example.component';
import { ComboboxExampleComponent } from './component-docs/combobox/examples/combobox-example.component';
import { DatePickerRangeExampleComponent } from './component-docs/date-picker/examples/date-picker-range-example.component';
import { DatePickerSingleExampleComponent } from './component-docs/date-picker/examples/date-picker-single-example.component';
import {
    DropdownContextualMenuExampleComponent,
    DropdownDefaultExampleComponent,
    DropdownIconsExampleComponent,
    DropdownStateExampleComponent,
    DropdownToolbarExampleComponent
} from './component-docs/dropdown/examples/dropdown-examples.component';
import {
    FormCheckboxExampleComponent,
    FormExampleComponent,
    FormInlineHelpExampleComponent,
    FormRadioExampleComponent,
    FormSelectExampleComponent,
    FormStateExampleComponent
} from './component-docs/form/examples/form-examples.component';
import { FormGroupInputExampleComponent } from './component-docs/form/examples/form-group-input-example.component';
import { IconExampleComponent } from './component-docs/icon/examples/icon-example.component';
import {
    CircleIdentifierExampleComponent,
    ColorsIdentifierExampleComponent,
    IconIdentifierExampleComponent,
    InitialsIdentifierExampleComponent,
    TransparentIdentifierExampleComponent
} from './component-docs/identifier/examples/identifier-examples.component';
import {
    ImageShapesExampleComponent,
    ImageSizesExampleComponent
} from './component-docs/image/examples/image-examples.component';
import {
    InlineHelpExampleComponent,
    InlineHelpTriggerExampleComponent
} from './component-docs/inline-help/examples/inline-help-examples.component';
import {
    InputGroupButtonExampleComponent,
    InputGroupIconExampleComponent,
    InputGroupNumberExampleComponent,
    InputGroupSearchExampleComponent,
    InputGroupTextExampleComponent,
    InputGroupTextCompactExampleComponent
} from './component-docs/input-group/examples/input-group-examples.component';
import {
    ListActionsExampleComponent,
    ListCheckboxExampleComponent,
    ListExampleComponent
} from './component-docs/list/examples/list-examples.component';
import { LoadingSpinnerExampleComponent } from './component-docs/loading-spinner-docs/examples/loading-spinner-example.component';
import { LoadingSpinnerContainerExampleComponent } from './component-docs/loading-spinner-docs/examples/loading-spinner-container-example.component';
import {
    MenuExampleComponent,
    MenuGroupExampleComponent
} from './component-docs/menu/examples/menu-examples.component';
import { ModalOpenTemplateExampleComponent } from './component-docs/modal/examples/template-as-content/modal-open-template-example.component';
import { ModalContentComponent } from './component-docs/modal/examples/component-as-content/modal-content.component';
import { ModalComponentAsContentExampleComponent } from './component-docs/modal/examples/component-as-content/modal-component-as-content-example.component';
import {
    PanelColumnsExampleComponent,
    PanelEdgeBleedExampleComponent,
    PanelExampleComponent,
    PanelGridExampleComponent,
    PanelGridNoGapExampleComponent,
    PanelGridColumnSpanExampleComponent
} from './component-docs/panel/examples/panel-examples.component';
import { PaginationExampleComponent } from './component-docs/pagination/examples/pagination-example.component';
import { PopoverExampleComponent } from './component-docs/popover/examples/popover-simple/popover-example.component';
import { PopoverModalExampleComponent } from './component-docs/popover/examples/popover-modal/popover-modal-example.component';
import { PopoverProgrammaticOpenExampleComponent } from './component-docs/popover/examples/popover-programmatic/popover-programmatic-open-example.component';
import { SearchInputExampleComponent } from './component-docs/search-input/examples/search-input-example.component';
import { ShellbarBasicExampleComponent } from './component-docs/shellbar/examples/shellbar-basic-example.component';
import { ShellbarCollapsibleExampleComponent } from './component-docs/shellbar/examples/shellbar-collapsible-example.component';
import {
    SideNavigationCollapsedExampleComponent,
    SideNavigationExampleComponent,
    SideNavigationIconsExampleComponent,
    SideNavigationLevelsExampleComponent,
    SideNavigationTitlesExampleComponent
} from './component-docs/side-navigation/examples/side-navigation-examples.component';
import { TableExampleComponent } from './component-docs/table/examples/table-example.component';
import {
    TabsExampleComponent,
    TabSelectionExampleComponent, TabsNavigationModeExampleComponent
} from './component-docs/tabs/examples/tabs-examples-component';
import {
    TileActionsExampleComponent,
    TileDisabledExampleComponent,
    TileExampleComponent,
    TileGridExampleComponent,
    TileGridHelpersExampleComponent,
    TileMediaExampleComponent,
    TileProductExampleComponent,
    TileButtonExampleComponent
} from './component-docs/tile/examples/tile-examples.component';
import {
    TimeExampleComponent,
    Time12ExampleComponent,
    TimeDisabledExampleComponent,
    TimeNoSecondsExampleComponent,
    TimeNoSpinnersExampleComponent
} from './component-docs/time/examples/time-examples.component';
import {
    TimePickerExampleComponent,
    TimePicker12ExampleComponent,
    TimePickerDisabledExampleComponent,
    TimePickerNoSecondsExampleComponent,
    TimePickerCompactExampleComponent,
    TimePickerAllowNullExampleComponent
} from './component-docs/time-picker/examples/time-picker-examples.component';
import { TimePickerFormExampleComponent } from './component-docs/time-picker/examples/time-picker-form-example.component';
import { ToggleDocsComponent } from './component-docs/toggle/toggle-docs.component';
import { ToggleSizesExampleComponent } from './component-docs/toggle/examples/toggle-sizes-example/toggle-sizes-example.component';
import { DisabledToggleExampleComponent } from './component-docs/toggle/examples/disabled-toggle-example/disabled-toggle-example.component';
import { ToggleBindingExampleComponent } from './component-docs/toggle/examples/toggle-binding-example/toggle-binding-example.component';
import { ToggleFormsExampleComponent } from './component-docs/toggle/examples/toggle-form-example/toggle-forms-example.component';
import { ListInfiniteScrollExampleComponent } from './component-docs/list/examples/list-infinite-scroll-example.component';
import { ListCheckboxFormExampleComponent } from './component-docs/list/examples/list-checkbox-form-example.component';
import { DropdownInfiniteScrollExampleComponent } from './component-docs/dropdown/examples/dropdown-infinite-scroll-example.component';
import { ModalInModalComponent } from './component-docs/modal/examples/stackable-modals/modal-in-modal.component';
import { ModalInModalSecondComponent } from './component-docs/modal/examples/stackable-modals/modal-in-modal-second.component';
import { ModalInModalExampleComponent } from './component-docs/modal/examples/stackable-modals/modal-in-modal-example.component';
import { ModalFullscreenExampleComponent } from './component-docs/modal/examples/fullscreen-modal/modal-fullscreen-example.component';
import { InfiniteScrollDocsComponent } from './component-docs/infinite-scroll/infinite-scroll-docs.component';
import { InfiniteScrollBasicExampleComponent } from './component-docs/infinite-scroll/examples/infinite-scroll-basic-example/infinite-scroll-basic-example.component';
import { TableCheckboxesExampleComponent } from './component-docs/table/examples/table-checkboxes-example.component';
import { SearchInputAsyncExampleComponent } from './component-docs/search-input/examples/search-input-async-example.component';
import { SearchInputDynamicExampleComponent } from './component-docs/search-input/examples/search-input-dynamic-example.component';
import { SearchInputDisplaywithExampleComponent } from './component-docs/search-input/examples/search-input-displaywith-example.component';
import { ListSingleSelectExampleComponent } from './component-docs/list/examples/list-single-select-example.component';
import { FileInputDocsComponent } from './component-docs/file-input/file-input-docs.component';
import { FileInputExampleComponent } from './component-docs/file-input/examples/file-input-example/file-input-example.component';
import { FileInputCustomExampleComponent } from './component-docs/file-input/examples/file-input-custom-example/file-input-custom-example.component';
import { FileInputDragDisabledExampleComponent } from './component-docs/file-input/examples/file-input-drag-disabled-example/file-input-drag-disabled-example.component';
import { FileInputMaxExampleComponent } from './component-docs/file-input/examples/file-input-max-example/file-input-max-example.component';
import { TokenDocsComponent } from './component-docs/token/token-docs.component';
import { TokenExampleComponent } from './component-docs/token/examples/token-example/token-example.component';
import { DatetimePickerDocsComponent } from './component-docs/datetime-picker/datetime-picker-docs.component';
import { DatetimeExampleComponent } from './component-docs/datetime-picker/examples/datetime-example/datetime-example.component';
import { DatetimeNonMeridianExampleComponent } from './component-docs/datetime-picker/examples/datetime-non-meridian-example/datetime-non-meridian-example.component';
import { DatetimeProgramExampleComponent } from './component-docs/datetime-picker/examples/datetime-program-example/datetime-program-example.component';
import { ScrollSpyDocsComponent } from './component-docs/scroll-spy/scroll-spy-docs.component';
import { ScrollSpyExampleComponent } from './component-docs/scroll-spy/examples/scroll-spy-example/scroll-spy-example.component';
import { ScrollSpyCustomExampleComponent } from './component-docs/scroll-spy/examples/scroll-spy-custom-example/scroll-spy-custom-example.component';
import { MultiInputFilterExampleComponent } from './component-docs/multi-input/examples/multi-input-filter-example/multi-input-filter-example.component';
import { MultiInputDisplaywithExampleComponent } from './component-docs/multi-input/examples/multi-input-displaywith-example/multi-input-displaywith-example.component';
import { MultiInputFormExampleComponent } from './component-docs/multi-input/examples/multi-input-form-example/multi-input-form-example.component';
import { MultiInputDocsComponent } from './component-docs/multi-input/multi-input-docs.component';
import { MultiInputExampleComponent } from './component-docs/multi-input/examples/multi-input-example/multi-input-example.component';
import { MultiInputAsyncExampleComponent } from './component-docs/multi-input/examples/multi-input-async-example/multi-input-async-example.component';
import { ToolbarComponent } from './core-helpers/toolbar/toolbar.component';
import { PopoverDirectiveDocsComponent } from './component-docs/popover-directive/popover-directive-docs.component';
import { PopoverDirectiveExampleComponent } from './component-docs/popover-directive/examples/popover-directive-example/popover-directive-example.component';
import { PopoverTriggersComponent } from './component-docs/popover-directive/examples/popover-triggers/popover-triggers.component';
import { PopoverProgrammaticComponent } from './component-docs/popover-directive/examples/popover-programmatic/popover-programmatic.component';
import { PopoverFillComponent } from './component-docs/popover-directive/examples/popover-fill/popover-fill.component';
import { PopoverCFillComponent } from './component-docs/popover/examples/popover-c-fill/popover-c-fill.component';

import { HomeDocsComponent } from './component-docs/home/home.component';
import { NewComponentComponent } from './component-docs/new-component/new-component.component';

import { COMPONENT_SCHEMAS } from './component-docs/schemas';

import { BackdropExamplesComponent } from './component-docs/modal/examples/backdrop-examples/backdrop-examples.component';
import { PopoverPlacementExampleComponent } from './component-docs/popover/examples/popover-placement/popover-placement-example.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiComponent } from './core-helpers/api/api.component';
import { ApiDocsService } from './services/api-docs.service';
import { AlertHeaderComponent } from './component-docs/alert/alert-header/alert-header.component';
import { HeaderTabsComponent } from './core-helpers/header-tabs/header-tabs.component';
import { ActionBarHeaderComponent } from './component-docs/action-bar/action-bar-header/action-bar-header.component';
import { BadgeLabelHeaderComponent } from './component-docs/badge-label/badge-label-header/badge-label-header.component';
import { BreadcrumbHeaderComponent } from './component-docs/breadcrumb/breadcrumb-header/breadcrumb-header.component';
import { ButtonHeaderComponent } from './component-docs/button/button-header/button-header.component';
import { ButtonGroupHeaderComponent } from './component-docs/button-group/button-group-header/button-group-header.component';
import { CalendarHeaderComponent } from './component-docs/calendar/calendar-header/calendar-header.component';
import { ComboboxHeaderComponent } from './component-docs/combobox/combobox-header/combobox-header.component';
import { DatePickerHeaderComponent } from './component-docs/date-picker/date-picker-header/date-picker-header.component';
import { DatetimePickerHeaderComponent } from './component-docs/datetime-picker/datetime-picker-header/datetime-picker-header.component';
import { DropdownHeaderComponent } from './component-docs/dropdown/dropdown-header/dropdown-header.component';
import { FileInputHeaderComponent } from './component-docs/file-input/file-input-header/file-input-header.component';
import { FormHeaderComponent } from './component-docs/form/form-header/form-header.component';
import { IconHeaderComponent } from './component-docs/icon/icon-header/icon-header.component';
import { IdentifierHeaderComponent } from './component-docs/identifier/identifier-header/identifier-header.component';
import { ImageHeaderComponent } from './component-docs/image/image-header/image-header.component';
import { InfiniteScrollHeaderComponent } from './component-docs/infinite-scroll/infinite-scroll-header/infinite-scroll-header.component';
import { InlineHelpHeaderComponent } from './component-docs/inline-help/inline-help-header/inline-help-header.component';
import { InputGroupHeaderComponent } from './component-docs/input-group/input-group-header/input-group-header.component';
import { InputGroupFormExampleComponent } from './component-docs/input-group/examples/input-group-form-example.component';
import { ListHeaderComponent } from './component-docs/list/list-header/list-header.component';
import { LoadingSpinnerHeaderComponent } from './component-docs/loading-spinner-docs/loading-spinner-header/loading-spinner-header.component';
import { MenuHeaderComponent } from './component-docs/menu/menu-header/menu-header.component';
import { ModalDocsHeaderComponent } from './component-docs/modal/modal-docs-header/modal-docs-header.component';
import { MultiInputHeaderComponent } from './component-docs/multi-input/multi-input-header/multi-input-header.component';
import { PaginationHeaderComponent } from './component-docs/pagination/pagination-header/pagination-header.component';
import { PanelDocsHeaderComponent } from './component-docs/panel/panel-docs-header/panel-docs-header.component';
import { PopoverHeaderComponent } from './component-docs/popover/popover-header/popover-header.component';
import { PopoverDirectiveHeaderComponent } from './component-docs/popover-directive/popover-directive-header/popover-directive-header.component';
import { ScrollSpyHeaderComponent } from './component-docs/scroll-spy/scroll-spy-header/scroll-spy-header.component';
import { SearchInputHeaderComponent } from './component-docs/search-input/search-input-header/search-input-header.component';
import { ShellbarDocsHeaderComponent } from './component-docs/shellbar/shellbar-docs-header/shellbar-docs-header.component';
import { SideNavigationHeaderComponent } from './component-docs/side-navigation/side-navigation-header/side-navigation-header.component';
import { TableDocsHeaderComponent } from './component-docs/table/table-docs-header/table-docs-header.component';
import { TabsHeaderComponent } from './component-docs/tabs/tabs-header/tabs-header.component';
import { TileDocsHeaderComponent } from './component-docs/tile/tile-docs-header/tile-docs-header.component';
import { TimeHeaderComponent } from './component-docs/time/time-header/time-header.component';
import { TimePickerHeaderComponent } from './component-docs/time-picker/time-picker-header/time-picker-header.component';
import { ToggleHeaderComponent } from './component-docs/toggle/toggle-header/toggle-header.component';
import { TokenHeaderComponent } from './component-docs/token/token-header/token-header.component';
import { TreeHeaderComponent } from './component-docs/tree/tree-header/tree-header.component';
import { ROUTES } from './documentation.routes';
import { ComplexTitleExampleComponent } from './component-docs/tabs/examples/complex-title-example/complex-title-example.component';
import { AddingTabExampleComponent } from './component-docs/tabs/examples/adding-tab-example/adding-tab-example.component';
import { CalendarI18nExampleComponent } from './component-docs/calendar/examples/calendar-i18n-example.component';
import { DatePickerI18nExampleComponent } from './component-docs/date-picker/examples/date-picker-i18n-example.component';
import { TimeI18nExampleComponent } from './component-docs/time/examples/time-i18n-example.component';
import { DatePickerFormatExampleComponent } from './component-docs/date-picker/examples/date-picker-format-example.component';
import { SearchPipe } from './core-helpers/pipes/search.pipe';
import { CdkTableModule } from '@angular/cdk/table';
import { TableCdkExampleComponent } from './component-docs/table/examples/table-cdk-example.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DatetimePickerAllowNullExampleComponent } from './component-docs/datetime-picker/examples/datetime-allow-null-example/datetime-allow-null-example.component';
import { DatePickerAllowNullExampleComponent } from './component-docs/date-picker/examples/date-picker-allow-null-example.component';
import { DatePickerFormExampleComponent } from './component-docs/date-picker/examples/date-picker-form-example.component';
import { TimeFormExampleComponent } from './component-docs/time/examples/time-form-example.component';
import { TableResponsiveExampleComponent } from './component-docs/table/examples/table-responsive-example.component';
import { DatePickerPositionExampleComponent } from './component-docs/date-picker/examples/date-picker-position-example.component';
import { TimePickerOtherDelimiterExampleComponent } from './component-docs/time-picker/examples/time-picker-other-delimiter-example.component';
import { DatetimeFormatExampleComponent } from './component-docs/datetime-picker/examples/datetime-format-example/datetime-format-example.component';
import { DatePickerDisabledExampleComponent } from './component-docs/date-picker/examples/date-picker-disabled-example.component';
import { DatetimeDisabledExampleComponent } from './component-docs/datetime-picker/examples/datetime-disabled-example/datetime-disabled-example.component';

import { HighlightModule } from 'ngx-highlightjs';
import { SplitButtonHeaderComponent } from './component-docs/split-button/split-button-header/split-button-header.component';
import {
    ButtonSplitOptionsExampleComponent,
    ButtonSplitProgrammaticalExampleComponent,
    ButtonSplitTemplateExampleComponent,
    ButtonSplitTypesExampleComponent,
    ButtonSplitTypesIconsComponent
} from './component-docs/split-button/examples/split-button-examples.component';
import {
    TabNavigationExampleChildFirst, TabNavigationExampleChildSecond,
    TabNavigationExampleChildThird
} from './component-docs/tabs/examples/tab-navigation-children/tab-navigation-children';
import { DatePickerFormRangeExampleComponent } from './component-docs/date-picker/examples/date-picker-form-range-example.component';
import { DatetimeFormExampleComponent } from './component-docs/datetime-picker/examples/datetime-form-example/datetime-form-example.component';
import { SplitButtonDocsComponent } from './component-docs/split-button/split-button-docs.component';
import { ModalPositionExampleComponent } from './component-docs/modal/examples/modal-position/modal-position-example.component';
import { ContainerComponent } from './component-docs/modal/examples/container/container.component';
import { ComboboxAsyncExampleComponent } from './component-docs/combobox/examples/combobox-async-example.component';
import { ComboboxDisplaywithExampleComponent } from './component-docs/combobox/examples/combobox-displaywith-example.component';
import { ComboboxDynamicExampleComponent } from './component-docs/combobox/examples/combobox-dynamic-example.component';

@NgModule({
    declarations: [
        DocumentationComponent,
        PlayGroundComponent,
        CodeExampleComponent,
        HeaderComponent,
        DescriptionComponent,
        SeparatorComponent,
        ImportComponent,
        ActionBarDocsComponent,
        AlertDocsComponent,
        BadgeLabelDocsComponent,
        BreadcrumbDocsComponent,
        ButtonDocsComponent,
        ButtonGroupDocsComponent,
        SplitButtonDocsComponent,
        DropdownDocsComponent,
        DatetimePickerDocsComponent,
        FileInputDocsComponent,
        FormDocsComponent,
        IconDocsComponent,
        IdentifierDocsComponent,
        InlineHelpDocsComponent,
        InputGroupDocsComponent,
        ImageDocsComponent,
        ListDocsComponent,
        MenuDocsComponent,
        ModalDocsComponent,
        TabsDocsComponent,
        TableDocsComponent,
        TileDocsComponent,
        TreeDocsComponent,
        PaginationDocsComponent,
        PanelDocsComponent,
        PopoverDocsComponent,
        CalendarDocsComponent,
        DatePickerDocsComponent,
        SearchInputDocsComponent,
        ShellbarDocsComponent,
        SideNavigationDocsComponent,
        TileDocsComponent,
        TimeDocsComponent,
        TimePickerDocsComponent,
        ToggleDocsComponent,
        HomeDocsComponent,
        NewComponentComponent,
        DirectionalityComponent,
        ComponentExampleComponent,
        ExampleBackgroundComponent,
        ActionBarBackExampleComponent,
        ActionBarContextualMenuExampleComponent,
        ActionBarMobileExampleComponent,
        ActionBarNoBackExampleComponent,
        AlertExampleComponent,
        AlertComponentAsContentExampleComponent,
        AlertContentComponent,
        AlertInlineExampleComponent,
        BadgeDefaultExampleComponent,
        BadgeFilledExampleComponent,
        BadgePillExampleComponent,
        LabelBuildStatusExampleComponent,
        LabelDefaultExampleComponent,
        LabelIconStatusExampleComponent,
        LabelStatusColorsExampleComponent,
        BreadcrumbHrefExampleComponent,
        BreadcrumbRouterLinkExampleComponent,
        ButtonIconsExampleComponent,
        ButtonOptionsExampleComponent,
        ButtonSizesExampleComponent,
        ButtonTypesExampleComponent,
        ButtonStateExampleComponent,
        ButtonSplitTypesExampleComponent,
        ButtonSplitTypesIconsComponent,
        ButtonSplitProgrammaticalExampleComponent,
        ButtonSplitOptionsExampleComponent,
        ButtonSplitTemplateExampleComponent,
        ButtonGroupXsExampleComponent,
        ButtonGroupSmallExampleComponent,
        ButtonGroupCompactExampleComponent,
        ButtonGroupDefaultExampleComponent,
        CalendarRangeExampleComponent,
        CalendarSingleExampleComponent,
        CalendarMondayStartExampleComponent,
        DatePickerRangeExampleComponent,
        DatePickerSingleExampleComponent,
        DatePickerAllowNullExampleComponent,
        DatePickerDisabledExampleComponent,
        DatePickerFormExampleComponent,
        DatePickerFormRangeExampleComponent,
        DatetimeExampleComponent,
        DatetimeNonMeridianExampleComponent,
        DatetimeProgramExampleComponent,
        DatetimeFormatExampleComponent,
        DatetimeFormExampleComponent,
        DatetimePickerAllowNullExampleComponent,
        DatetimeDisabledExampleComponent,
        DropdownContextualMenuExampleComponent,
        DropdownDefaultExampleComponent,
        DropdownIconsExampleComponent,
        DropdownStateExampleComponent,
        DropdownInfiniteScrollExampleComponent,
        DropdownToolbarExampleComponent,
        FileInputExampleComponent,
        FileInputCustomExampleComponent,
        FileInputDragDisabledExampleComponent,
        FileInputMaxExampleComponent,
        FormCheckboxExampleComponent,
        FormExampleComponent,
        FormInlineHelpExampleComponent,
        FormRadioExampleComponent,
        FormSelectExampleComponent,
        FormStateExampleComponent,
        FormGroupInputExampleComponent,
        IconExampleComponent,
        CircleIdentifierExampleComponent,
        ColorsIdentifierExampleComponent,
        IconIdentifierExampleComponent,
        InitialsIdentifierExampleComponent,
        TransparentIdentifierExampleComponent,
        ImageShapesExampleComponent,
        ImageSizesExampleComponent,
        InfiniteScrollDocsComponent,
        InfiniteScrollBasicExampleComponent,
        InlineHelpExampleComponent,
        InlineHelpTriggerExampleComponent,
        InputGroupButtonExampleComponent,
        InputGroupIconExampleComponent,
        InputGroupNumberExampleComponent,
        InputGroupSearchExampleComponent,
        InputGroupTextExampleComponent,
        InputGroupTextCompactExampleComponent,
        InputGroupFormExampleComponent,
        ListActionsExampleComponent,
        ListCheckboxExampleComponent,
        ListExampleComponent,
        ListInfiniteScrollExampleComponent,
        ListCheckboxFormExampleComponent,
        ListSingleSelectExampleComponent,
        MenuExampleComponent,
        MenuGroupExampleComponent,
        ModalOpenTemplateExampleComponent,
        ModalContentComponent,
        ModalComponentAsContentExampleComponent,
        ModalInModalComponent,
        ModalInModalSecondComponent,
        ModalInModalExampleComponent,
        MultiInputDocsComponent,
        MultiInputExampleComponent,
        ModalFullscreenExampleComponent,
        PanelColumnsExampleComponent,
        PanelEdgeBleedExampleComponent,
        PanelExampleComponent,
        PanelGridExampleComponent,
        PanelGridNoGapExampleComponent,
        PanelGridColumnSpanExampleComponent,
        PaginationExampleComponent,
        PopoverExampleComponent,
        PopoverPlacementExampleComponent,
        PopoverProgrammaticOpenExampleComponent,
        PopoverModalExampleComponent,
        PopoverDirectiveDocsComponent,
        PopoverDirectiveExampleComponent,
        PopoverTriggersComponent,
        PopoverProgrammaticComponent,
        PopoverFillComponent,
        PopoverCFillComponent,
        ScrollSpyDocsComponent,
        ScrollSpyExampleComponent,
        ScrollSpyCustomExampleComponent,
        SearchInputExampleComponent,
        SearchInputAsyncExampleComponent,
        SearchInputDynamicExampleComponent,
        SearchInputDisplaywithExampleComponent,
        ShellbarBasicExampleComponent,
        ShellbarCollapsibleExampleComponent,
        SideNavigationCollapsedExampleComponent,
        SideNavigationExampleComponent,
        SideNavigationIconsExampleComponent,
        SideNavigationLevelsExampleComponent,
        SideNavigationTitlesExampleComponent,
        TableExampleComponent,
        TableCdkExampleComponent,
        TableCheckboxesExampleComponent,
        TableResponsiveExampleComponent,
        TabsExampleComponent,
        TabSelectionExampleComponent,
        TabsNavigationModeExampleComponent,
        TabNavigationExampleChildFirst,
        TabNavigationExampleChildSecond,
        TabNavigationExampleChildThird,
        TileActionsExampleComponent,
        TileDisabledExampleComponent,
        TileExampleComponent,
        TileGridExampleComponent,
        TileGridHelpersExampleComponent,
        TileMediaExampleComponent,
        TileProductExampleComponent,
        TileButtonExampleComponent,
        TimeExampleComponent,
        Time12ExampleComponent,
        TimeDisabledExampleComponent,
        TimeNoSecondsExampleComponent,
        TimeNoSpinnersExampleComponent,
        TimeI18nExampleComponent,
        TimeFormExampleComponent,
        TimePickerExampleComponent,
        TimePicker12ExampleComponent,
        TimePickerDisabledExampleComponent,
        TimePickerNoSecondsExampleComponent,
        TimePickerCompactExampleComponent,
        TimePickerOtherDelimiterExampleComponent,
        TimePickerAllowNullExampleComponent,
        TimePickerFormExampleComponent,
        ComboboxDocsComponent,
        ComboboxAsyncExampleComponent,
        ComboboxDisplaywithExampleComponent,
        ComboboxDynamicExampleComponent,
        ComboboxExampleComponent,
        LoadingSpinnerDocsComponent,
        LoadingSpinnerExampleComponent,
        LoadingSpinnerContainerExampleComponent,
        ToggleSizesExampleComponent,
        DisabledToggleExampleComponent,
        ToggleBindingExampleComponent,
        ToggleFormsExampleComponent,
        TokenDocsComponent,
        TokenExampleComponent,
        ToolbarComponent,
        MultiInputAsyncExampleComponent,
        MultiInputFilterExampleComponent,
        MultiInputDisplaywithExampleComponent,
        MultiInputFormExampleComponent,
        BackdropExamplesComponent,
        ApiComponent,
        AlertHeaderComponent,
        HeaderTabsComponent,
        ActionBarHeaderComponent,
        BadgeLabelHeaderComponent,
        BreadcrumbHeaderComponent,
        ButtonHeaderComponent,
        ButtonGroupHeaderComponent,
        SplitButtonHeaderComponent,
        CalendarHeaderComponent,
        ComboboxHeaderComponent,
        DatePickerHeaderComponent,
        DatetimePickerHeaderComponent,
        DropdownHeaderComponent,
        FileInputHeaderComponent,
        FormHeaderComponent,
        IconHeaderComponent,
        IdentifierHeaderComponent,
        ImageHeaderComponent,
        InfiniteScrollHeaderComponent,
        InlineHelpHeaderComponent,
        InputGroupHeaderComponent,
        ListHeaderComponent,
        LoadingSpinnerHeaderComponent,
        MenuHeaderComponent,
        ModalDocsHeaderComponent,
        MultiInputHeaderComponent,
        PaginationHeaderComponent,
        PanelDocsHeaderComponent,
        PopoverHeaderComponent,
        PopoverDirectiveHeaderComponent,
        ScrollSpyHeaderComponent,
        SearchInputHeaderComponent,
        ShellbarDocsHeaderComponent,
        SideNavigationHeaderComponent,
        TableDocsHeaderComponent,
        TabsHeaderComponent,
        TileDocsHeaderComponent,
        TimeHeaderComponent,
        TimePickerHeaderComponent,
        ToggleHeaderComponent,
        TokenHeaderComponent,
        TreeHeaderComponent,
        ComplexTitleExampleComponent,
        AddingTabExampleComponent,
        CalendarI18nExampleComponent,
        DatePickerI18nExampleComponent,
        DatePickerPositionExampleComponent,
        DatePickerFormatExampleComponent,
        SearchPipe,
        ModalPositionExampleComponent,
        ContainerComponent
    ],
    entryComponents: [ModalContentComponent, ModalInModalComponent, ModalInModalSecondComponent, AlertContentComponent],
    imports: [
        MarkdownModule.forChild(),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(ROUTES),
        SchemaModule.forRoot(COMPONENT_SCHEMAS),
        FundamentalNgxModule,
        HttpClientModule,
        CdkTableModule,
        DragDropModule,
        HighlightModule
    ],
    providers: [
        CopyService,
        ApiDocsService
    ]
})
export class DocumentationModule { }
