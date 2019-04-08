import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';

import { RouterModule } from '@angular/router';
import { SchemaModule } from '../schema/schema.module';

// modules
import { FundamentalNgxModule } from '../../../library/src/lib/fundamental-ngx.module';

// components
import { DocumentationComponent } from './components/documentation/documentation.component';
import { PlayGroundComponent } from './components/playground/playground.component';
import { CodeExampleComponent } from './components/code-example/code-example.component';
import { HeaderComponent } from './components/header/header.component';
import { DescriptionComponent } from './components/description/description';
import { SeparatorComponent } from './components/seperator/seperator.component';
import { ImportComponent } from './components/import/import.component';
import { DirectionalityComponent } from './components/directionality/directionality.component';
import { ComponentExampleComponent } from './components/component-example/component-example.component';
import { ExampleBackgroundComponent } from './components/example-background/example-background.component';
import { StatusIconComponent } from './components/status-icon/status-icon.component';

// services
import { CopyService } from './services/copy.service';

// containers
import { BadgeLabelDocsComponent } from './containers/badge-label/badge-label-docs.component';
import { BreadcrumbDocsComponent } from './containers/breadcrumb/breadcrumb-docs.component';
import { ButtonDocsComponent } from './containers/button/button-docs.component';
import { ButtonGroupDocsComponent } from './containers/button-group/button-group-docs.component';
import { AlertDocsComponent } from './containers/alert/alert-docs.component';
import { IconDocsComponent } from './containers/icon/icon-docs.component';
import { IdentifierDocsComponent } from './containers/identifier/identifier-docs.component';
import { InlineHelpDocsComponent } from './containers/inline-help/inline-help-docs.component';
import { InputGroupDocsComponent } from './containers/input-group/input-group-docs.component';
import { ComboboxInputDocsComponent } from './containers/combobox-input/combobox-input-docs.component';
import { ImageDocsComponent } from './containers/image/image-docs.component';
import { DropdownDocsComponent } from './containers/dropdown/dropdown-docs.component';
import { PaginationDocsComponent } from './containers/pagination/pagination-docs.component';
import { ListDocsComponent } from './containers/list/list-docs.component';
import { LoadingSpinnerDocsComponent } from './containers/loading-spinner-docs/loading-spinner-docs.component';
import { TabsDocsComponent } from './containers/tabs/tabs-docs.component';
import { TreeDocsComponent } from './containers/tree/tree-docs.component';
import { ModalDocsComponent } from './containers/modal/modal-docs.component';
import { TableDocsComponent } from './containers/table/table-docs.component';
import { ActionBarDocsComponent } from './containers/action-bar/action-bar-docs.component';
import { PanelDocsComponent } from './containers/panel/panel-docs.component';
import { MenuDocsComponent } from './containers/menu/menu-docs.component';
import { TileDocsComponent } from './containers/tile/tile-docs.component';
import { FormDocsComponent } from './containers/form/form-docs.component';
import { SideNavigationDocsComponent } from './containers/side-navigation/side-navigation-docs.component';
import { PopoverDocsComponent } from './containers/popover/popover-docs.component';
import { CalendarDocsComponent } from './containers/calendar/calendar-docs.component';
import { DatePickerDocsComponent } from './containers/date-picker/date-picker-docs.component';
import { TimeDocsComponent } from './containers/time/time-docs.component';
import { TimePickerDocsComponent } from './containers/time-picker/time-picker-docs.component';
import { ShellbarDocsComponent } from './containers/shellbar/shellbar-docs.component';
import { SearchInputDocsComponent } from './containers/search-input/search-input-docs.component';

// examples
import {
    ActionBarBackExampleComponent,
    ActionBarContextualMenuExampleComponent,
    ActionBarNoBackExampleComponent,
    ActionBarMobileExampleComponent
} from './containers/action-bar/examples/action-bar-examples.component';
import { AlertExampleComponent } from './containers/alert/examples/alert-example.component';
import { AlertInlineExampleComponent } from './containers/alert/examples/alert-inline-example.component';
import { AlertComponentAsContentExampleComponent } from './containers/alert/examples/alert-component-as-content-example.component';
import { AlertContentComponent } from './containers/alert/examples/alert-content.component';
import {
    BadgeDefaultExampleComponent,
    BadgeFilledExampleComponent,
    BadgePillExampleComponent,
    LabelBuildStatusExampleComponent,
    LabelDefaultExampleComponent,
    LabelIconStatusExampleComponent,
    LabelStatusColorsExampleComponent
} from './containers/badge-label/examples/badge-label-examples.component';
import {
    BreadcrumbHrefExampleComponent,
    BreadcrumbRouterLinkExampleComponent
} from './containers/breadcrumb/examples/breadcrumb-examples.component';
import {
    ButtonIconsExampleComponent,
    ButtonOptionsExampleComponent,
    ButtonSizesExampleComponent,
    ButtonStateExampleComponent,
    ButtonTypesExampleComponent
} from './containers/button/examples/button-examples.component';
import {
    ButtonGroupXsExampleComponent,
    ButtonGroupSmallExampleComponent,
    ButtonGroupCompactExampleComponent,
    ButtonGroupDefaultExampleComponent
} from './containers/button-group/examples/button-group-examples.component';
import { CalendarRangeExampleComponent } from './containers/calendar/examples/calendar-range-example.component';
import { CalendarSingleExampleComponent } from './containers/calendar/examples/calendar-single-example.component';
import { CalendarMondayStartExampleComponent } from './containers/calendar/examples/calendar-monday-start-example.component';
import { ComboboxInputExampleComponent } from './containers/combobox-input/examples/combobox-input-example.component';
import { DatePickerRangeExampleComponent } from './containers/date-picker/examples/date-picker-range-example.component';
import { DatePickerSingleExampleComponent } from './containers/date-picker/examples/date-picker-single-example.component';
import {
    DropdownContextualMenuExampleComponent,
    DropdownDefaultExampleComponent,
    DropdownIconsExampleComponent,
    DropdownStateExampleComponent,
    DropdownToolbarExampleComponent
} from './containers/dropdown/examples/dropdown-examples.component';
import {
    FormCheckboxExampleComponent,
    FormExampleComponent,
    FormInlineHelpExampleComponent,
    FormRadioExampleComponent,
    FormSelectExampleComponent,
    FormStateExampleComponent
} from './containers/form/examples/form-examples.component';
import { IconExampleComponent } from './containers/icon/examples/icon-example.component';
import {
    CircleIdentifierExampleComponent,
    ColorsIdentifierExampleComponent,
    IconIdentifierExampleComponent,
    InitialsIdentifierExampleComponent,
    TransparentIdentifierExampleComponent
} from './containers/identifier/examples/identifier-examples.component';
import {
    ImageShapesExampleComponent,
    ImageSizesExampleComponent
} from './containers/image/examples/image-examples.component';
import { InlineHelpExampleComponent } from './containers/inline-help/examples/inline-help-examples.component';
import {
    InputGroupButtonExampleComponent,
    InputGroupIconExampleComponent,
    InputGroupNumberExampleComponent,
    InputGroupSearchExampleComponent,
    InputGroupTextExampleComponent,
    InputGroupTextCompactExampleComponent
} from './containers/input-group/examples/input-group-examples.component';
import {
    ListActionsExampleComponent,
    ListCheckboxExampleComponent,
    ListExampleComponent
} from './containers/list/examples/list-examples.component';
import { LoadingSpinnerExampleComponent } from './containers/loading-spinner-docs/examples/loading-spinner-example.component';
import { LoadingSpinnerContainerExampleComponent } from './containers/loading-spinner-docs/examples/loading-spinner-container-example.component';
import { MenuExampleComponent, MenuGroupExampleComponent } from './containers/menu/examples/menu-examples.component';
import { ModalOpenTemplateExampleComponent } from './containers/modal/examples/template-as-content/modal-open-template-example.component';
import { ModalContentComponent } from './containers/modal/examples/component-as-content/modal-content.component';
import { ModalComponentAsContentExampleComponent } from './containers/modal/examples/component-as-content/modal-component-as-content-example.component';
import {
    PanelColumnsExampleComponent,
    PanelEdgeBleedExampleComponent,
    PanelExampleComponent,
    PanelGridExampleComponent,
    PanelGridNoGapExampleComponent,
    PanelGridColumnSpanExampleComponent
} from './containers/panel/examples/panel-examples.component';
import { PaginationExampleComponent } from './containers/pagination/examples/pagination-example.component';
import { PopoverExampleComponent } from './containers/popover/examples/popover-simple/popover-example.component';
import { PopoverModalExampleComponent } from './containers/popover/examples/popover-modal/popover-modal-example.component';
import { PopoverProgrammaticOpenExampleComponent } from './containers/popover/examples/popover-programmatic/popover-programmatic-open-example.component';
import { SearchInputExampleComponent } from './containers/search-input/examples/search-input-example.component';
import { ShellbarBasicExampleComponent } from './containers/shellbar/examples/shellbar-basic-example.component';
import { ShellbarCollapsibleExampleComponent } from './containers/shellbar/examples/shellbar-collapsible-example.component';
import {
    SideNavigationCollapsedExampleComponent,
    SideNavigationExampleComponent,
    SideNavigationIconsExampleComponent,
    SideNavigationLevelsExampleComponent,
    SideNavigationTitlesExampleComponent
} from './containers/side-navigation/examples/side-navigation-examples.component';
import { TableExampleComponent } from './containers/table/examples/table-example.component';
import { TabsExampleComponent, TabSelectionExampleComponent } from './containers/tabs/examples/tabs-examples-component';
import {
    TileActionsExampleComponent,
    TileDisabledExampleComponent,
    TileExampleComponent,
    TileGridExampleComponent,
    TileGridHelpersExampleComponent,
    TileMediaExampleComponent,
    TileProductExampleComponent,
    TileButtonExampleComponent
} from './containers/tile/examples/tile-examples.component';
import {
    TimeExampleComponent,
    Time12ExampleComponent,
    TimeDisabledExampleComponent,
    TimeNoSecondsExampleComponent,
    TimeNoSpinnersExampleComponent
} from './containers/time/examples/time-examples.component';
import {
    TimePickerExampleComponent,
    TimePicker12ExampleComponent,
    TimePickerDisabledExampleComponent,
    TimePickerNoSecondsExampleComponent,
    TimePickerCompactExampleComponent
} from './containers/time-picker/examples/time-picker-examples.component';
import { ToggleDocsComponent } from './containers/toggle/toggle-docs.component';
import { ToggleSizesExampleComponent } from './containers/toggle/examples/toggle-sizes-example/toggle-sizes-example.component';
import { DisabledToggleExampleComponent } from './containers/toggle/examples/disabled-toggle-example/disabled-toggle-example.component';
import { ToggleBindingExampleComponent } from './containers/toggle/examples/toggle-binding-example/toggle-binding-example.component';
import { ListInfiniteScrollExampleComponent } from './containers/list/examples/list-infinite-scroll-example.component';
import { DropdownInfiniteScrollExampleComponent } from './containers/dropdown/examples/dropdown-infinite-scroll-example.component';
import { ModalInModalComponent } from './containers/modal/examples/stackable-modals/modal-in-modal.component';
import { ModalInModalSecondComponent } from './containers/modal/examples/stackable-modals/modal-in-modal-second.component';
import { ModalInModalExampleComponent } from './containers/modal/examples/stackable-modals/modal-in-modal-example.component';
import { ModalFullscreenExampleComponent } from './containers/modal/examples/fullscreen-modal/modal-fullscreen-example.component';
import { InfiniteScrollDocsComponent } from './containers/infinite-scroll/infinite-scroll-docs.component';
import { InfiniteScrollBasicExampleComponent } from './containers/infinite-scroll/examples/infinite-scroll-basic-example/infinite-scroll-basic-example.component';
import { TableCheckboxesExampleComponent } from './containers/table/examples/table-checkboxes-example.component';
import { SearchInputAsyncExampleComponent } from './containers/search-input/examples/search-input-async-example.component';
import { SearchInputDynamicExampleComponent } from './containers/search-input/examples/search-input-dynamic-example.component';
import { SearchInputDisplaywithExampleComponent } from './containers/search-input/examples/search-input-displaywith-example.component';
import { ListSingleSelectExampleComponent } from './containers/list/examples/list-single-select-example.component';
import { FileInputDocsComponent } from './containers/file-input/file-input-docs.component';
import { FileInputExampleComponent } from './containers/file-input/examples/file-input-example/file-input-example.component';
import { FileInputCustomExampleComponent } from './containers/file-input/examples/file-input-custom-example/file-input-custom-example.component';
import { FileInputDragDisabledExampleComponent } from './containers/file-input/examples/file-input-drag-disabled-example/file-input-drag-disabled-example.component';
import { FileInputMaxExampleComponent } from './containers/file-input/examples/file-input-max-example/file-input-max-example.component';
import { TokenDocsComponent } from './containers/token/token-docs.component';
import { TokenExampleComponent } from './containers/token/examples/token-example/token-example.component';
import { DatetimePickerDocsComponent } from './containers/datetime-picker/datetime-picker-docs.component';
import { DatetimeExampleComponent } from './containers/datetime-picker/examples/datetime-example/datetime-example.component';
import { DatetimeNonMeridianExampleComponent } from './containers/datetime-picker/examples/datetime-non-meridian-example/datetime-non-meridian-example.component';
import { DatetimeProgramExampleComponent } from './containers/datetime-picker/examples/datetime-program-example/datetime-program-example.component';
import { ScrollSpyDocsComponent } from './containers/scroll-spy/scroll-spy-docs.component';
import { ScrollSpyExampleComponent } from './containers/scroll-spy/examples/scroll-spy-example/scroll-spy-example.component';
import { ScrollSpyCustomExampleComponent } from './containers/scroll-spy/examples/scroll-spy-custom-example/scroll-spy-custom-example.component';
import { MultiInputFilterExampleComponent } from './containers/multi-input/examples/multi-input-filter-example/multi-input-filter-example.component';
import { MultiInputDisplaywithExampleComponent } from './containers/multi-input/examples/multi-input-displaywith-example/multi-input-displaywith-example.component';
import { MultiInputDocsComponent } from './containers/multi-input/multi-input-docs.component';
import { MultiInputExampleComponent } from './containers/multi-input/examples/multi-input-example/multi-input-example.component';
import { MultiInputAsyncExampleComponent } from './containers/multi-input/examples/multi-input-async-example/multi-input-async-example.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { PopoverDirectiveDocsComponent } from './containers/popover-directive/popover-directive-docs.component';
import { PopoverDirectiveExampleComponent } from './containers/popover-directive/examples/popover-directive-example/popover-directive-example.component';
import { PopoverTriggersComponent } from './containers/popover-directive/examples/popover-triggers/popover-triggers.component';
import { PopoverProgrammaticComponent } from './containers/popover-directive/examples/popover-programmatic/popover-programmatic.component';
import { PopoverFillComponent } from './containers/popover-directive/examples/popover-fill/popover-fill.component';
import { PopoverCFillComponent } from './containers/popover/examples/popover-c-fill/popover-c-fill.component';

import { HomeDocsComponent } from './containers/home/home.component';
import { NewComponentComponent } from './containers/new-component/new-component.component';

import { COMPONENT_SCHEMAS } from './containers/schemas';

import * as hljs from 'highlight.js';
import { HighlightJsModule, HIGHLIGHT_JS } from 'angular-highlight-js';
import { UtilsModule } from '../../../library/src/lib/utils/utils.module';
import { BackdropExamplesComponent } from './containers/modal/examples/backdrop-examples/backdrop-examples.component';
import { PopoverPlacementExampleComponent } from './containers/popover/examples/popover-placement/popover-placement-example.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiComponent } from './components/api/api.component';
import { AlertConfig } from '../../../library/src/lib/alert/alert-config';
import { ApiDocsService } from './services/api-docs.service';
import { AlertHeaderComponent } from './containers/alert/alert-header/alert-header.component';
import { API_FILES } from './utilities/api-files';
import { HeaderTabsComponent } from './components/header-tabs/header-tabs.component';
import { ActionBarHeaderComponent } from './containers/action-bar/action-bar-header/action-bar-header.component';
import { BadgeLabelHeaderComponent } from './containers/badge-label/badge-label-header/badge-label-header.component';
import { BreadcrumbHeaderComponent } from './containers/breadcrumb/breadcrumb-header/breadcrumb-header.component';
import { ButtonHeaderComponent } from './containers/button/button-header/button-header.component';
import { ButtonGroupHeaderComponent } from './containers/button-group/button-group-header/button-group-header.component';
import { CalendarHeaderComponent } from './containers/calendar/calendar-header/calendar-header.component';
import { ComboboxInputHeaderComponent } from './containers/combobox-input/combobox-input-header/combobox-input-header.component';
import { DatePickerHeaderComponent } from './containers/date-picker/date-picker-header/date-picker-header.component';
import { DatetimePickerHeaderComponent } from './containers/datetime-picker/datetime-picker-header/datetime-picker-header.component';
import { DropdownHeaderComponent } from './containers/dropdown/dropdown-header/dropdown-header.component';
import { FileInputHeaderComponent } from './containers/file-input/file-input-header/file-input-header.component';
import { FormHeaderComponent } from './containers/form/form-header/form-header.component';
import { IconHeaderComponent } from './containers/icon/icon-header/icon-header.component';
import { IdentifierHeaderComponent } from './containers/identifier/identifier-header/identifier-header.component';
import { ImageHeaderComponent } from './containers/image/image-header/image-header.component';
import { InfiniteScrollHeaderComponent } from './containers/infinite-scroll/infinite-scroll-header/infinite-scroll-header.component';
import { InlineHelpHeaderComponent } from './containers/inline-help/inline-help-header/inline-help-header.component';
import { InputGroupHeaderComponent } from './containers/input-group/input-group-header/input-group-header.component';
import { ListHeaderComponent } from './containers/list/list-header/list-header.component';
import { LoadingSpinnerHeaderComponent } from './containers/loading-spinner-docs/loading-spinner-header/loading-spinner-header.component';
import { MenuHeaderComponent } from './containers/menu/menu-header/menu-header.component';
import { ModalDocsHeaderComponent } from './containers/modal/modal-docs-header/modal-docs-header.component';
import { MultiInputHeaderComponent } from './containers/multi-input/multi-input-header/multi-input-header.component';
import { PaginationHeaderComponent } from './containers/pagination/pagination-header/pagination-header.component';
import { PanelDocsHeaderComponent } from './containers/panel/panel-docs-header/panel-docs-header.component';
import { PopoverHeaderComponent } from './containers/popover/popover-header/popover-header.component';
import { PopoverDirectiveHeaderComponent } from './containers/popover-directive/popover-directive-header/popover-directive-header.component';
import { ScrollSpyHeaderComponent } from './containers/scroll-spy/scroll-spy-header/scroll-spy-header.component';
import { SearchInputHeaderComponent } from './containers/search-input/search-input-header/search-input-header.component';
import { ShellbarDocsHeaderComponent } from './containers/shellbar/shellbar-docs-header/shellbar-docs-header.component';
import { SideNavigationHeaderComponent } from './containers/side-navigation/side-navigation-header/side-navigation-header.component';
import { TableDocsHeaderComponent } from './containers/table/table-docs-header/table-docs-header.component';
import { TabsHeaderComponent } from './containers/tabs/tabs-header/tabs-header.component';
import { TileDocsHeaderComponent } from './containers/tile/tile-docs-header/tile-docs-header.component';
import { TimeHeaderComponent } from './containers/time/time-header/time-header.component';
import { TimePickerHeaderComponent } from './containers/time-picker/time-picker-header/time-picker-header.component';
import { ToggleHeaderComponent } from './containers/toggle/toggle-header/toggle-header.component';
import { TokenHeaderComponent } from './containers/token/token-header/token-header.component';
import { TreeHeaderComponent } from './containers/tree/tree-header/tree-header.component';
import { ROUTES } from './documentation.routes';
import { ComplexTitleExampleComponent } from './containers/tabs/examples/complex-title-example/complex-title-example.component';
import { AddingTabExampleComponent } from './containers/tabs/examples/adding-tab-example/adding-tab-example.component';

export function highlightJsFactory() {
    return hljs;
}

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
        ButtonStateExampleComponent,
        ButtonTypesExampleComponent,
        ButtonGroupXsExampleComponent,
        ButtonGroupSmallExampleComponent,
        ButtonGroupCompactExampleComponent,
        ButtonGroupDefaultExampleComponent,
        CalendarRangeExampleComponent,
        CalendarSingleExampleComponent,
        CalendarMondayStartExampleComponent,
        DatePickerRangeExampleComponent,
        DatePickerSingleExampleComponent,
        DatetimeExampleComponent,
        DatetimeNonMeridianExampleComponent,
        DatetimeProgramExampleComponent,
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
        InputGroupButtonExampleComponent,
        InputGroupIconExampleComponent,
        InputGroupNumberExampleComponent,
        InputGroupSearchExampleComponent,
        InputGroupTextExampleComponent,
        InputGroupTextCompactExampleComponent,
        ListActionsExampleComponent,
        ListCheckboxExampleComponent,
        ListExampleComponent,
        ListInfiniteScrollExampleComponent,
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
        TableCheckboxesExampleComponent,
        TabsExampleComponent,
        TabSelectionExampleComponent,
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
        TimePickerExampleComponent,
        TimePicker12ExampleComponent,
        TimePickerDisabledExampleComponent,
        TimePickerNoSecondsExampleComponent,
        TimePickerCompactExampleComponent,
        ComboboxInputDocsComponent,
        ComboboxInputExampleComponent,
        LoadingSpinnerDocsComponent,
        LoadingSpinnerExampleComponent,
        LoadingSpinnerContainerExampleComponent,
        StatusIconComponent,
        ToggleSizesExampleComponent,
        DisabledToggleExampleComponent,
        ToggleBindingExampleComponent,
        TokenDocsComponent,
        TokenExampleComponent,
        ToolbarComponent,
        MultiInputAsyncExampleComponent,
        MultiInputFilterExampleComponent,
        MultiInputDisplaywithExampleComponent,
        BackdropExamplesComponent,
        ApiComponent,
        AlertHeaderComponent,
        HeaderTabsComponent,
        ActionBarHeaderComponent,
        BadgeLabelHeaderComponent,
        BreadcrumbHeaderComponent,
        ButtonHeaderComponent,
        ButtonGroupHeaderComponent,
        CalendarHeaderComponent,
        ComboboxInputHeaderComponent,
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
        AddingTabExampleComponent
    ],
    entryComponents: [ModalContentComponent, ModalInModalComponent, ModalInModalSecondComponent, AlertContentComponent],
    imports: [
        HighlightJsModule.forRoot({
            provide: HIGHLIGHT_JS,
            useFactory: highlightJsFactory
        }),
        MarkdownModule.forChild(),
        CommonModule,
        FormsModule,
        RouterModule.forChild(ROUTES),
        SchemaModule.forRoot(COMPONENT_SCHEMAS),
        UtilsModule,
        FundamentalNgxModule,
        HttpClientModule
    ],
    providers: [
        CopyService,
        ApiDocsService
    ]
})
export class DocumentationModule {
}
