import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';
import { SchemaModule } from '../schema/schema.module';

// modules
import { FundamentalNgxModule } from '../../../library/src/lib/fundamental-ngx.module';

// components
import { DocumentationComponent } from './components/documentation/documentation.component';
import { PlayGroundComponent } from './components/playground/playground.component';
import { PropertiesComponent } from './components/properties/properties.component';
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
    DropdownStateExampleComponent
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
import { ModalExampleComponent } from './containers/modal/examples/modal-example.component';
import { ModalConfirmationExampleComponent } from './containers/modal/examples/modal-confirmation-example.component';
import { ModalContentComponent } from './containers/modal/examples/modal-content.component';
import { ModalComponentAsContentExampleComponent } from './containers/modal/examples/modal-component-as-content-example.component';
import {
    PanelColumnsExampleComponent,
    PanelEdgeBleedExampleComponent,
    PanelExampleComponent,
    PanelGridExampleComponent,
    PanelGridNoGapExampleComponent,
    PanelRowColumnExampleComponent
} from './containers/panel/examples/panel-examples.component';
import { PaginationExampleComponent } from './containers/pagination/examples/pagination-example.component';
import { PopoverExampleComponent } from './containers/popover/examples/popover-example.component';
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
import { ModalInModalComponent } from './containers/modal/examples/modal-in-modal.component';
import { ModalInModalSecondComponent } from './containers/modal/examples/modal-in-modal-second.component';
import { ModalInModalExampleComponent } from './containers/modal/examples/modal-in-modal-example.component';
import { InfiniteScrollDocsComponent } from './containers/infinite-scroll/infinite-scroll-docs.component';
import { InfiniteScrollBasicExampleComponent } from './containers/infinite-scroll/examples/infinite-scroll-basic-example/infinite-scroll-basic-example.component';
import { TableCheckboxesExampleComponent } from './containers/table/examples/table-checkboxes-example.component';
import { SearchInputDynamicExampleComponent } from './containers/search-input/examples/search-input-dynamic-example.component';
import { ListSingleSelectExampleComponent } from './containers/list/examples/list-single-select-example.component';

import { InstallationDocsComponent } from './containers/installation/installation.component';
import { UsageDocsComponent } from './containers/usage/usage.component';
import { InternationalizationDocsComponent } from './containers/internationalization/internationalization.component';
import { HomeDocsComponent } from './containers/home/home.component';

import { COMPONENT_SCHEMAS } from './containers/schemas';

import * as hljs from 'highlight.js';
import { HighlightJsModule, HIGHLIGHT_JS } from 'angular-highlight-js';
import { UtilsModule } from '../../../library/src/lib/utils/utils.module';

export function highlightJsFactory() {
    return hljs;
}

const ROUTES: Routes = [
    {
        path: '',
        component: DocumentationComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'action-bar', component: ActionBarDocsComponent },
            { path: 'alert', component: AlertDocsComponent },
            { path: 'badgeLabel', component: BadgeLabelDocsComponent },
            { path: 'breadcrumb', component: BreadcrumbDocsComponent },
            { path: 'button', component: ButtonDocsComponent },
            { path: 'buttonGroup', component: ButtonGroupDocsComponent },
            { path: 'calendar', component: CalendarDocsComponent },
            { path: 'comboboxInput', component: ComboboxInputDocsComponent },
            { path: 'datePicker', component: DatePickerDocsComponent },
            { path: 'dropdown', component: DropdownDocsComponent },
            { path: 'form', component: FormDocsComponent },
            { path: 'icon', component: IconDocsComponent },
            { path: 'identifier', component: IdentifierDocsComponent },
            { path: 'image', component: ImageDocsComponent },
            { path: 'infiniteScroll', component: InfiniteScrollDocsComponent },
            { path: 'inlineHelp', component: InlineHelpDocsComponent },
            { path: 'inputGroup', component: InputGroupDocsComponent },
            { path: 'list', component: ListDocsComponent },
            { path: 'loadingSpinner', component: LoadingSpinnerDocsComponent },
            { path: 'menu', component: MenuDocsComponent },
            { path: 'modal', component: ModalDocsComponent },
            { path: 'pagination', component: PaginationDocsComponent },
            { path: 'panel', component: PanelDocsComponent },
            { path: 'popover', component: PopoverDocsComponent },
            { path: 'searchInput', component: SearchInputDocsComponent },
            { path: 'shellbar', component: ShellbarDocsComponent },
            { path: 'sideNavigation', component: SideNavigationDocsComponent },
            { path: 'table', component: TableDocsComponent },
            { path: 'tabs', component: TabsDocsComponent },
            { path: 'tile', component: TileDocsComponent },
            { path: 'time', component: TimeDocsComponent },
            { path: 'timePicker', component: TimePickerDocsComponent },
            { path: 'tree', component: TreeDocsComponent },
            { path: 'toggle', component: ToggleDocsComponent },
            { path: 'installation', component: InstallationDocsComponent },
            { path: 'usage', component: UsageDocsComponent },
            // { path: 'rtl', component: InternationalizationDocsComponent }, TODO: restore this route when fundamental is RTL ready
            { path: 'home', component: HomeDocsComponent }
        ]
    }
];

@NgModule({
    declarations: [
        DocumentationComponent,
        PlayGroundComponent,
        CodeExampleComponent,
        HeaderComponent,
        DescriptionComponent,
        PropertiesComponent,
        SeparatorComponent,
        ImportComponent,
        ActionBarDocsComponent,
        AlertDocsComponent,
        BadgeLabelDocsComponent,
        BreadcrumbDocsComponent,
        ButtonDocsComponent,
        ButtonGroupDocsComponent,
        DropdownDocsComponent,
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
        InstallationDocsComponent,
        ToggleDocsComponent,
        UsageDocsComponent,
        InternationalizationDocsComponent,
        HomeDocsComponent,
        DirectionalityComponent,
        ComponentExampleComponent,
        ExampleBackgroundComponent,
        ActionBarBackExampleComponent,
        ActionBarContextualMenuExampleComponent,
        ActionBarMobileExampleComponent,
        ActionBarNoBackExampleComponent,
        AlertExampleComponent,
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
        DropdownContextualMenuExampleComponent,
        DropdownDefaultExampleComponent,
        DropdownIconsExampleComponent,
        DropdownStateExampleComponent,
        DropdownInfiniteScrollExampleComponent,
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
        ModalExampleComponent,
        ModalConfirmationExampleComponent,
        ModalContentComponent,
        ModalComponentAsContentExampleComponent,
        ModalInModalComponent,
        ModalInModalSecondComponent,
        ModalInModalExampleComponent,
        PanelColumnsExampleComponent,
        PanelEdgeBleedExampleComponent,
        PanelExampleComponent,
        PanelGridExampleComponent,
        PanelGridNoGapExampleComponent,
        PanelRowColumnExampleComponent,
        PaginationExampleComponent,
        PopoverExampleComponent,
        SearchInputExampleComponent,
        SearchInputDynamicExampleComponent,
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
        InfiniteScrollDocsComponent,
        InfiniteScrollBasicExampleComponent
    ],
    entryComponents: [
        ModalContentComponent,
        ModalInModalComponent,
        ModalInModalSecondComponent
    ],
    imports: [
        HighlightJsModule.forRoot({
            provide: HIGHLIGHT_JS,
            useFactory: highlightJsFactory
        }),
        CommonModule,
        FormsModule,
        RouterModule.forChild(ROUTES),
        SchemaModule.forRoot(COMPONENT_SCHEMAS),
        UtilsModule,
        FundamentalNgxModule
    ],
    providers: [
        CopyService
    ]
})
export class DocumentationModule {}

